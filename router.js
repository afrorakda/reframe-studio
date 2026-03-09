(function () {
  "use strict";

  function getMap() {
    if (typeof window !== "undefined" && window.REFRAME_MUTATION_MAP) {
      return window.REFRAME_MUTATION_MAP;
    }
    return null;
  }

  function getZone(id) {
    var map = getMap();
    if (!map || !map.helpers || !map.helpers.getContactZoneById) {
      return null;
    }
    return map.helpers.getContactZoneById(id);
  }

  function toTool(zone) {
    if (!zone) return null;

    return {
      id: zone.id,
      title: zone.title,
      file: zone.id + ".html",
      note: zone.role || "Next mutation tool."
    };
  }

  function findZones(ids) {
    return ids
      .map(function (id) {
        return getZone(id);
      })
      .filter(Boolean)
      .map(toTool)
      .filter(Boolean);
  }

  function detectSourceType(text) {
    var t = String(text || "").toLowerCase();

    if (t.includes("people say") || t.includes("critic") || t.includes("too abstract")) {
      return "criticism";
    }

    if (t.includes("feel") || t.includes("tired") || t.includes("exhaust") || t.includes("overwhelmed")) {
      return "emotion";
    }

    if (t.includes("can't") || t.includes("cannot") || t.includes("stuck") || t.includes("problem")) {
      return "problem";
    }

    if (t.includes("confused") || t.includes("unclear") || t.includes("why")) {
      return "confusion";
    }

    if (t.includes("failed") || t.includes("didn't work") || t.includes("did not work")) {
      return "failure";
    }

    return "idea";
  }

  function getNextTools(fragment) {

    var type = fragment && fragment.sourceType ? fragment.sourceType : "idea";

    if (type === "criticism") {
      return findZones([
        "problem-to-options",
        "emotion-to-action",
        "next-step-finder"
      ]);
    }

    if (type === "emotion") {
      return findZones([
        "emotion-to-action",
        "next-step-finder",
        "constraint-to-action"
      ]);
    }

    if (type === "problem") {
      return findZones([
        "problem-to-root-cause",
        "problem-to-constraints",
        "problem-to-options"
      ]);
    }

    if (type === "confusion") {
      return findZones([
        "thought-map",
        "thought-map-v2",
        "stuck-to-tool"
      ]);
    }

    if (type === "failure") {
      return findZones([
        "problem-to-root-cause",
        "emotion-to-action",
        "next-step-finder"
      ]);
    }

    return findZones([
      "idea-to-tool-spec",
      "tool-factory",
      "thought-map-v2"
    ]);
  }

  if (typeof window !== "undefined") {
    window.detectSourceType = detectSourceType;
    window.getNextTools = getNextTools;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      detectSourceType: detectSourceType,
      getNextTools: getNextTools
    };
  }

})();
