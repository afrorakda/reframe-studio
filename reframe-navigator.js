(function () {
  "use strict";

  function getToolsForZone(zoneId, zoneTitle) {
    var byId = {
      "next-step-finder": [
        "next-step-finder.html",
        "problem-to-options.html",
        "constraint-to-action.html"
      ],
      "tool-factory": [
        "idea-to-tool-spec.html",
        "tool-generator-v3.html",
        "tool-factory-pro.html"
      ],
      "constraint-to-action": [
        "constraint-to-action.html",
        "problem-to-constraints.html"
      ],
      "problem-to-root-cause": [
        "problem-to-root-cause.html",
        "problem-to-constraints.html"
      ],
      "problem-to-options": [
        "problem-to-options.html",
        "next-step-finder.html"
      ],
      "problem-to-constraints": [
        "problem-to-constraints.html",
        "constraint-to-action.html"
      ],
      "stuck-to-tool": [
        "next-step-finder.html",
        "problem-to-options.html",
        "problem-to-root-cause.html"
      ],
      "idea-to-tool-spec": [
        "idea-to-tool-spec.html",
        "tool-generator-v3.html",
        "tool-factory.html"
      ],
      "tool-factory-pro": [
        "tool-factory-pro.html",
        "tool-generator-v3.html",
        "idea-to-tool-spec.html"
      ],
      "emotion-to-action": [
        "emotion-to-action.html",
        "next-step-finder.html"
      ]
    };

    if (zoneId && byId[zoneId]) {
      return byId[zoneId];
    }

    var byTitle = {
      "Next Step Finder": [
        "next-step-finder.html",
        "problem-to-options.html",
        "constraint-to-action.html"
      ],
      "Tool Factory": [
        "idea-to-tool-spec.html",
        "tool-generator-v3.html",
        "tool-factory-pro.html"
      ],
      "Constraint → Action": [
        "constraint-to-action.html",
        "problem-to-constraints.html"
      ],
      "Problem → Root Causes": [
        "problem-to-root-cause.html",
        "problem-to-constraints.html"
      ],
      "Problem → Options": [
        "problem-to-options.html",
        "next-step-finder.html"
      ],
      "Problem → Constraints": [
        "problem-to-constraints.html",
        "constraint-to-action.html"
      ],
      "Stuck → Best Tool": [
        "next-step-finder.html",
        "problem-to-options.html",
        "problem-to-root-cause.html"
      ],
      "Idea → Tool Spec": [
        "idea-to-tool-spec.html",
        "tool-generator-v3.html",
        "tool-factory.html"
      ],
      "Tool Factory Pro": [
        "tool-factory-pro.html",
        "tool-generator-v3.html",
        "idea-to-tool-spec.html"
      ],
      "Emotion → Action": [
        "emotion-to-action.html",
        "next-step-finder.html"
      ]
    };

    return byTitle[zoneTitle] || [];
  }

  function navigate(input) {
    if (!window.REFRAME_MUTATION_LOOP) {
      return {
        error: "REFRAME_MUTATION_LOOP is missing."
      };
    }

    var loop = window.REFRAME_MUTATION_LOOP.runLoop(input, {
      mode: "stable",
      steps: 3,
      limit: 3
    });

    var path = window.REFRAME_MUTATION_LOOP.getLoopPath(loop);

    if (!path || !path.length) {
      return {
        error: "No path was created."
      };
    }

    var last = path[path.length - 1];
    var zoneId = last.zoneId || "";
    var zoneTitle = last.zoneTitle || "";

    return {
      zoneId: zoneId,
      zone: zoneTitle,
      tools: getToolsForZone(zoneId, zoneTitle),
      path: path,
      loop: loop
    };
  }

  window.REFRAME_NAVIGATOR = {
    navigate: navigate
  };
})();
