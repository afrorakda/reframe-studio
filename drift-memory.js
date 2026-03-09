(function () {
  "use strict";

  var memory = {
    history: []
  };

  function cloneZone(zone) {
    return {
      id: zone.id,
      title: zone.title,
      cluster: zone.cluster,
      role: zone.role,
      score: zone.score,
      outputState: Array.isArray(zone.outputState) ? zone.outputState.slice() : [],
      nextOpenings: Array.isArray(zone.nextOpenings) ? zone.nextOpenings.slice() : []
    };
  }

  function getPenalty(zoneId) {
    var penalty = 1;

    memory.history.forEach(function (pastId, index) {
      if (pastId !== zoneId) return;

      if (index === memory.history.length - 1) {
        penalty *= 0.35;
      } else if (index === memory.history.length - 2) {
        penalty *= 0.55;
      } else {
        penalty *= 0.75;
      }
    });

    return penalty;
  }

  function applyDriftMemory(rankedZones) {
    if (!rankedZones || !rankedZones.length) return rankedZones;

    var adjusted = rankedZones.map(function (zone) {
      var z = cloneZone(zone);
      z.score = z.score * getPenalty(z.id);
      return z;
    });

    adjusted.sort(function (a, b) {
      return b.score - a.score;
    });

    if (adjusted[0] && adjusted[0].id) {
      memory.history.push(adjusted[0].id);
    }

    if (memory.history.length > 3) {
      memory.history = memory.history.slice(-3);
    }

    return adjusted;
  }

  function resetMemory() {
    memory.history = [];
  }

  function getHistory() {
    return memory.history.slice();
  }

  window.REFRAME_DRIFT_MEMORY = {
    apply: applyDriftMemory,
    reset: resetMemory,
    getHistory: getHistory
  };
})();
