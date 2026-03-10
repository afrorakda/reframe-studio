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
      t.includes("misunderstood")
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
      t.includes("hard to")
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

  function createFragment(text) {
    return {
      raw: String(text || ""),
      sourceType: detectSourceType(text)
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

  function getEntryTools(fragmentOrText) {
    var helpers = getHelpers();
    if (!helpers || !helpers.getEntryToolsBySourceType) return [];

    var fragment =
      typeof fragmentOrText === "string"
        ? createFragment(fragmentOrText)
        : (fragmentOrText || { sourceType: "idea" });

    var type = fragment.sourceType || "idea";
    return helpers.getEntryToolsBySourceType(type);
  }

  function getNextToolsByZone(zoneId, mode) {
    var helpers = getHelpers();
    if (!helpers || !helpers.getNextToolsByMode) return [];

    var activeMode = mode || currentMode || "stable";
    return helpers.getNextToolsByMode(zoneId, activeMode);
  }

  function getNextTools(fragmentOrText, mode) {
    var fragment =
      typeof fragmentOrText === "string"
        ? createFragment(fragmentOrText)
        : (fragmentOrText || { sourceType: "idea" });

    var activeMode = mode || currentMode || "stable";
    setMode(activeMode);

    return getEntryTools(fragment);
  }

  function getZone(id) {
    var helpers = getHelpers();
    if (!helpers || !helpers.getContactZoneById) return null;
    return helpers.getContactZoneById(id);
  }

  function goToTool(toolId) {
    if (typeof window === "undefined") return;

    var helpers = getHelpers();
    if (!helpers || !helpers.getZoneFile) return;

    var zone = getZone(toolId);
    if (!zone) return;

    window.location.href = helpers.getZoneFile(zone.id);
  }

  function getRouterState() {
    return {
      mode: currentMode
    };
  }

  var Router = {
    getMap: getMap,
    getZone: getZone,
    detectSourceType: detectSourceType,
    createFragment: createFragment,
    setMode: setMode,
    getMode: getMode,
    getEntryTools: getEntryTools,
    getNextTools: getNextTools,
    getNextToolsByZone: getNextToolsByZone,
    goToTool: goToTool,
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
