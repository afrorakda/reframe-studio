(function () {
  function normalize(path) {
    return String(path || "").split("?")[0].split("#")[0];
  }

  function getCurrentFile() {
    const parts = window.location.pathname.split("/");
    return normalize(parts[parts.length - 1] || "");
  }

  function readHistory() {
    try {
      return JSON.parse(sessionStorage.getItem("REFRAME_ROUTE_HISTORY") || "[]");
    } catch {
      return [];
    }
  }

  function writeHistory(history) {
    try {
      sessionStorage.setItem("REFRAME_ROUTE_HISTORY", JSON.stringify(history.slice(-12)));
    } catch {}
  }

  function rememberCurrent() {
    const current = getCurrentFile();
    if (!current) return;

    const history = readHistory();
    if (history[history.length - 1] !== current) {
      history.push(current);
      writeHistory(history);
    }
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pickNext(candidates) {
    const current = getCurrentFile();
    const history = readHistory();
    const last = history.length >= 2 ? history[history.length - 2] : "";

    const clean = (candidates || []).map(normalize).filter(Boolean);

    let pool = clean.filter(file => file !== current && file !== last);

    if (!pool.length) {
      pool = clean.filter(file => file !== current);
    }

    if (!pool.length) {
      pool = clean;
    }

    return pool.length ? pickRandom(pool) : "";
  }

  function buildNextUrl(candidates, carryText) {
    const next = pickNext(candidates);
    if (!next) return "#";

    const text = String(carryText || "").trim();
    if (!text) return `./${next}`;

    return `./${next}?q=${encodeURIComponent(text)}`;
  }

  window.REFRAME_RANDOM_NEXT = {
    rememberCurrent,
    buildNextUrl
  };

  rememberCurrent();
})();
