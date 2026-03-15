(function () {
  const DEFAULT_POOL_FILES = [
    "./fragment-pool.json",
    "./fragment-pack-1.json",
    "./fragment-pack-2.json"
  ];

  const TOOL_PROFILES = {
    shift: {
      preferredTags: ["shift", "signal", "friction", "idea", "confusion", "mutation"],
      styleOrder: ["clear", "drift", "sharp"],
      toneBoost: { calm: 2, mystery: 3, twist: 2, edge: 1, warm: 1 }
    },
    misread: {
      preferredTags: ["criticism", "misunderstanding", "reaction", "signal", "confusion", "shift"],
      styleOrder: ["clear", "drift", "sharp"],
      toneBoost: { calm: 2, mystery: 2, twist: 2, edge: 2, warm: 1 }
    },
    opposite: {
      preferredTags: ["opposite", "debate", "reaction", "edge", "signal", "frame"],
      styleOrder: ["sharp", "drift", "clear"],
      toneBoost: { calm: 1, mystery: 2, twist: 3, edge: 3, warm: 0 }
    },
    metaphor: {
      preferredTags: ["metaphor", "story", "frame", "mutation", "shift", "edge"],
      styleOrder: ["drift", "clear", "sharp"],
      toneBoost: { calm: 1, mystery: 3, twist: 2, edge: 1, warm: 0 }
    },
    question: {
      preferredTags: ["question", "thinking", "signal", "confusion", "idea", "structure"],
      styleOrder: ["clear", "drift", "sharp"],
      toneBoost: { calm: 2, mystery: 2, twist: 1, edge: 1, warm: 1 }
    },
    "hate-content": {
      preferredTags: ["criticism", "signal", "reaction", "hook", "idea", "audience", "frame"],
      styleOrder: ["clear", "sharp", "drift"],
      toneBoost: { calm: 2, mystery: 1, twist: 2, edge: 3, warm: 1 }
    },
    default: {
      preferredTags: ["signal", "shift", "idea", "reaction"],
      styleOrder: ["clear", "drift", "sharp"],
      toneBoost: { calm: 1, mystery: 1, twist: 1, edge: 1, warm: 1 }
    }
  };

  let fragmentPool = [];
  let poolReady = false;
  let loadedFiles = [];
  let poolMap = new Map();

  function normalizeText(str) {
    return String(str || "").replace(/\s+/g, " ").trim();
  }

  function tokenize(str) {
    return normalizeText(str)
      .toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  }

  function uniq(arr) {
    return [...new Set(arr)];
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getCarriedInput() {
    const params = new URLSearchParams(window.location.search);
    return normalizeText(params.get("q") || params.get("fragment") || "");
  }

  function excerpt(text, max = 84) {
    const clean = normalizeText(text);
    return clean.length > max ? clean.slice(0, max - 3).trim() + "..." : clean;
  }

  function toneToStyle(tone) {
    const t = String(tone || "").toLowerCase();
    if (["warm", "calm"].includes(t)) return "clear";
    if (["mystery", "twist"].includes(t)) return "drift";
    if (["edge"].includes(t)) return "sharp";
    return "";
  }

  function inferStyleFromText(text) {
    const lower = text.toLowerCase();

    if (/\bmaybe\b|\bnot\b|\bquiet\b|\bsmall\b|\blate\b|\bearly\b/.test(lower)) {
      return "clear";
    }

    if (/\bchaos\b|\bpattern\b|\bdoor\b|\bframe\b|\bmap\b|\bunfinished\b|\boff\b|\bdrift\b/.test(lower)) {
      return "drift";
    }

    return "sharp";
  }

  function inferTagsFromText(text) {
    const lower = text.toLowerCase();
    const tags = [];

    if (/\bboring\b|\bboredom\b|\bquiet\b|\bslow\b/.test(lower)) tags.push("boring", "boredom", "attention");
    if (/\bcare\b|\bnobody asked\b|\bdismiss\b|\breply\b|\bdisagreement\b/.test(lower)) tags.push("dismissal", "criticism", "reaction");
    if (/\bconfusion\b|\bunclear\b|\bsense\b|\bquestion\b|\btranslation\b/.test(lower)) tags.push("confusion", "question", "thinking");
    if (/\babstract\b|\bframe\b|\bmap\b|\bpattern\b|\bunfinished\b/.test(lower)) tags.push("abstract", "frame", "shift");
    if (/\bfriction\b|\bedge\b|\bsignal\b/.test(lower)) tags.push("friction", "signal", "edge");
    if (/\bcuriosity\b|\binteresting\b/.test(lower)) tags.push("curiosity", "idea");
    if (/\bsilence\b/.test(lower)) tags.push("silence");
    if (/\bhook\b/.test(lower)) tags.push("hook");
    if (/\bstory\b/.test(lower)) tags.push("story");
    if (/\bmutation\b/.test(lower)) tags.push("mutation");
    if (/\bmetaphor\b/.test(lower)) tags.push("metaphor");
    if (/\bopposite\b/.test(lower)) tags.push("opposite");
    if (/\bstructure\b/.test(lower)) tags.push("structure");
    if (/\baudience\b/.test(lower)) tags.push("audience");
    if (/\btiming\b|\bearly\b|\blate\b/.test(lower)) tags.push("timing");
    if (/\bmirror\b|\bidentity\b|\bemotion\b/.test(lower)) tags.push("emotion");
    if (/\bclarity\b|\bclear\b/.test(lower)) tags.push("clarity");

    return uniq(tags);
  }

  function normalizeFragmentItem(item, source) {
    if (typeof item === "string") {
      const text = normalizeText(item);
      if (!text) return null;

      return {
        text,
        tone: "",
        tags: inferTagsFromText(text),
        source,
        style: inferStyleFromText(text)
      };
    }

    if (item && typeof item === "object") {
      const text = normalizeText(item.text || "");
      if (!text) return null;

      const tone = normalizeText(item.tone || "").toLowerCase();
      const tags = uniq([
        ...(Array.isArray(item.tags) ? item.tags.map(tag => String(tag).toLowerCase()) : []),
        ...inferTagsFromText(text)
      ]);

      return {
        text,
        tone,
        tags,
        source,
        style: toneToStyle(tone) || inferStyleFromText(text)
      };
    }

    return null;
  }

  function flattenPool(json, source) {
    let raw = [];

    if (Array.isArray(json)) raw = json;
    else if (json && Array.isArray(json.fragments)) raw = json.fragments;
    else if (json && Array.isArray(json.items)) raw = json.items;
    else if (json && Array.isArray(json.packs)) raw = json.packs;

    const out = [];
    const seen = new Set();

    for (const item of raw) {
      const normalized = normalizeFragmentItem(item, source);
      if (!normalized) continue;
      if (seen.has(normalized.text)) continue;
      seen.add(normalized.text);
      out.push(normalized);
    }

    return out;
  }

  async function loadJson(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return response.json();
  }

  async function loadPool(poolFiles = DEFAULT_POOL_FILES) {
    const merged = [];
    const seen = new Set();
    const okFiles = [];

    for (const path of poolFiles) {
      try {
        const json = await loadJson(path);
        const items = flattenPool(json, path.split("/").pop());

        for (const item of items) {
          if (seen.has(item.text)) continue;
          seen.add(item.text);
          merged.push(item);
        }

        okFiles.push(path);
      } catch (err) {
      }
    }

    fragmentPool = merged;
    poolReady = merged.length > 0;
    loadedFiles = okFiles;
    poolMap = new Map(fragmentPool.map(item => [item.text, item]));

    return {
      ready: poolReady,
      size: fragmentPool.length,
      files: [...loadedFiles]
    };
  }

  function ensureLoaded() {
    if (!poolReady || !fragmentPool.length) {
      throw new Error("Fragment pool is not loaded yet.");
    }
  }

  function extractSignals(input) {
    const text = normalizeText(input).toLowerCase();
    const words = tokenize(input);
    const signals = [...words];

    if (/\bboring\b|\bdull\b|\bflat\b/.test(text)) signals.push("boring", "boredom", "attention");
    if (/\bwho cares\b|\bnobody asked\b|\bwho asked\b/.test(text)) signals.push("dismissal", "criticism", "reaction", "care");
    if (/\bmakes no sense\b|\bconfus|\bunclear\b|\bmumble\b|\bnonsense\b/.test(text)) signals.push("confusion", "question", "thinking", "signal");
    if (/\babstract\b|\bvague\b|\ball over the place\b/.test(text)) signals.push("abstract", "frame", "pattern", "shift");
    if (/\btrying too hard\b|\bpretentious\b|\bperforming\b/.test(text)) signals.push("effort", "edge", "reaction");
    if (/\bcringe\b|\bembarrassing\b|\bidiot\b/.test(text)) signals.push("criticism", "reaction", "edge");
    if (/\btoo long\b|\bessay\b|\byapping\b/.test(text)) signals.push("attention", "timing", "structure");
    if (/\bsilence\b|\bno response\b/.test(text)) signals.push("silence", "timing", "audience");
    if (/\bhook\b|\btitle\b/.test(text)) signals.push("hook", "title", "signal");

    return uniq(signals.map(signal => String(signal).toLowerCase()));
  }

  function getToolProfile(toolName) {
    return TOOL_PROFILES[toolName] || TOOL_PROFILES.default;
  }

  function scoreFragment(fragment, inputSignals, toolName) {
    const profile = getToolProfile(toolName);
    const text = fragment.text.toLowerCase();
    const wordSet = new Set(tokenize(fragment.text));
    const tagSet = new Set((fragment.tags || []).map(tag => String(tag).toLowerCase()));
    let score = 0;

    for (const signal of inputSignals) {
      if (!signal) continue;

      if (tagSet.has(signal)) score += 8;
      if (wordSet.has(signal)) score += 6;
      if (text.includes(signal)) score += 3;
    }

    for (const preferred of profile.preferredTags) {
      const key = String(preferred).toLowerCase();
      if (tagSet.has(key)) score += 5;
      if (text.includes(key)) score += 2;
    }

    if (fragment.tone && profile.toneBoost[fragment.tone]) {
      score += profile.toneBoost[fragment.tone];
    }

    if (fragment.style === "drift") score += 1;
    if (fragment.style === "clear") score += 1;
    if (fragment.style === "sharp") score += 1;

    return score;
  }

  function buildRanked(input, toolName = "default") {
    ensureLoaded();
    const signals = extractSignals(input);

    return fragmentPool
      .map(fragment => ({
        ...fragment,
        score: scoreFragment(fragment, signals, toolName)
      }))
      .sort((a, b) => b.score - a.score);
  }

  function chooseByStyle(base, styleOrder) {
    const buckets = {
      clear: shuffle(base.filter(item => item.style === "clear")),
      drift: shuffle(base.filter(item => item.style === "drift")),
      sharp: shuffle(base.filter(item => item.style === "sharp"))
    };

    const chosen = [];
    const used = new Set();

    function take(style) {
      const bucket = buckets[style] || [];
      while (bucket.length) {
        const item = bucket.shift();
        if (used.has(item.text)) continue;
        used.add(item.text);
        chosen.push(item);
        return;
      }
    }

    for (const style of styleOrder) {
      take(style);
    }

    const fallback = shuffle(base);
    while (chosen.length < 3 && fallback.length) {
      const item = fallback.shift();
      if (used.has(item.text)) continue;
      used.add(item.text);
      chosen.push(item);
    }

    return chosen.slice(0, 3);
  }

  function chooseThree(input, toolName = "default") {
    const profile = getToolProfile(toolName);
    const ranked = buildRanked(input, toolName);
    const strong = ranked.filter(item => item.score > 0);
    const base = strong.length ? strong : ranked;
    return chooseByStyle(base, profile.styleOrder);
  }

  function chooseOne(input, toolName = "default") {
    const ranked = buildRanked(input, toolName);
    return ranked.length ? ranked[0] : null;
  }

  function getFragmentByText(text) {
    return poolMap.get(normalizeText(text)) || null;
  }

  function getPoolSize() {
    return fragmentPool.length;
  }

  function isReady() {
    return poolReady;
  }

  function getLoadedFiles() {
    return [...loadedFiles];
  }

  window.REFRAME_FRAGMENT_ENGINE = {
    loadPool,
    isReady,
    getPoolSize,
    getLoadedFiles,
    getCarriedInput,
    normalizeText,
    excerpt,
    extractSignals,
    chooseThree,
    chooseOne,
    getFragmentByText,
    getToolProfile
  };
})();
