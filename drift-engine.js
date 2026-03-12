// REFRAME Drift Engine v1.1
// Simple intentional glitch generator

async function reframeDrift(tags = [], count = 5) {
  try {
    const response = await fetch("./fragment-pool.json");
    const data = await response.json();
    const pool = data.fragments || [];

    if (!pool.length) {
      return ["fragment pool is empty"];
    }

    const matched = pool.filter(f =>
      Array.isArray(f.tags) && tags.some(tag => f.tags.includes(tag))
    );

    const source = matched.length > 0 ? matched : pool;
    const results = [];
    const used = new Set();

    while (results.length < count && used.size < pool.length) {
      let pick;

      // 70% logical match
      if (Math.random() < 0.7) {
        pick = source[Math.floor(Math.random() * source.length)];
      }
      // 30% intentional glitch
      else {
        pick = pool[Math.floor(Math.random() * pool.length)];
      }

      if (!pick || used.has(pick.text)) continue;

      used.add(pick.text);
      results.push(pick.text);
    }

    return results;

  } catch (error) {
    console.error("Drift Engine error:", error);
    return ["drift engine failed to load fragments"];
  }
}
