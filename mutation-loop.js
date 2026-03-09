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

  function createLoopOutputState(zone, inputText) {
    if (!zone) {
      return {
        tags: ["unresolved"],
        text: "No strong mutation contact was found."
      };
    }

    var text = String(inputText || "").toLowerCase();
    var tags = Array.isArray(zone.outputState) ? zone.outputState.slice() : [];

    if (
      text.indexOf("idea") !== -1 ||
      text.indexOf("tool") !== -1 ||
      text.indexOf("アイデア") !== -1 ||
      text.indexOf("ツール") !== -1
    ) {
      tags.push("idea");
      tags.push("tool");
    }

    if (
      text.indexOf("problem") !== -1 ||
      text.indexOf("issue") !== -1 ||
      text.indexOf("問題") !== -1
    ) {
      tags.push("problem");
    }

    if (
      text.indexOf("feel") !== -1 ||
      text.indexOf("emotion") !== -1 ||
      text.indexOf("不安") !== -1 ||
      text.indexOf("感情") !== -1
    ) {
      tags.push("emotion");
    }

    tags = Array.from(new Set(tags));

    return {
      tags: tags,
      text:
        (zone.title || "Unknown Zone") +
        " surfaced as the best contact. " +
        "This creates a new field state toward " +
        ((zone.nextOpenings && zone.nextOpenings.length)
          ? zone.nextOpenings.join(", ")
          : "the next mutation") +
        "."
    };
  }

  function applyOutputCarryOver(fieldState, outputState, primaryZone) {
    var nextField = clone(fieldState);

    if (!nextField.friction || !nextField.mutation || !nextField.expression) {
      return fieldState;
    }

    var tags = outputState && Array.isArray(outputState.tags) ? outputState.tags : [];

    tags.forEach(function (tag) {
      if (tag === "less-stuck") {
        nextField.friction.ambiguity *= 0.82;
        nextField.friction.decision *= 0.9;
        addScore(nextField.mutation, "sequence", 0.08);
      }

      if (tag === "oriented") {
        addScore(nextField.expression, "structure", 0.1);
        addScore(nextField.mutation, "sequence", 0.08);
      }

      if (tag === "next-tool-visible" || tag === "next-step-visible") {
        addScore(nextField.expression, "action", 0.12);
        addScore(nextField.mutation, "sequence", 0.1);
      }

      if (tag === "diagnostic" || tag === "deeper" || tag === "root-cause-visible") {
        addScore(nextField.mutation, "decompose", 0.08);
        addScore(nextField.expression, "structure", 0.08);
      }

      if (tag === "constraint-visible" || tag === "reality-visible" || tag === "bounded") {
        nextField.friction.ambiguity *= 0.9;
        addScore(nextField.mutation, "convert", 0.08);
        addScore(nextField.expression, "action", 0.08);
      }

      if (tag === "option-rich" || tag === "alternative-visible" || tag === "less-trapped") {
        addScore(nextField.mutation, "expand", 0.08);
        addScore(nextField.expression, "seed", 0.08);
      }

      if (tag === "lighter" || tag === "emotionally-translated") {
        nextField.friction.emotional *= 0.82;
        addScore(nextField.expression, "statement", 0.08);
      }

      if (tag === "actionable" || tag === "motion-started" || tag === "reduced-pressure") {
        nextField.friction.momentum *= 0.8;
        nextField.friction.decision *= 0.9;
        addScore(nextField.expression, "action", 0.12);
      }

      if (tag === "spec-visible" || tag === "tool-shape-formed" || tag === "build-ready") {
        nextField.friction.expression *= 0.88;
        addScore(nextField.mutation, "convert", 0.12);
        addScore(nextField.expression, "structure", 0.12);
      }

      if (tag === "implementation-ready" || tag === "prompt-ready" || tag === "handoff-ready") {
        addScore(nextField.mutation, "sequence", 0.08);
        addScore(nextField.expression, "action", 0.08);
      }

      if (tag === "html-generated" || tag === "html-ready" || tag === "registry-ready" || tag === "integration-ready") {
        addScore(nextField.expression, "seed", 0.08);
        addScore(nextField.mutation, "expand", 0.06);
      }

      if (tag === "multi-tool-possible" || tag === "mutation-family-visible" || tag === "production-open") {
        addScore(nextField.mutation, "expand", 0.12);
        addScore(nextField.expression, "seed", 0.1);
      }

      if (tag === "batch-generated" || tag === "scalable-production" || tag === "system-growth-ready") {
        addScore(nextField.mutation, "sequence", 0.08);
        addScore(nextField.expression, "structure", 0.08);
      }

      if (tag === "idea") {
        addScore(nextField.mutation, "convert", 0.1);
        addScore(nextField.expression, "structure", 0.1);
      }

      if (tag === "tool") {
        addScore(nextField.mutation, "sequence", 0.08);
        addScore(nextField.expression, "action", 0.08);
      }

      if (tag === "problem") {
        addScore(nextField.mutation, "decompose", 0.08);
        addScore(nextField.expression, "list", 0.08);
      }

      if (tag === "emotion") {
        addScore(nextField.mutation, "externalize", 0.08);
        addScore(nextField.expression, "statement", 0.08);
      }
    });

    if (primaryZone) {
      if (primaryZone.id === "stuck-to-tool") {
        nextField.friction.ambiguity *= 0.82;
        addScore(nextField.mutation, "sequence", 0.08);
      }

      if (primaryZone.id === "next-step-finder") {
        nextField.friction.momentum *= 0.78;
        addScore(nextField.expression, "action", 0.12);
      }

      if (primaryZone.id === "problem-to-options") {
        addScore(nextField.mutation, "contrast", 0.08);
        addScore(nextField.expression, "seed", 0.08);
      }

      if (primaryZone.id === "idea-to-tool-spec") {
        nextField.friction.expression *= 0.84;
        addScore(nextField.expression, "structure", 0.12);
      }

      if (primaryZone.id === "constraint-to-action") {
        nextField.friction.decision *= 0.84;
        nextField.friction.momentum *= 0.8;
      }
    }

    normalizeFieldState(nextField);
    return nextField;
  }

  function buildStepSummary(stepNumber, primaryZone, driftSummary) {
    var zoneTitle = primaryZone ? primaryZone.title : "No zone";
    var driftText = driftSummary && driftSummary.text ? driftSummary.text : "";
    return "Step " + stepNumber + ": " + zoneTitle + ". " + driftText;
  }

  function chooseNextInputText(previousText, step) {
    if (!step || !step.primaryZone) return previousText;

    var nextNames = Array.isArray(step.primaryZone.nextOpenings)
      ? step.primaryZone.nextOpenings.join(", ")
      : "next openings";

    return previousText + " -> " + step.primaryZone.title + " -> " + nextNames;
  }

  function createLoopStep(params) {
    var stepNumber = params.stepNumber;
    var inputText = params.inputText;
    var mode = params.mode;
    var fieldState = params.fieldState;
    var driftResult = params.driftResult;
    var rankedZones = params.rankedZones;

    var primaryZone = rankedZones && rankedZones.length ? rankedZones[0] : null;
    var nearbyZones = rankedZones && rankedZones.length ? rankedZones.slice(1) : [];
    var outputState = createLoopOutputState(primaryZone, inputText);
    var nextFieldState = applyOutputCarryOver(
      driftResult.driftedFieldState,
      outputState,
      primaryZone
    );

    return {
      stepNumber: stepNumber,
      inputText: inputText,
      mode: mode,
      fieldStateBefore: clone(fieldState),
      driftSummary: driftResult.driftSummary,
      primaryZone: primaryZone,
      nearbyZones: nearbyZones,
      nextOpenings: primaryZone && primaryZone.nextOpenings ? primaryZone.nextOpenings.slice() : [],
      outputState: outputState,
      nextFieldState: nextFieldState,
      summary: buildStepSummary(stepNumber, primaryZone, driftResult.driftSummary)
    };
  }

  function runSingleStep(inputText, options) {
    options = options || {};

    var mode = options.mode || "stable";
    var limit = typeof options.limit === "number" ? options.limit : 3;

    if (!window.REFRAME_ROUTER_V2) {
      throw new Error("REFRAME_ROUTER_V2 is missing. Load router-v2.js first.");
    }

    if (!window.REFRAME_DRIFT_ENGINE) {
      throw new Error("REFRAME_DRIFT_ENGINE is missing. Load drift-engine.js first.");
    }

    var baseField = options.fieldState
      ? clone(options.fieldState)
      : window.REFRAME_ROUTER_V2.estimateFieldState(inputText, "stable");

    var driftResult = window.REFRAME_DRIFT_ENGINE.driftAndRank(baseField, {
      mode: mode,
      limit: limit
    });

    if (window.REFRAME_DRIFT_MEMORY) {
      driftResult.rankedZones = window.REFRAME_DRIFT_MEMORY.apply(driftResult.rankedZones);
    }

    var previewZone = driftResult.rankedZones && driftResult.rankedZones.length
      ? driftResult.rankedZones[0]
      : null;

    var previewOutputState = createLoopOutputState(previewZone, inputText);

    if (window.REFRAME_GRAVITY_ENGINE) {
      driftResult.rankedZones = window.REFRAME_GRAVITY_ENGINE.apply(
        driftResult.rankedZones,
        previewOutputState
      );
    }

    return createLoopStep({
      stepNumber: options.stepNumber || 1,
      inputText: inputText,
      mode: mode,
      fieldState: baseField,
      driftResult: driftResult,
      rankedZones: driftResult.rankedZones
    });
  }

  function runLoop(inputText, options) {
    options = options || {};

    var steps = [];
    var maxSteps = typeof options.steps === "number" ? options.steps : 3;
    var mode = options.mode || "stable";
    var limit = typeof options.limit === "number" ? options.limit : 3;

    var currentInputText = inputText;
    var currentFieldState = null;

    if (window.REFRAME_DRIFT_MEMORY && window.REFRAME_DRIFT_MEMORY.reset) {
      window.REFRAME_DRIFT_MEMORY.reset();
    }

    for (var i = 0; i < maxSteps; i += 1) {
      var step = runSingleStep(currentInputText, {
        mode: mode,
        limit: limit,
        stepNumber: i + 1,
        fieldState: currentFieldState
      });

      steps.push(step);
      currentFieldState = clone(step.nextFieldState);
      currentInputText = chooseNextInputText(currentInputText, step);
    }

    return {
      inputText: inputText,
      mode: mode,
      stepsRequested: maxSteps,
      steps: steps,
      finalFieldState: steps.length ? clone(steps[steps.length - 1].nextFieldState) : null
    };
  }

  function summarizeLoop(loopResult) {
    if (!loopResult || !Array.isArray(loopResult.steps) || !loopResult.steps.length) {
      return {
        text: "No loop steps were created.",
        path: []
      };
    }

    var path = loopResult.steps.map(function (step) {
      return step.primaryZone ? step.primaryZone.title : "No zone";
    });

    return {
      text: "The loop moved through " + path.join(" → ") + ".",
      path: path
    };
  }

  function getLoopPath(loopResult) {
    if (!loopResult || !Array.isArray(loopResult.steps)) return [];

    return loopResult.steps.map(function (step) {
      return {
        stepNumber: step.stepNumber,
        zoneId: step.primaryZone ? step.primaryZone.id : null,
        zoneTitle: step.primaryZone ? step.primaryZone.title : null
      };
    });
  }

  var mutationLoop = {
    version: "1.1",
    name: "REFRAME Mutation Loop Engine v1",
    description: "Turns one mutation result into the next field state and continues the chain.",
    runSingleStep: runSingleStep,
    runLoop: runLoop,
    summarizeLoop: summarizeLoop,
    getLoopPath: getLoopPath
  };

  if (typeof window !== "undefined") {
    window.REFRAME_MUTATION_LOOP = mutationLoop;
  }
})();
