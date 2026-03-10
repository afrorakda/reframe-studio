(function () {
  "use strict";

  var currentMode = "stable";

  function getMap() {
    if (typeof window !== "undefined" && window.REFRAME_MUTATION_MAP) {
      return window.REFRAME_MUTATION_MAP;
    }
    return null;
  }

  function getHelpers() {
    var map = getMap();
    if (!map || !map.helpers) return null;
    return map.helpers;
  }

  function normalizeText(text) {
    return String(text || "").trim().toLowerCase();
  }

  function cleanText(text) {
    return String(text || "").trim();
  }

  function detectSourceType(text) {
    var t = normalizeText(text);

    if (!t) return "idea";

    if (
      t.includes("people say") ||
      t.includes("they say") ||
      t.includes("critic") ||
      t.includes("judged") ||
      t.includes("judgment") ||
      t.includes("too abstract") ||
      t.includes("misunderstood") ||
      t.includes("unclear to others")
    ) {
      return "criticism";
    }

    if (
      t.includes("feel") ||
      t.includes("feeling") ||
      t.includes("tired") ||
      t.includes("sad") ||
      t.includes("afraid") ||
      t.includes("anxious") ||
      t.includes("scared") ||
      t.includes("heavy") ||
      t.includes("exhaust") ||
      t.includes("overwhelmed") ||
      t.includes("frustrated")
    ) {
      return "emotion";
    }

    if (
      t.includes("can't") ||
      t.includes("cannot") ||
      t.includes("stuck") ||
      t.includes("problem") ||
      t.includes("issue") ||
      t.includes("blocked") ||
      t.includes("hard to") ||
      t.includes("bottleneck")
    ) {
      return "problem";
    }

    if (
      t.includes("confused") ||
      t.includes("unclear") ||
      t.includes("don't understand") ||
      t.includes("do not understand") ||
      t.includes("not sure") ||
      t.includes("why")
    ) {
      return "confusion";
    }

    if (
      t.includes("failed") ||
      t.includes("failure") ||
      t.includes("didn't work") ||
      t.includes("did not work") ||
      t.includes("fell apart") ||
      t.includes("went wrong")
    ) {
      return "failure";
    }

    return "idea";
  }

  function createFragment(text, sourceType) {
    var raw = cleanText(text);
    return {
      raw: raw,
      normalized: normalizeText(raw),
      sourceType: sourceType || detectSourceType(raw)
    };
  }

  function setMode(mode) {
    var helpers = getHelpers();
    if (!helpers || !helpers.getMode) {
      currentMode = "stable";
      return currentMode;
    }

    var safeMode = helpers.getMode(mode);
    currentMode = safeMode && safeMode.id ? safeMode.id : "stable";
    return currentMode;
  }

  function getMode() {
    return currentMode;
  }

  function getZone(id) {
    var helpers = getHelpers();
    if (!helpers || !helpers.getContactZoneById) return null;
    return helpers.getContactZoneById(id);
  }

  function toTool(zone) {
    var helpers = getHelpers();
    if (!zone || !helpers || !helpers.getZoneFile) return null;

    return {
      id: zone.id,
      title: zone.title,
      file: helpers.getZoneFile(zone.id),
      note: zone.role || "Next mutation tool.",
      cluster: zone.cluster || ""
    };
  }

  function getEntryTools(fragmentOrText) {
    var helpers = getHelpers();
    if (!helpers || !helpers.getEntryToolsBySourceType) return [];

    var fragment =
      typeof fragmentOrText === "string"
        ? createFragment(fragmentOrText)
        : (fragmentOrText || createFragment(""));

    return helpers.getEntryToolsBySourceType(fragment.sourceType || "idea");
  }

  function getNextToolsByZone(zoneId, mode) {
    var helpers = getHelpers();
    if (!helpers || !helpers.getNextToolsByMode) return [];

    var activeMode = mode || currentMode || "stable";
    return helpers.getNextToolsByMode(zoneId, activeMode);
  }

  function buildTrail(fragmentOrText, options) {
    var opts = options || {};
    var fragment =
      typeof fragmentOrText === "string"
        ? createFragment(fragmentOrText, opts.sourceType)
        : (fragmentOrText || createFragment("", opts.sourceType));

    var mode = setMode(opts.mode || currentMode || "stable");
    var entryTools = getEntryTools(fragment);
    var firstTool = entryTools.length ? entryTools[0] : null;
    var nextTools = firstTool ? getNextToolsByZone(firstTool.id, mode) : [];

    var trail = [
      {
        kind: "fragment",
        id: "fragment",
        title: fragment.raw || "Empty fragment",
        note: "This is the thought fragment you dropped into the system."
      }
    ];

    if (firstTool) {
      trail.push({
        kind: "mutation",
        id: firstTool.id,
        title: firstTool.title,
        note: firstTool.note || "First mutation."
      });
    }

    if (nextTools.length) {
      trail.push({
        kind: "next",
        id: nextTools[0].id,
        title: nextTools[0].title,
        note: nextTools[0].note || "Next mutation."
      });
    }

    return {
      fragment: fragment,
      mode: mode,
      sourceType: fragment.sourceType,
      entryTools: entryTools,
      firstTool: firstTool,
      nextTools: nextTools,
      trail: trail
    };
  }

  function continueTrail(currentZoneId, fragmentText, options) {
    var opts = options || {};
    var fragment = createFragment(fragmentText || "", opts.sourceType);
    var mode = setMode(opts.mode || currentMode || "stable");
    var currentTool = getZone(currentZoneId);
    var currentToolData = toTool(currentTool);
    var nextTools = currentTool ? getNextToolsByZone(currentZoneId, mode) : [];

    var trail = [
      {
        kind: "fragment",
        id: "fragment",
        title: fragment.raw || "Empty fragment",
        note: "Original fragment."
      }
    ];

    if (currentToolData) {
      trail.push({
        kind: "mutation",
        id: currentToolData.id,
        title: currentToolData.title,
        note: currentToolData.note || "Current mutation."
      });
    }

    if (nextTools.length) {
      trail.push({
        kind: "next",
        id: nextTools[0].id,
        title: nextTools[0].title,
        note: nextTools[0].note || "Next opening."
      });
    }

    return {
      fragment: fragment,
      mode: mode,
      sourceType: fragment.sourceType,
      currentTool: currentToolData,
      nextTools: nextTools,
      trail: trail
    };
  }

  function getNextTools(fragmentOrText, mode) {
    var fragment =
      typeof fragmentOrText === "string"
        ? createFragment(fragmentOrText)
        : (fragmentOrText || createFragment(""));

    setMode(mode || currentMode || "stable");
    return getEntryTools(fragment);
  }

  function goToTool(toolId, params) {
    if (typeof window === "undefined") return;

    var helpers = getHelpers();
    if (!helpers || !helpers.getZoneFile) return;

    var zone = getZone(toolId);
    if (!zone) return;

    var file = helpers.getZoneFile(zone.id);
    var query = buildQueryString(params || {});
    window.location.href = query ? file + "?" + query : file;
  }

  function buildQueryString(params) {
    var entries = Object.keys(params || {}).filter(function (key) {
      return params[key] !== undefined && params[key] !== null && params[key] !== "";
    });

    return entries.map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(String(params[key]));
    }).join("&");
  }

  function getParams() {
    if (typeof window === "undefined") return {};

    var search = window.location.search || "";
    var params = new URLSearchParams(search);
    var result = {};

    params.forEach(function (value, key) {
      result[key] = value;
    });

    return result;
  }

  function getFragmentFromParams() {
    var params = getParams();
    return createFragment(params.fragment || "", params.type || "");
  }

  function getTrailFromParams() {
    var params = getParams();

    if (!params.fragment) {
      return null;
    }

    return buildTrail(params.fragment, {
      sourceType: params.type || "",
      mode: params.mode || "stable"
    });
  }

  function getRouterState() {
    return {
      mode: currentMode
    };
  }

  var Router = {
    getMap: getMap,
    getHelpers: getHelpers,
    normalizeText: normalizeText,
    cleanText: cleanText,
    detectSourceType: detectSourceType,
    createFragment: createFragment,
    setMode: setMode,
    getMode: getMode,
    getZone: getZone,
    getEntryTools: getEntryTools,
    getNextTools: getNextTools,
    getNextToolsByZone: getNextToolsByZone,
    buildTrail: buildTrail,
    continueTrail: continueTrail,
    goToTool: goToTool,
    buildQueryString: buildQueryString,
    getParams: getParams,
    getFragmentFromParams: getFragmentFromParams,
    getTrailFromParams: getTrailFromParams,
    getState: getRouterState
  };

  if (typeof window !== "undefined") {
    window.REFRAME_ROUTER = Router;
    window.detectSourceType = detectSourceType;
    window.getNextTools = getNextTools;
    window.getNextToolsByZone = getNextToolsByZone;
    window.setRouterMode = setMode;
    window.getRouterMode = getMode;
    window.createFragment = createFragment;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Router;
  }
})();
