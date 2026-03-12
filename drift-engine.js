// REFRAME Drift Engine v2
// reads multiple fragment packs

async function loadFragments() {

  const sources = [
    "./fragment-pool.json",
    "./fragment-pack-1.json"
  ];

  let fragments = [];

  for (const src of sources) {
    try {
      const res = await fetch(src);
      const data = await res.json();

      if (data.fragments) {
        fragments = fragments.concat(data.fragments);
      }

    } catch (e) {
      console.warn("Fragment source failed:", src);
    }
  }

  return fragments;
}



async function reframeDrift(tags = [], count = 5) {

  const pool = await loadFragments();

  // match by tag
  const matched = pool.filter(f =>
    tags.some(tag => f.tags.includes(tag))
  );

  // fallback
  const source = matched.length > 0 ? matched : pool;

  const results = [];

  for (let i = 0; i < count; i++) {

    let pick;

    // 70% logical
    if (Math.random() < 0.7) {
      pick = source[Math.floor(Math.random() * source.length)];
    }

    // 30% glitch
    else {
      pick = pool[Math.floor(Math.random() * pool.length)];
    }

    results.push(pick.text);
  }

  return results;
}
