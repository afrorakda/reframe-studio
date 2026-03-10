(function () {
  "use strict";

  const mutationMap = {
    version: "2.0",
    name: "REFRAME Mutation Map",
    description:
      "Three-field thinking model for REFRAME Studio. Thought drifts through fields and touches mutation contact zones.",

    corePrinciples: [
      "Thought does not move between nodes. Thought drifts inside fields.",
      "Tools are not answers. Tools are mutation contact zones.",
      "1 tool = 1 primary mutation.",
      "Output must create the next field state.",
      "Chaos is not random. Chaos is meaningful turbulence."
    ],

    sourceTypes: {
      criticism: {
        id: "criticism",
        label: "Criticism",
        description: "Outside judgment creates friction and reaction.",
        entryZones: [
          "problem-to-options",
          "emotion-to-action",
          "next-step-finder"
        ]
      },
      emotion: {
        id: "emotion",
        label: "Emotion",
        description: "Emotional heaviness blocks movement.",
        entryZones: [
          "emotion-to-action",
          "next-step-finder",
          "constraint-to-action"
        ]
      },
      problem: {
        id: "problem",
        label: "Problem",
        description: "A concrete stuck point needs structure.",
        entryZones: [
          "problem-to-root-cause",
          "problem-to-constraints",
          "problem-to-options"
        ]
      },
      confusion: {
        id: "confusion",
        label: "Confusion",
        description: "The shape of the thought is not yet clear.",
        entryZones: [
          "thought-map",
          "thought-map-v2",
          "stuck-to-tool"
        ]
      },
      failure: {
        id: "failure",
        label: "Failure",
        description: "Past attempts failed and now need reframing.",
        entryZones: [
          "problem-to-root-cause",
          "emotion-to-action",
          "next-step-finder"
        ]
      },
      idea: {
        id: "idea",
        label: "Idea",
        description: "A floating idea needs shape or multiplication.",
        entryZones: [
          "idea-to-tool-spec",
          "tool-factory",
          "thought-map-v2"
        ]
      }
    },

    fields: {
      friction: {
        title: "Friction Field",
        description: "Defines where thinking gets stuck.",
        axes: [
          {
            id: "ambiguity",
            label: "Ambiguity",
            description: "Thinking is vague and lacks clear shape."
          },
          {
            id: "overload",
            label: "Overload",
            description: "There is too much information or too many moving parts."
          },
          {
            id: "emotional",
            label: "Emotional",
            description: "Emotion creates heaviness, fear, or hesitation."
          },
          {
            id: "structural",
            label: "Structural",
            description: "The inner structure of the problem is unclear."
          },
          {
            id: "decision",
            label: "Decision",
            description: "Thinking is stuck because it cannot choose."
          },
          {
            id: "expression",
            label: "Expression",
            description: "Thought exists but cannot yet be said or shaped."
          },
          {
            id: "momentum",
            label: "Momentum",
            description: "Thinking knows enough but cannot start moving."
          },
          {
            id: "identity",
            label: "Identity",
            description: "Self-image or role is blocking movement."
          },
          {
            id: "context",
            label: "Context",
            description: "External constraints are blocking movement."
          }
        ]
      },

      mutation: {
        title: "Mutation Field",
        description: "Defines how thinking transforms.",
        vectors: [
          {
            id: "clarify",
            label: "Clarify",
            description: "Make something clearer."
          },
          {
            id: "decompose",
            label: "Decompose",
            description: "Break a whole into parts."
          },
          {
            id: "narrow",
            label: "Narrow",
            description: "Reduce and focus."
          },
          {
            id: "expand",
            label: "Expand",
            description: "Open more possible directions."
          },
          {
            id: "reframe",
            label: "Reframe",
            description: "Change the meaning or angle."
          },
          {
            id: "oppose",
            label: "Oppose",
            description: "Look from the opposite side."
          },
          {
            id: "convert",
            label: "Convert",
            description: "Change one form into another."
          },
          {
            id: "sequence",
            label: "Sequence",
            description: "Put movement into order."
          },
          {
            id: "externalize",
            label: "Externalize",
            description: "Bring inner thought outward."
          },
          {
            id: "contrast",
            label: "Contrast",
            description: "Reveal shape through difference."
          },
          {
            id: "destabilize",
            label: "Destabilize",
            description: "Shake fixed thinking on purpose."
          },
          {
            id: "condense",
            label: "Condense",
            description: "Compress into a smaller core."
          }
        ]
      },

      expression: {
        title: "Expression Field",
        description: "Defines how thinking appears externally.",
        forms: [
          {
            id: "question",
            label: "Question",
            description: "Appears as a question."
          },
          {
            id: "statement",
            label: "Statement",
            description: "Appears as a short statement."
          },
          {
            id: "list",
            label: "List",
            description: "Appears as multiple items."
          },
          {
            id: "contrast",
            label: "Contrast",
            description: "Appears as a comparison."
          },
          {
            id: "structure",
            label: "Structure",
            description: "Appears as a framework or map."
          },
          {
            id: "action",
            label: "Action",
            description: "Appears as a next step."
          },
          {
            id: "metaphor",
            label: "Metaphor",
            description: "Appears as an image or metaphor."
          },
          {
            id: "prompt",
            label: "Prompt",
            description: "Appears as a new input invitation."
          },
          {
            id: "pattern",
            label: "Pattern",
            description: "Appears as a repeatable tendency or law."
          },
          {
            id: "seed",
            label: "Seed",
            description: "Appears as a starting point for the next idea."
          }
        ]
      }
    },

    modes: {
      stable: {
        id: "stable",
        label: "Stable",
        description: "Stabilizes the field and reveals clear movement.",
        nextLimit: 3,
        useFarOpenings: false,
        randomize: false
      },
      drift: {
        id: "drift",
        label: "Drift",
        description: "Adds slight directional change.",
        nextLimit: 3,
        useFarOpenings: true,
        randomize: true
      },
      chaos: {
        id: "chaos",
        label: "Chaos",
        description: "Creates meaningful turbulence and unexpected angles.",
        nextLimit: 5,
        useFarOpenings: true,
        randomize: true
      }
    },

    contactZones: [
      {
        id: "stuck-to-tool",
        title: "Stuck → Best Tool",
        cluster: "entry",
        role: "Entry zone that creates the first movement from a stuck state.",
        frictionProfile: {
          primary: ["ambiguity", "decision"],
          secondary: ["structural", "expression"]
        },
        mutationProfile: {
          primary: ["clarify"],
          secondary: ["narrow", "contrast"]
        },
        expressionProfile: {
          primary: ["list"],
          secondary: ["prompt", "action"]
        },
        outputState: ["less-stuck", "oriented", "next-tool-visible"],
        nextOpenings: [
          "problem-to-root-cause",
          "problem-to-constraints",
          "problem-to-options",
          "emotion-to-action",
          "next-step-finder"
        ],
        farOpenings: [
          "thought-map-v2",
          "idea-to-tool-spec"
        ]
      },

      {
        id: "next-step-finder",
        title: "Next Step Finder",
        cluster: "entry",
        role: "Small forward-movement zone for when thinking needs the next step.",
        frictionProfile: {
          primary: ["momentum", "decision"],
          secondary: ["ambiguity"]
        },
        mutationProfile: {
          primary: ["sequence"],
          secondary: ["narrow", "condense"]
        },
        expressionProfile: {
          primary: ["action"],
          secondary: ["list", "statement"]
        },
        outputState: ["next-step-visible", "movement-restored", "hesitation-reduced"],
        nextOpenings: [
          "constraint-to-action",
          "problem-to-constraints",
          "problem-to-options"
        ],
        farOpenings: [
          "emotion-to-action",
          "thought-map"
        ]
      },

      {
        id: "thought-map",
        title: "Thought Map",
        cluster: "entry",
        role: "Navigation zone that makes the tool landscape easier to read.",
        frictionProfile: {
          primary: ["structural", "decision"],
          secondary: ["ambiguity"]
        },
        mutationProfile: {
          primary: ["clarify"],
          secondary: ["condense"]
        },
        expressionProfile: {
          primary: ["structure"],
          secondary: ["prompt", "list"]
        },
        outputState: ["map-visible", "system-legible", "exploration-open"],
        nextOpenings: [
          "stuck-to-tool",
          "problem-to-root-cause",
          "problem-to-constraints",
          "problem-to-options",
          "emotion-to-action",
          "idea-to-tool-spec"
        ],
        farOpenings: [
          "tool-factory",
          "thought-map-v2"
        ]
      },

      {
        id: "thought-map-v2",
        title: "Thought Map v2",
        cluster: "entry",
        role: "Visual landscape zone that makes drift and relation easier to feel.",
        frictionProfile: {
          primary: ["structural", "overload"],
          secondary: ["decision"]
        },
        mutationProfile: {
          primary: ["condense"],
          secondary: ["clarify", "expand"]
        },
        expressionProfile: {
          primary: ["structure"],
          secondary: ["pattern", "prompt"]
        },
        outputState: ["landscape-visible", "relation-visible", "drift-curiosity-raised"],
        nextOpenings: [
          "thought-map",
          "stuck-to-tool",
          "problem-to-root-cause",
          "idea-to-tool-spec"
        ],
        farOpenings: [
          "tool-factory",
          "tool-generator-v3"
        ]
      },

      {
        id: "problem-to-root-cause",
        title: "Problem → Root Causes",
        cluster: "diagnostic",
        role: "Diagnostic zone that breaks a surface problem into causes.",
        frictionProfile: {
          primary: ["structural"],
          secondary: ["ambiguity", "overload"]
        },
        mutationProfile: {
          primary: ["decompose"],
          secondary: ["clarify", "contrast"]
        },
        expressionProfile: {
          primary: ["list"],
          secondary: ["structure", "pattern"]
        },
        outputState: ["diagnostic", "deeper", "root-cause-visible"],
        nextOpenings: [
          "problem-to-constraints",
          "problem-to-options",
          "constraint-to-action",
          "next-step-finder"
        ],
        farOpenings: [
          "emotion-to-action",
          "thought-map-v2"
        ]
      },

      {
        id: "problem-to-constraints",
        title: "Problem → Constraints",
        cluster: "diagnostic",
        role: "Zone that reveals the constraints behind the problem.",
        frictionProfile: {
          primary: ["structural", "context"],
          secondary: ["decision", "overload"]
        },
        mutationProfile: {
          primary: ["narrow"],
          secondary: ["condense", "clarify"]
        },
        expressionProfile: {
          primary: ["list"],
          secondary: ["structure"]
        },
        outputState: ["bounded", "constraint-visible", "reality-visible"],
        nextOpenings: [
          "constraint-to-action",
          "problem-to-options",
          "next-step-finder",
          "emotion-to-action"
        ],
        farOpenings: [
          "thought-map",
          "idea-to-tool-spec"
        ]
      },

      {
        id: "problem-to-options",
        title: "Problem → Options",
        cluster: "diagnostic",
        role: "Zone that creates alternative paths when thinking feels trapped.",
        frictionProfile: {
          primary: ["decision", "ambiguity"],
          secondary: ["structural", "identity"]
        },
        mutationProfile: {
          primary: ["expand"],
          secondary: ["contrast", "reframe"]
        },
        expressionProfile: {
          primary: ["list"],
          secondary: ["contrast", "seed"]
        },
        outputState: ["option-rich", "less-trapped", "alternative-visible"],
        nextOpenings: [
          "constraint-to-action",
          "next-step-finder",
          "problem-to-constraints",
          "idea-to-tool-spec"
        ],
        farOpenings: [
          "tool-factory",
          "thought-map-v2"
        ]
      },

      {
        id: "emotion-to-action",
        title: "Emotion → Action",
        cluster: "diagnostic",
        role: "Zone that turns emotional weight into usable movement.",
        frictionProfile: {
          primary: ["emotional"],
          secondary: ["expression", "momentum", "identity"]
        },
        mutationProfile: {
          primary: ["convert"],
          secondary: ["reframe", "externalize"]
        },
        expressionProfile: {
          primary: ["action"],
          secondary: ["statement", "question"]
        },
        outputState: ["lighter", "emotionally-translated", "action-ready"],
        nextOpenings: [
          "next-step-finder",
          "constraint-to-action",
          "problem-to-root-cause"
        ],
        farOpenings: [
          "thought-map",
          "problem-to-options"
        ]
      },

      {
        id: "constraint-to-action",
        title: "Constraint → Action",
        cluster: "conversion",
        role: "Zone that converts constraints into realistic next action.",
        frictionProfile: {
          primary: ["decision", "momentum", "context"],
          secondary: ["ambiguity"]
        },
        mutationProfile: {
          primary: ["convert"],
          secondary: ["sequence", "narrow"]
        },
        expressionProfile: {
          primary: ["action"],
          secondary: ["statement", "list"]
        },
        outputState: ["actionable", "reduced-pressure", "motion-started"],
        nextOpenings: [
          "next-step-finder",
          "problem-to-constraints",
          "problem-to-options"
        ],
        farOpenings: [
          "emotion-to-action",
          "thought-map-v2"
        ]
      },

      {
        id: "idea-to-tool-spec",
        title: "Idea → Tool Spec",
        cluster: "conversion",
        role: "Zone that shapes a floating idea into a REFRAME tool spec.",
        frictionProfile: {
          primary: ["expression", "ambiguity"],
          secondary: ["structural"]
        },
        mutationProfile: {
          primary: ["convert"],
          secondary: ["condense", "sequence"]
        },
        expressionProfile: {
          primary: ["structure"],
          secondary: ["list", "statement"]
        },
        outputState: ["spec-visible", "tool-shape-formed", "build-ready"],
        nextOpenings: [
          "tool-spec-to-html",
          "tool-generator-v2",
          "tool-generator-v3",
          "tool-factory"
        ],
        farOpenings: [
          "tool-factory-pro",
          "thought-map-v2"
        ]
      },

      {
        id: "tool-spec-to-html",
        title: "Tool Spec → HTML",
        cluster: "conversion",
        role: "Bridge zone that converts a tool spec into implementation-ready form.",
        frictionProfile: {
          primary: ["expression", "structural"],
          secondary: ["context"]
        },
        mutationProfile: {
          primary: ["convert"],
          secondary: ["sequence", "condense"]
        },
        expressionProfile: {
          primary: ["structure"],
          secondary: ["action", "statement"]
        },
        outputState: ["implementation-ready", "prompt-ready", "handoff-ready"],
        nextOpenings: [
          "tool-generator-v2",
          "tool-generator-v3",
          "tool-factory-pro"
        ],
        farOpenings: [
          "tool-factory",
          "thought-map"
        ]
      },

      {
        id: "tool-generator-v2",
        title: "Tool Generator v2",
        cluster: "conversion",
        role: "Zone that generates a single HTML tool from a tool idea.",
        frictionProfile: {
          primary: ["structural", "expression"],
          secondary: ["decision"]
        },
        mutationProfile: {
          primary: ["convert"],
          secondary: ["condense", "sequence"]
        },
        expressionProfile: {
          primary: ["structure"],
          secondary: ["action"]
        },
        outputState: ["html-generated", "single-tool-built", "concrete-output-ready"],
        nextOpenings: [
          "tool-generator-v3",
          "tool-factory",
          "thought-map"
        ],
        farOpenings: [
          "tool-factory-pro",
          "thought-map-v2"
        ]
      },

      {
        id: "tool-generator-v3",
        title: "Tool Generator v3",
        cluster: "conversion",
        role: "Zone that generates HTML and tool-list-ready structure for integration.",
        frictionProfile: {
          primary: ["structural", "expression"],
          secondary: ["context", "decision"]
        },
        mutationProfile: {
          primary: ["convert"],
          secondary: ["sequence", "condense"]
        },
        expressionProfile: {
          primary: ["structure"],
          secondary: ["action", "list"]
        },
        outputState: ["html-ready", "registry-ready", "integration-ready"],
        nextOpenings: [
          "tool-factory",
          "tool-factory-pro",
          "thought-map-v2"
        ],
        farOpenings: [
          "thought-map",
          "stuck-to-tool"
        ]
      },

      {
        id: "tool-factory",
        title: "Tool Factory",
        cluster: "multiplication",
        role: "Zone that multiplies one idea into several tool directions.",
        frictionProfile: {
          primary: ["overload", "ambiguity"],
          secondary: ["expression", "decision"]
        },
        mutationProfile: {
          primary: ["expand"],
          secondary: ["convert", "contrast"]
        },
        expressionProfile: {
          primary: ["list"],
          secondary: ["seed", "structure"]
        },
        outputState: ["multi-tool-possible", "mutation-family-visible", "production-open"],
        nextOpenings: [
          "idea-to-tool-spec",
          "tool-generator-v3",
          "tool-factory-pro"
        ],
        farOpenings: [
          "thought-map-v2",
          "stuck-to-tool"
        ]
      },

      {
        id: "tool-factory-pro",
        title: "Tool Factory Pro",
        cluster: "multiplication",
        role: "Zone that compresses idea, specification, generation, and scaling into one batch flow.",
        frictionProfile: {
          primary: ["overload", "structural", "expression"],
          secondary: ["context"]
        },
        mutationProfile: {
          primary: ["expand"],
          secondary: ["convert", "condense", "sequence"]
        },
        expressionProfile: {
          primary: ["structure"],
          secondary: ["list", "seed", "action"]
        },
        outputState: ["batch-generated", "scalable-production", "system-growth-ready"],
        nextOpenings: [
          "tool-generator-v3",
          "thought-map-v2",
          "stuck-to-tool"
        ],
        farOpenings: [
          "tool-factory",
          "idea-to-tool-spec"
        ]
      }
    ]
  };

  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  function uniqueById(items) {
    const seen = {};
    return items.filter(function (item) {
      if (!item || !item.id) return false;
      if (seen[item.id]) return false;
      seen[item.id] = true;
      return true;
    });
  }

  function getFieldIds(fieldName, groupName) {
    const field = mutationMap.fields[fieldName];
    if (!field) return [];

    const group = field[groupName];
    if (!Array.isArray(group)) return [];

    return group.map(function (item) {
      return item.id;
    });
  }

  function getMode(modeId) {
    return mutationMap.modes[modeId] || mutationMap.modes.stable;
  }

  function getSourceType(typeId) {
    return mutationMap.sourceTypes[typeId] || mutationMap.sourceTypes.idea;
  }

  function getContactZoneById(id) {
    return mutationMap.contactZones.find(function (zone) {
      return zone.id === id;
    }) || null;
  }

  function getContactZonesByCluster(cluster) {
    return mutationMap.contactZones.filter(function (zone) {
      return zone.cluster === cluster;
    });
  }

  function getZoneFile(id) {
    return id + ".html";
  }

  function getNextZones(id) {
    const zone = getContactZoneById(id);
    if (!zone) return [];

    return zone.nextOpenings
      .map(function (nextId) {
        return getContactZoneById(nextId);
      })
      .filter(Boolean);
  }

  function getFarZones(id) {
    const zone = getContactZoneById(id);
    if (!zone || !Array.isArray(zone.farOpenings)) return [];

    return zone.farOpenings
      .map(function (nextId) {
        return getContactZoneById(nextId);
      })
      .filter(Boolean);
  }

  function getEntryZonesBySourceType(typeId) {
    const sourceType = getSourceType(typeId);

    return sourceType.entryZones
      .map(function (zoneId) {
        return getContactZoneById(zoneId);
      })
      .filter(Boolean);
  }

  function getNextZonesByMode(id, modeId) {
    const mode = getMode(modeId);
    const nearZones = getNextZones(id);
    const farZones = mode.useFarOpenings ? getFarZones(id) : [];
    let combined = uniqueById(nearZones.concat(farZones));

    if (mode.randomize) {
      combined = shuffle(combined);
    }

    return combined.slice(0, mode.nextLimit);
  }

  function toTool(zone) {
    if (!zone) return null;

    return {
      id: zone.id,
      title: zone.title,
      file: getZoneFile(zone.id),
      note: zone.role || "Next mutation tool.",
      cluster: zone.cluster
    };
  }

  function getNextToolsByMode(id, modeId) {
    return getNextZonesByMode(id, modeId).map(toTool).filter(Boolean);
  }

  function getEntryToolsBySourceType(typeId) {
    return getEntryZonesBySourceType(typeId).map(toTool).filter(Boolean);
  }

  function summarizeZone(id) {
    const zone = getContactZoneById(id);
    if (!zone) return null;

    return {
      id: zone.id,
      title: zone.title,
      cluster: zone.cluster,
      primaryFriction: zone.frictionProfile.primary.slice(),
      primaryMutation: zone.mutationProfile.primary.slice(),
      primaryExpression: zone.expressionProfile.primary.slice(),
      outputState: zone.outputState.slice(),
      nextOpenings: zone.nextOpenings.slice(),
      farOpenings: Array.isArray(zone.farOpenings) ? zone.farOpenings.slice() : []
    };
  }

  function summarizeSourceType(typeId) {
    const sourceType = getSourceType(typeId);

    return {
      id: sourceType.id,
      label: sourceType.label,
      description: sourceType.description,
      entryZones: sourceType.entryZones.slice()
    };
  }

  function summarizeMode(modeId) {
    const mode = getMode(modeId);

    return {
      id: mode.id,
      label: mode.label,
      description: mode.description,
      nextLimit: mode.nextLimit,
      useFarOpenings: mode.useFarOpenings,
      randomize: mode.randomize
    };
  }

  mutationMap.helpers = {
    getFieldIds: getFieldIds,
    getMode: getMode,
    getSourceType: getSourceType,
    getContactZoneById: getContactZoneById,
    getContactZonesByCluster: getContactZonesByCluster,
    getZoneFile: getZoneFile,
    getNextZones: getNextZones,
    getFarZones: getFarZones,
    getEntryZonesBySourceType: getEntryZonesBySourceType,
    getNextZonesByMode: getNextZonesByMode,
    getNextToolsByMode: getNextToolsByMode,
    getEntryToolsBySourceType: getEntryToolsBySourceType,
    summarizeZone: summarizeZone,
    summarizeSourceType: summarizeSourceType,
    summarizeMode: summarizeMode
  };

  if (typeof window !== "undefined") {
    window.REFRAME_MUTATION_MAP = mutationMap;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = mutationMap;
  }
})();
