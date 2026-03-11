const REFRAME_MUTATION_MAP = {
  version: "1.0",
  philosophy: {
    core: "Thought does not stop at answers. Thought mutates into new directions.",
    rule: "1 tool = 1 mutation",
    purpose: "Guide fragments into mutation paths, not fixed conclusions."
  },

  fields: {
    friction: {
      id: "friction",
      label: "Friction Field",
      description: "Where thought gets stuck, pressed, or energized."
    },
    mutation: {
      id: "mutation",
      label: "Mutation Field",
      description: "Where thought changes form."
    },
    expression: {
      id: "expression",
      label: "Expression Field",
      description: "Where thought becomes visible or usable."
    }
  },

  fragmentTypes: {
    criticism: {
      id: "criticism",
      label: "Criticism",
      field: "friction",
      description: "External reaction, judgment, or pushback that contains compressed insight.",
      signals: [
        "people say",
        "they say",
        "someone said",
        "feedback",
        "too abstract",
        "too vague",
        "too much",
        "reaction"
      ],
      defaultWhy: "This fragment sounds like outside feedback. External reaction often contains hidden creative signal.",
      mutationPaths: ["lesson", "reframe", "angle", "question"],
      expressionPaths: ["hook", "thread", "post", "seed"],
      nextMutations: [
        "What are they actually reacting to?",
        "What part feels abstract to them?",
        "Can the criticism become a positioning advantage?",
        "What new content idea is hidden inside this reaction?"
      ]
    },

    emotion: {
      id: "emotion",
      label: "Emotion",
      field: "friction",
      description: "A feeling-heavy fragment carrying pressure, resistance, or energy.",
      signals: [
        "feel",
        "feels",
        "feeling",
        "tired",
        "exhausted",
        "exhausting",
        "frustrated",
        "overwhelmed",
        "anxious",
        "stressed",
        "sad",
        "angry",
        "burned out"
      ],
      defaultWhy: "This fragment carries emotional pressure. Emotion is stored movement energy.",
      mutationPaths: ["convert", "reframe", "question", "lesson"],
      expressionPaths: ["action", "statement", "seed"],
      nextMutations: [
        "What is this feeling trying to protect?",
        "What action would reduce the pressure?",
        "What truth is hidden inside the emotion?",
        "What fragment appears underneath the feeling?"
      ]
    },

    problem: {
      id: "problem",
      label: "Problem",
      field: "friction",
      description: "A blockage, stuck point, or obstacle that needs movement.",
      signals: [
        "can't",
        "cannot",
        "stuck",
        "not working",
        "won't work",
        "hard to",
        "difficult",
        "problem",
        "issue",
        "blocked",
        "struggle"
      ],
      defaultWhy: "This fragment points to blockage or inability. It needs a mutation that reopens movement.",
      mutationPaths: ["root-cause", "constraint", "options", "question"],
      expressionPaths: ["action", "structure", "list"],
      nextMutations: [
        "What is the real blockage here?",
        "Which part is fact and which part is assumption?",
        "What options appear if the current frame is removed?",
        "What small movement would count as progress?"
      ]
    },

    confusion: {
      id: "confusion",
      label: "Confusion",
      field: "friction",
      description: "An unclear fragment that lacks structure, direction, or shape.",
      signals: [
        "don't know",
        "do not know",
        "unclear",
        "confused",
        "not sure",
        "unsure",
        "which direction",
        "where to start",
        "how to decide",
        "no idea"
      ],
      defaultWhy: "This fragment lacks shape or direction. Confusion usually wants structure or a better question.",
      mutationPaths: ["question", "structure", "constraint", "reframe"],
      expressionPaths: ["list", "structure", "action"],
      nextMutations: [
        "What exactly is unclear?",
        "What question would make this simpler?",
        "What is missing: data, decision, or direction?",
        "What is the smallest clear version of this thought?"
      ]
    },

    failure: {
      id: "failure",
      label: "Failure",
      field: "friction",
      description: "A fragment shaped by breakdown, loss, or something not working out.",
      signals: [
        "failed",
        "failure",
        "didn't work",
        "did not work",
        "mistake",
        "messed up",
        "fell apart",
        "collapsed",
        "broke"
      ],
      defaultWhy: "This fragment reflects breakdown or disappointment. Failure can mutate into lesson, redesign, or a new attempt.",
      mutationPaths: ["lesson", "constraint", "reframe", "opposite"],
      expressionPaths: ["action", "statement", "seed"],
      nextMutations: [
        "What failed: execution, framing, or expectation?",
        "What did this reveal that success would have hidden?",
        "What should be kept, removed, or reversed?",
        "What smaller retry is possible now?"
      ]
    },

    idea: {
      id: "idea",
      label: "Idea",
      field: "friction",
      description: "A possibility fragment that has energy but not yet enough shape.",
      signals: [
        "idea",
        "maybe",
        "might",
        "what if",
        "could",
        "perhaps",
        "possible",
        "build",
        "create",
        "make"
      ],
      defaultWhy: "This fragment feels exploratory and possible. It carries seed energy, not yet structure.",
      mutationPaths: ["angle", "metaphor", "tool", "hook"],
      expressionPaths: ["thread", "post", "seed", "structure"],
      nextMutations: [
        "What is the most interesting angle inside this idea?",
        "What mutation does this idea want to perform?",
        "Could this become a tool instead of only a thought?",
        "What new fragment would this idea generate?"
      ]
    }
  },

  mutations: {
    lesson: {
      id: "lesson",
      label: "Lesson",
      field: "mutation",
      description: "Extract a useful principle from friction."
    },
    reframe: {
      id: "reframe",
      label: "Reframe",
      field: "mutation",
      description: "Change the meaning or interpretive lens."
    },
    angle: {
      id: "angle",
      label: "Angle",
      field: "mutation",
      description: "Find a stronger perspective or take."
    },
    question: {
      id: "question",
      label: "Question",
      field: "mutation",
      description: "Turn fog into inquiry."
    },
    convert: {
      id: "convert",
      label: "Convert",
      field: "mutation",
      description: "Transform raw emotion into usable movement."
    },
    "root-cause": {
      id: "root-cause",
      label: "Root Cause",
      field: "mutation",
      description: "Go beneath the surface problem."
    },
    constraint: {
      id: "constraint",
      label: "Constraint",
      field: "mutation",
      description: "Identify limits, boundaries, or conditions."
    },
    options: {
      id: "options",
      label: "Options",
      field: "mutation",
      description: "Open multiple possible routes."
    },
    structure: {
      id: "structure",
      label: "Structure",
      field: "mutation",
      description: "Give shape to vague thought."
    },
    opposite: {
      id: "opposite",
      label: "Opposite",
      field: "mutation",
      description: "Flip direction to reveal a new route."
    },
    metaphor: {
      id: "metaphor",
      label: "Metaphor",
      field: "mutation",
      description: "Shift thought through symbolic comparison."
    },
    tool: {
      id: "tool",
      label: "Tool",
      field: "mutation",
      description: "Convert an idea into a single-mutation tool concept."
    },
    hook: {
      id: "hook",
      label: "Hook",
      field: "mutation",
      description: "Turn a thought into an attention-catching entry point."
    }
  },

  expressions: {
    action: {
      id: "action",
      label: "Action",
      field: "expression",
      description: "A next concrete move."
    },
    hook: {
      id: "hook",
      label: "Hook",
      field: "expression",
      description: "A sharp opening that pulls attention."
    },
    thread: {
      id: "thread",
      label: "Thread",
      field: "expression",
      description: "A connected sequence of visible thought."
    },
    post: {
      id: "post",
      label: "Post",
      field: "expression",
      description: "A public expression unit."
    },
    seed: {
      id: "seed",
      label: "Seed",
      field: "expression",
      description: "A small thought with future mutation potential."
    },
    structure: {
      id: "structure",
      label: "Structure",
      field: "expression",
      description: "An organized visible frame."
    },
    statement: {
      id: "statement",
      label: "Statement",
      field: "expression",
      description: "A clear visible claim."
    },
    list: {
      id: "list",
      label: "List",
      field: "expression",
      description: "A grouped output form."
    }
  },

  toolGroups: {
    entry: [
      "stuck-to-tool.html",
      "thought-map.html",
      "thought-map-v2.html",
      "next-step-finder.html",
      "fragment-drop.html"
    ],
    diagnostics: [
      "problem-to-root-cause.html",
      "problem-to-constraints.html",
      "problem-to-options.html",
      "emotion-to-action.html"
    ],
    conversion: [
      "constraint-to-action.html",
      "idea-to-tool-spec.html",
      "tool-spec-to-html.html"
    ],
    production: [
      "tool-generator-v3.html",
      "tool-factory.html",
      "tool-factory-pro.html"
    ],
    system: [
      "fragment-router.html",
      "mutation-trail.html",
      "thinking-ocean.html",
      "capture-fragment.html"
    ]
  },

  tools: {
    "stuck-to-tool.html": {
      name: "Stuck → Best Tool",
      group: "entry",
      supports: ["criticism", "emotion", "problem", "confusion", "failure", "idea"],
      mutations: ["question", "options", "reframe"],
      expressions: ["action", "structure"],
      description: "Entry router for finding the best next tool."
    },

    "thought-map.html": {
      name: "Thought Map",
      group: "entry",
      supports: ["criticism", "emotion", "problem", "confusion", "failure", "idea"],
      mutations: ["angle", "structure", "question"],
      expressions: ["structure"],
      description: "Visual navigation through the mutation landscape."
    },

    "thought-map-v2.html": {
      name: "Thought Map v2",
      group: "entry",
      supports: ["criticism", "emotion", "problem", "confusion", "failure", "idea"],
      mutations: ["angle", "structure", "question", "tool"],
      expressions: ["structure"],
      description: "Expanded visual navigation across mutation paths."
    },

    "next-step-finder.html": {
      name: "Next Step Finder",
      group: "entry",
      supports: ["emotion", "problem", "confusion", "failure"],
      mutations: ["question", "constraint", "convert"],
      expressions: ["action"],
      description: "Find the smallest visible next move."
    },

    "fragment-drop.html": {
      name: "Fragment Drop",
      group: "entry",
      supports: ["criticism", "emotion", "problem", "confusion", "failure", "idea"],
      mutations: ["question", "reframe", "angle"],
      expressions: ["seed", "structure"],
      description: "Drop one thought fragment and reveal mutation paths."
    },

    "problem-to-root-cause.html": {
      name: "Problem → Root Causes",
      group: "diagnostics",
      supports: ["problem", "failure"],
      mutations: ["root-cause"],
      expressions: ["list", "structure"],
      description: "Move beneath the surface problem."
    },

    "problem-to-constraints.html": {
      name: "Problem → Constraints",
      group: "diagnostics",
      supports: ["problem", "confusion", "failure"],
      mutations: ["constraint"],
      expressions: ["list", "structure"],
      description: "Turn vague difficulty into visible limits."
    },

    "problem-to-options.html": {
      name: "Problem → Options",
      group: "diagnostics",
      supports: ["problem", "criticism", "failure"],
      mutations: ["options"],
      expressions: ["list"],
      description: "Generate multiple routes from one blockage."
    },

    "emotion-to-action.html": {
      name: "Emotion → Action",
      group: "diagnostics",
      supports: ["emotion"],
      mutations: ["convert"],
      expressions: ["action"],
      description: "Turn emotional pressure into concrete movement."
    },

    "constraint-to-action.html": {
      name: "Constraint → Action",
      group: "conversion",
      supports: ["problem", "failure", "confusion"],
      mutations: ["constraint"],
      expressions: ["action"],
      description: "Convert boundaries into realistic next steps."
    },

    "idea-to-tool-spec.html": {
      name: "Idea → Tool Spec",
      group: "conversion",
      supports: ["idea", "criticism"],
      mutations: ["tool", "angle"],
      expressions: ["structure"],
      description: "Turn an idea into possible REFRAME tool specs."
    },

    "tool-spec-to-html.html": {
      name: "Tool Spec → HTML",
      group: "conversion",
      supports: ["idea"],
      mutations: ["tool", "structure"],
      expressions: ["structure"],
      description: "Convert a tool spec into a build-ready HTML prompt."
    },

    "tool-generator-v3.html": {
      name: "Tool Generator v3",
      group: "production",
      supports: ["idea"],
      mutations: ["tool", "structure"],
      expressions: ["structure"],
      description: "Generate full browser-tool HTML from a tool concept."
    },

    "tool-factory.html": {
      name: "Tool Factory",
      group: "production",
      supports: ["idea", "criticism", "problem"],
      mutations: ["tool", "options"],
      expressions: ["list", "structure"],
      description: "Turn one idea into multiple tool concepts."
    },

    "tool-factory-pro.html": {
      name: "Tool Factory Pro",
      group: "production",
      supports: ["idea", "criticism", "problem"],
      mutations: ["tool", "options", "angle"],
      expressions: ["list", "structure"],
      description: "Generate multiple complete tools in one flow."
    },

    "fragment-router.html": {
      name: "Fragment Router",
      group: "system",
      supports: ["criticism", "emotion", "problem", "confusion", "failure", "idea"],
      mutations: ["question", "angle", "reframe", "constraint", "options"],
      expressions: ["structure", "seed"],
      description: "Route a fragment into the best mutation paths."
    },

    "mutation-trail.html": {
      name: "Mutation Trail",
      group: "system",
      supports: ["criticism", "emotion", "problem", "confusion", "failure", "idea"],
      mutations: ["angle", "reframe", "question"],
      expressions: ["structure", "thread"],
      description: "Visualize how a fragment mutates across steps."
    },

    "thinking-ocean.html": {
      name: "Thinking Ocean",
      group: "system",
      supports: ["criticism", "emotion", "problem", "confusion", "failure", "idea"],
      mutations: ["angle", "reframe", "question", "metaphor"],
      expressions: ["seed", "thread", "post"],
      description: "Shared conceptual space where fragments drift and interact."
    },

    "capture-fragment.html": {
      name: "Capture Fragment",
      group: "system",
      supports: ["criticism", "emotion", "problem", "confusion", "failure", "idea"],
      mutations: ["question"],
      expressions: ["seed"],
      description: "Capture incomplete thought with minimal friction."
    }
  }
};

function normalizeFragmentText(text) {
  return String(text || "").toLowerCase().trim();
}

function countSignalMatches(text, signals) {
  let score = 0;
  for (const signal of signals) {
    if (text.includes(signal)) {
      score += 1;
    }
  }
  return score;
}

function detectFragmentType(fragmentText) {
  const text = normalizeFragmentText(fragmentText);

  if (!text) {
    return {
      type: "problem",
      confidence: 0,
      scores: {}
    };
  }

  const scores = {};

  for (const [typeId, config] of Object.entries(REFRAME_MUTATION_MAP.fragmentTypes)) {
    scores[typeId] = countSignalMatches(text, config.signals);
  }

  if (/\b(people say|they say|someone said|feedback|too abstract)\b/.test(text)) {
    scores.criticism += 2;
  }

  if (/\b(feel|feels|feeling|tired|overwhelmed|frustrated|scared|exhausted)\b/.test(text)) {
    scores.emotion += 2;
  }

  if (/\b(don't know|do not know|not sure|unclear|confused|which direction)\b/.test(text)) {
    scores.confusion += 2;
  }

  if (/\b(failed|didn't work|did not work|mistake|fell apart)\b/.test(text)) {
    scores.failure += 2;
  }

  if (/\b(idea|what if|maybe|might|could|perhaps)\b/.test(text)) {
    scores.idea += 1;
  }

  if (/\b(can't|cannot|stuck|problem|issue|blocked|not working|hard to)\b/.test(text)) {
    scores.problem += 1;
  }

  let bestType = "problem";
  let bestScore = -1;

  for (const [typeId, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestType = typeId;
      bestScore = score;
    }
  }

  if (bestScore <= 0) {
    if (text.includes("?")) {
      bestType = "confusion";
    } else if (/\b(maybe|might|could|perhaps)\b/.test(text)) {
      bestType = "idea";
    } else {
      bestType = "problem";
    }
  }

  const totalScore = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const confidence = totalScore > 0 ? Number((bestScore / totalScore).toFixed(2)) : 0.4;

  return {
    type: bestType,
    confidence,
    scores
  };
}

function getFragmentConfig(typeId) {
  return REFRAME_MUTATION_MAP.fragmentTypes[typeId] || null;
}

function getMutationConfig(mutationId) {
  return REFRAME_MUTATION_MAP.mutations[mutationId] || null;
}

function getExpressionConfig(expressionId) {
  return REFRAME_MUTATION_MAP.expressions[expressionId] || null;
}

function getToolConfig(fileName) {
  return REFRAME_MUTATION_MAP.tools[fileName] || null;
}

function getRecommendedToolsForType(typeId, limit = 4) {
  const results = [];

  for (const [fileName, tool] of Object.entries(REFRAME_MUTATION_MAP.tools)) {
    if (tool.supports.includes(typeId)) {
      results.push({
        file: fileName,
        ...tool
      });
    }
  }

  results.sort((a, b) => {
    const groupOrder = ["entry", "diagnostics", "conversion", "production", "system"];
    return groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
  });

  return results.slice(0, limit);
}

function getMutationPathsForType(typeId) {
  const config = getFragmentConfig(typeId);
  if (!config) return [];

  return config.mutationPaths.map((mutationId) => {
    const mutation = getMutationConfig(mutationId);
    return mutation
      ? {
          id: mutation.id,
          label: mutation.label,
          description: mutation.description
        }
      : {
          id: mutationId,
          label: mutationId,
          description: ""
        };
  });
}

function getExpressionPathsForType(typeId) {
  const config = getFragmentConfig(typeId);
  if (!config) return [];

  return config.expressionPaths.map((expressionId) => {
    const expression = getExpressionConfig(expressionId);
    return expression
      ? {
          id: expression.id,
          label: expression.label,
          description: expression.description
        }
      : {
          id: expressionId,
          label: expressionId,
          description: ""
        };
  });
}

function buildFragmentRoute(fragmentText) {
  const detection = detectFragmentType(fragmentText);
  const config = getFragmentConfig(detection.type);

  if (!config) {
    return null;
  }

  return {
    fragment: fragmentText,
    detectedType: {
      id: config.id,
      label: config.label,
      description: config.description,
      why: config.defaultWhy,
      confidence: detection.confidence,
      scores: detection.scores
    },
    fields: {
      from: REFRAME_MUTATION_MAP.fields.friction,
      through: REFRAME_MUTATION_MAP.fields.mutation,
      to: REFRAME_MUTATION_MAP.fields.expression
    },
    mutationPaths: getMutationPathsForType(config.id),
    expressionPaths: getExpressionPathsForType(config.id),
    recommendedTools: getRecommendedToolsForType(config.id, 4),
    nextMutations: config.nextMutations
  };
}

function getAllFragmentTypes() {
  return Object.values(REFRAME_MUTATION_MAP.fragmentTypes);
}

function getAllTools() {
  return Object.entries(REFRAME_MUTATION_MAP.tools).map(([file, tool]) => ({
    file,
    ...tool
  }));
}

if (typeof window !== "undefined") {
  window.REFRAME_MUTATION_MAP = REFRAME_MUTATION_MAP;
  window.detectFragmentType = detectFragmentType;
  window.buildFragmentRoute = buildFragmentRoute;
  window.getFragmentConfig = getFragmentConfig;
  window.getMutationPathsForType = getMutationPathsForType;
  window.getExpressionPathsForType = getExpressionPathsForType;
  window.getRecommendedToolsForType = getRecommendedToolsForType;
  window.getAllFragmentTypes = getAllFragmentTypes;
  window.getAllTools = getAllTools;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    REFRAME_MUTATION_MAP,
    detectFragmentType,
    buildFragmentRoute,
    getFragmentConfig,
    getMutationPathsForType,
    getExpressionPathsForType,
    getRecommendedToolsForType,
    getAllFragmentTypes,
    getAllTools
  };
}
