(function () {
  const DEFAULT_CONFIG = {
    poolPath: './fragment-pool.json',
    packPaths: [
      './fragment-pack-1.json',
      './fragment-pack-2.json'
    ],
    ratios: {
      short: 0.4,
      half: 0.4,
      full: 0.2
    }
  };

  const state = {
    loaded: false,
    sources: [],
    fragments: [],
    buckets: {
      short: [],
      half: [],
      full: []
    }
  };

  function normalizeText(value) {
    return String(value || '')
      .replace(/\r/g, '')
      .replace(/\t/g, ' ')
      .replace(/\u00a0/g, ' ')
      .replace(/\s+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ ]{2,}/g, ' ')
      .trim();
  }

  function extractFragments(data) {
    if (Array.isArray(data)) {
      return data;
    }

    if (data && Array.isArray(data.fragments)) {
      return data.fragments;
    }

    if (data && Array.isArray(data.items)) {
      return data.items;
    }

    return [];
  }

  function classifyFragment(text) {
    const value = normalizeText(text);
    const compact = value.replace(/\n/g, ' ').trim();
    const length = compact.length;

    const hasEllipsis = compact.includes('…') || compact.includes('...');
    const hasQuestion = compact.includes('?');
    const hasPeriod = /[.!。]$/.test(compact);
    const hasMaybe = /^maybe\b/i.test(compact);
    const hasBut = /\bbut\b/i.test(compact);
    const lineCount = value.split('\n').filter(Boolean).length;

    if (lineCount > 1) {
      return 'full';
    }

    if (length <= 24 && !hasPeriod && !hasQuestion) {
      return 'short';
    }

    if (
      hasEllipsis ||
      hasQuestion ||
      hasMaybe ||
      hasBut ||
      (!hasPeriod && length <= 54)
    ) {
      return 'half';
    }

    if (length <= 32 && !hasPeriod) {
      return 'short';
    }

    return 'full';
  }

  function uniqueFragments(list) {
    const seen = new Set();
    const output = [];

    for (const item of list) {
      const text = normalizeText(item);
      if (!text) continue;

      const key = text.toLowerCase();
      if (seen.has(key)) continue;

      seen.add(key);
      output.push(text);
    }

    return output;
  }

  async function loadJson(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load: ${path}`);
    }
    return response.json();
  }

  function rebuildBuckets(fragments) {
    const buckets = {
      short: [],
      half: [],
      full: []
    };

    fragments.forEach((text) => {
      const type = classifyFragment(text);
      buckets[type].push(text);
    });

    return buckets;
  }

  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function sampleUnique(list, count) {
    if (!Array.isArray(list) || !list.length || count <= 0) return [];
    return shuffle(list).slice(0, Math.min(count, list.length));
  }

  function allocateCounts(total, ratios) {
    const safeTotal = Math.max(1, Number(total) || 1);
    const base = {
      short: Math.floor(safeTotal * (ratios.short || 0)),
      half: Math.floor(safeTotal * (ratios.half || 0)),
      full: Math.floor(safeTotal * (ratios.full || 0))
    };

    let assigned = base.short + base.half + base.full;
    const order = ['half', 'short', 'full'];

    let index = 0;
    while (assigned < safeTotal) {
      base[order[index % order.length]] += 1;
      assigned += 1;
      index += 1;
    }

    return base;
  }

  function refillFromAnywhere(current, needed, buckets, used) {
    if (needed <= 0) return current;

    const all = shuffle([
      ...buckets.short,
      ...buckets.half,
      ...buckets.full
    ]);

    for (const item of all) {
      if (current.length >= needed) break;
      if (used.has(item)) continue;

      used.add(item);
      current.push(item);
    }

    return current;
  }

  async function load(config = {}) {
    const merged = {
      ...DEFAULT_CONFIG,
      ...config,
      ratios: {
        ...DEFAULT_CONFIG.ratios,
        ...(config.ratios || {})
      }
    };

    const paths = [merged.poolPath, ...(merged.packPaths || [])].filter(Boolean);

    const sourceResults = await Promise.allSettled(paths.map(loadJson));

    const sources = [];
    const rawFragments = [];

    sourceResults.forEach((result, index) => {
      const path = paths[index];

      if (result.status === 'fulfilled') {
        const fragments = extractFragments(result.value);
        sources.push({
          path,
          count: fragments.length,
          ok: true
        });
        rawFragments.push(...fragments);
      } else {
        sources.push({
          path,
          count: 0,
          ok: false,
          error: String(result.reason?.message || result.reason || 'Unknown error')
        });
      }
    });

    const fragments = uniqueFragments(rawFragments);
    const buckets = rebuildBuckets(fragments);

    state.loaded = true;
    state.sources = sources;
    state.fragments = fragments;
    state.buckets = buckets;

    return getState();
  }

  function getState() {
    return {
      loaded: state.loaded,
      total: state.fragments.length,
      sources: [...state.sources],
      counts: {
        short: state.buckets.short.length,
        half: state.buckets.half.length,
        full: state.buckets.full.length
      }
    };
  }

  function pickMixed(count = 12, options = {}) {
    if (!state.loaded) {
      throw new Error('Fragment system not loaded');
    }

    const ratios = {
      ...DEFAULT_CONFIG.ratios,
      ...(options.ratios || {})
    };

    const counts = allocateCounts(count, ratios);
    const used = new Set();
    const result = [];

    const shortItems = sampleUnique(state.buckets.short, counts.short);
    shortItems.forEach((item) => used.add(item));
    result.push(...shortItems);

    const halfItems = sampleUnique(
      state.buckets.half.filter((item) => !used.has(item)),
      counts.half
    );
    halfItems.forEach((item) => used.add(item));
    result.push(...halfItems);

    const fullItems = sampleUnique(
      state.buckets.full.filter((item) => !used.has(item)),
      counts.full
    );
    fullItems.forEach((item) => used.add(item));
    result.push(...fullItems);

    const final = refillFromAnywhere(result, count, state.buckets, used);

    return shuffle(final).slice(0, count);
  }

  function pickOne(type = '') {
    if (!state.loaded) {
      throw new Error('Fragment system not loaded');
    }

    const bucket = state.buckets[type] || state.fragments;
    if (!bucket.length) return '';

    return bucket[Math.floor(Math.random() * bucket.length)];
  }

  function pickBatch(type = '', count = 8) {
    if (!state.loaded) {
      throw new Error('Fragment system not loaded');
    }

    const bucket = state.buckets[type] || state.fragments;
    return sampleUnique(bucket, count);
  }

  window.REFRAMEFragmentSystem = {
    load,
    getState,
    pickMixed,
    pickOne,
    pickBatch,
    classifyFragment,
    normalizeText
  };
})();
