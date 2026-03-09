(function () {
  "use strict";

  var memory = {
    lastZoneId: null
  };

  function applyDriftMemory(rankedZones) {
    if (!rankedZones || !rankedZones.length) return rankedZones;

    var adjusted = rankedZones.map(function (zone) {
      var z = Object.assign({}, zone);

      if (memory.lastZoneId && z.id === memory.lastZoneId) {
        z.score = z.score * 0.75;
      }

      return z;
    });

    adjusted.sort(function (a, b) {
      return b.score - a.score;
    });

    memory.lastZoneId = adjusted[0].id;

    return adjusted;
  }

  function resetMemory() {
    memory.lastZoneId = null;
  }

  window.REFRAME_DRIFT_MEMORY = {
    apply: applyDriftMemory,
    reset: resetMemory
  };
})();
