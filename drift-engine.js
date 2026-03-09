(function () {
  "use strict";

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function clamp01(num) {
    if (num < 0) return 0;
    if (num > 1) return 1;
    return num;
  }

  function addScore(bucket, key, amount) {
    if (!bucket || typeof bucket[key] !== "number") return;
    bucket[key] += amount;
  }

  function normalizeBucket(bucket) {
    var keys = Object.keys(bucket);
    var max = 0;

    keys.forEach(function (key) {
      if (bucket[key] > max) max = bucket[key];
    });

    if (max <= 0) return bucket;

    keys.forEach(function (key) {
      bucket[key] = clamp01(bucket[key] / max);
    });

    return bucket;
  }

  function normalizeFieldState(fieldState) {
    normalizeBucket(fieldState.friction);
    normalizeBucket(fieldState.mutation);
    normalizeBucket(fieldState.expression);
    return fieldState;
  }

  function getTopKeys(bucket, limit) {
    return Object.keys(bucket)
      .map(function (key) {
        return { key: key, score: bucket[key] };
      })
      .filter(function (item) {
        return item.score > 0;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      })
      .slice(0, limit || 3);
  }

  function applyStable(fieldState) {
    // Stable = clearer, safer, easier to read
    addScore(fieldState.mutation, "clarify", 0.18);
    addScore(fieldState.mutation, "sequence", 0.12);
    addScore(fieldState.mutation, "narrow", 0.1);

    addScore(fieldState.expression, "structure", 0.14);
    addScore(fieldState.expression, "action", 0.1);
    addScore(fieldState.expression, "list", 0.08);

    // reduce turbulence
    fieldState.mutation.destabilize *= 0.65;
    fieldState.mutation.oppose *= 0.75;
    fieldState.expression.metaphor *= 0.7;
    fieldState.expression.seed *= 0.8;

    return fieldState;
  }

  function applyDrift(fieldState) {
    // Drift = slight sideways movement
    addScore(fieldState.mutation, "reframe", 0.2);
    addScore(fieldState.mutation, "contrast", 0.18);
    addScore(fieldState.mutation, "expand", 0.12);

    addScore(fieldState.expression, "prompt", 0.18);
    addScore(fieldState.expression, "seed", 0.14);
    addScore(fieldState.expression, "contrast", 0.14);

    // soften rigid boundaries a bit
    fieldState.mutation.sequence *= 0.92;
    fieldState.expression.action *= 0.9;

    return fieldState;
  }

  function applyChaos(fieldState) {
    // Chaos = meaningful turbulence, not random
    addScore(fieldState.mutation, "destabilize", 0.32);
    addScore(fieldState.mutation, "oppose", 0.26);
    addScore(fieldState.mutation, "expand", 0.2);
    addScore(fieldState.mutation, "reframe", 0.18);

    addScore(fieldState.expression, "metaphor", 0.3);
    addScore(fieldState.expression, "seed", 0.24);
    addScore(fieldState.expression, "contrast", 0.2);
    addScore(fieldState.expression, "prompt", 0.16);

    // loosen safe closure
    fieldState.expression.action *= 0.82;
    fieldState.expression.structure *= 0.88;
    fieldState.mutation.sequence *= 0.84;

    return fieldState;
  }

  function applyThoughtGravity(fieldState, mode) {
    // Gravity pulls thought toward readable next motion
    var topFriction = getTopKeys(fieldState.friction, 2).map(function (item) {
      return item.key;
    });

    topFriction.forEach(function (frictionKey) {
      if (frictionKey === "ambiguity") {
        addScore(fieldState.mutation, "clarify", 0.18);
        addScore(fieldState.expression, "question", 0.08);
      }

      if (frictionKey === "overload") {
        addScore(fieldState.mutation, "condense", 0.18);
        addScore(fieldState.mutation, "narrow", 0.12);
        addScore(fieldState.expression, "list", 0.08);
        addScore(fieldState.expression, "structure", 0.08);
      }

      if (frictionKey === "emotional") {
        addScore(fieldState.mutation, "externalize", 0.16);
        addScore(fieldState.mutation, "reframe", 0.14);
        addScore(fieldState.expression, "statement", 0.08);
      }

      if (frictionKey === "structural") {
        addScore(fieldState.mutation, "decompose", 0.18);
        addScore(fieldState.mutation, "sequence", 0.12);
        addScore(fieldState.expression, "structure", 0.1);
      }

      if (frictionKey === "decision") {
        addScore(fieldState.mutation, "contrast", 0.16);
        addScore(fieldState.mutation, "narrow", 0.12);
        addScore(fieldState.expression, "action", 0.08);
      }

      if (frictionKey === "expression") {
        addScore(fieldState.mutation, "convert", 0.16);
        addScore(fieldState.mutation, "externalize", 0.16);
        addScore(fieldState.expression, "statement", 0.08);
        addScore(fieldState.expression, "structure", 0.08);
      }

      if (frictionKey === "momentum") {
        addScore(fieldState.mutation, "sequence", 0.18);
        addScore(fieldState.expression, "action", 0.12);
      }

      if (frictionKey === "identity") {
        addScore(fieldState.mutation, "reframe", 0.16);
        addScore(fieldState.mutation, "oppose", 0.12);
        addScore(fieldState.expression, "metaphor", 0.08);
      }

      if (frictionKey === "context") {
        addScore(fieldState.mutation, "convert", 0.18);
        addScore(fieldState.mutation, "narrow", 0.12);
        addScore(fieldState.expression, "action", 0.1);
      }
    });

    // Stable gets stronger gravity to safe movement
    if (mode === "stable") {
      addScore(fieldState.mutation, "clarify", 0.08);
      addScore(fieldState.expression, "action", 0.06);
    }

    return fieldState;
  }

  function applyThoughtFriction(fieldState, mode) {
    // Friction resists too-fast closure when the state is heavy
    var emotional = fieldState.friction.emotional || 0;
    var overload = fieldState.friction.overload || 0;
    var ambiguity = fieldState.friction.ambiguity || 0;

    if (emotional > 0.6) {
      fieldState.expression.action *= 0.82;
      addScore(fieldState.expression, "statement", 0.08);
    }

    if (overload > 0.6) {
      fieldState.mutation.expand *= 0.8;
      addScore(fieldState.mutation, "condense", 0.08);
      addScore(fieldState.expression, "list", 0.06);
    }

    if (ambiguity > 0.6) {
      fieldState.mutation.destabilize *= 0.78;
      addScore(fieldState.mutation, "clarify", 0.08);
    }

    // Chaos ignores some friction, but not all
    if (mode === "chaos") {
      fieldState.mutation.destabilize += 0.06;
      fieldState.mutation.oppose += 0.05;
    }

    return fieldState;
  }

  function applyThoughtNoise(fieldState, mode) {
    // Noise creates meaningful sideways movement
    if (mode === "stable") {
      addScore(fieldState.expression, "prompt", 0.04);
      return fieldState;
    }

    if (mode === "drift") {
      addScore(fieldState.mutation, "reframe", 0.08);
      addScore(fieldState.mutation, "contrast", 0.08);
      addScore(fieldState.expression, "seed", 0.06);
      addScore(fieldState.expression, "prompt", 0.06);
      return fieldState;
    }

    if (mode === "chaos") {
      addScore(fieldState.mutation, "destabilize", 0.1);
      addScore(fieldState.mutation, "oppose", 0.08);
      addScore(fieldState.expression, "metaphor", 0.08);
      addScore(fieldState.expression, "seed", 0.08);
      return fieldState;
    }

    return fieldState;
  }

  function driftFieldState(originalFieldState, options) {
    options = options || {};

    var mode = options.mode || "stable";
    var fieldState = clone(originalFieldState || {});
    fieldState.mode = mode;

    if (!fieldState.friction || !fieldState.mutation || !fieldState.expression) {
      throw new Error("Invalid field state. Missing friction, mutation, or expression.");
    }

    normalizeFieldState(fieldState);

    if (mode === "stable") {
      applyStable(fieldState);
    } else if (mode === "drift") {
      applyDrift(fieldState);
    } else if (mode === "chaos") {
      applyChaos(fieldState);
    }

    applyThoughtGravity(fieldState, mode);
    applyThoughtFriction(fieldState, mode);
    applyThoughtNoise(fieldState, mode);

    normalizeFieldState(fieldState);

    return {
      original: clone(originalFieldState),
      drifted: fieldState,
      mode: mode,
      summary: summarizeDrift(fieldState, mode)
    };
  }

  function scoreProfile(fieldBucket, profile) {
    if (!profile) return 0;

    var score = 0;
    var primary = Array.isArray(profile.primary) ? profile.primary : [];
    var secondary = Array.isArray(profile.secondary) ? profile.secondary : [];

    primary.forEach(function (key) {
      score += (fieldBucket[key] || 0) * 1.0;
    });

    secondary.forEach(function (key) {
      score += (fieldBucket[key] || 0) * 0.55;
    });

    return score;
  }

  function scoreZone(zone, fieldState, mode) {
    var frictionScore = scoreProfile(fieldState.friction, zone.frictionProfile);
    var mutationScore = scoreProfile(fieldState.mutation, zone.mutationProfile);
    var expressionScore = scoreProfile(fieldState.expression, zone.expressionProfile);

    var total = frictionScore * 0.36 + mutationScore * 0.42 + expressionScore * 0.22;

    if (mode === "stable") {
      if (zone.id === "stuck-to-tool" || zone.id === "next-step-finder" || zone.id === "constraint-to-action") {
        total += 0.12;
      }
    }

    if (mode === "drift") {
      if (
        zone.id === "problem-to-options" ||
        zone.id === "thought-map-v2" ||
        zone.id === "tool-factory"
      ) {
        total += 0.1;
      }
    }

    if (mode === "chaos") {
      if (
        zone.id === "problem-to-options" ||
        zone.id === "tool-factory" ||
        zone.id === "tool-factory-pro"
      ) {
        total += 0.14;
      }
    }

    return total;
  }

  function rankZones(fieldState, options) {
    options = options || {};
    var mode = options.mode || "stable";
    var limit = typeof options.limit === "number" ? options.limit : 3;
    var map = window.REFRAME_MUTATION_MAP;

    if (!map || !Array.isArray(map.contactZones)) {
      throw new Error("REFRAME_MUTATION_MAP is missing. Load mutation-map.js first.");
    }

    return map.contactZones
      .map(function (zone) {
        return {
          zone: zone,
          score: scoreZone(zone, fieldState, mode)
        };
      })
      .sort(function (a, b) {
        return b.score - a.score;
      })
      .slice(0, limit);
  }

  function summarizeDrift(fieldState, mode) {
    var topFriction = getTopKeys(fieldState.friction, 2).map(function (item) {
      return item.key;
    });
    var topMutation = getTopKeys(fieldState.mutation, 3).map(function (item) {
      return item.key;
    });
    var topExpression = getTopKeys(fieldState.expression, 2).map(function (item) {
      return item.key;
    });

    return {
      mode: mode,
      topFriction: topFriction,
      topMutation: topMutation,
      topExpression: topExpression,
      text:
        "Mode " + mode +
        " shifted thought toward mutation pressure in " +
        (topMutation.join(", ") || "clarify") +
        ", with expression opening toward " +
        (topExpression.join(", ") || "list") +
        "."
    };
  }

  function driftAndRank(originalFieldState, options) {
    options = options || {};
    var driftResult = driftFieldState(originalFieldState, options);
    var ranked = rankZones(driftResult.drifted, options);

    return {
      mode: driftResult.mode,
      originalFieldState: driftResult.original,
      driftedFieldState: driftResult.drifted,
      driftSummary: driftResult.summary,
      rankedZones: ranked.map(function (item) {
        return {
          id: item.zone.id,
          title: item.zone.title,
          cluster: item.zone.cluster,
          role: item.zone.role,
          score: Number(item.score.toFixed(3)),
          outputState: item.zone.outputState.slice(),
          nextOpenings: item.zone.nextOpenings.slice()
        };
      })
    };
  }

  var driftEngine = {
    version: "1.0",
    name: "REFRAME Drift Engine v1",
    description: "Field behavior modifier for Stable / Drift / Chaos.",
    driftFieldState: driftFieldState,
    rankZones: rankZones,
    driftAndRank: driftAndRank,
    summarizeDrift: summarizeDrift
  };

  if (typeof window !== "undefined") {
    window.REFRAME_DRIFT_ENGINE = driftEngine;
  }
})();
