window.REFRAME_ROUTER = (() => {
  const TOOL_REGISTRY = {
    "criticism-to-lesson": {
      key: "criticism-to-lesson",
      file: "criticism-to-lesson.html",
      inputType: "criticism",
      outputType: "lesson",
      label: "Criticism → Lesson"
    },
    "failure-to-lesson": {
      key: "failure-to-lesson",
      file: "failure-to-lesson.html",
      inputType: "failure",
      outputType: "lesson",
      label: "Failure → Lesson"
    },
    "lesson-to-angle": {
      key: "lesson-to-angle",
      file: "lesson-to-angle.html",
      inputType: "lesson",
      outputType: "angle",
      label: "Lesson → Angle"
    },
    "lesson-to-hook": {
      key: "lesson-to-hook",
      file: "lesson-to-hook.html",
      inputType: "lesson",
      outputType: "hook",
      label: "Lesson → Hook"
    },
    "lesson-to-thread": {
      key: "lesson-to-thread",
      file: "lesson-to-thread.html",
      inputType: "lesson",
      outputType: "thread",
      label: "Lesson → Thread"
    },
    "lesson-to-opposite": {
      key: "lesson-to-opposite",
      file: "lesson-to-opposite.html",
      inputType: "lesson",
      outputType: "opposite",
      label: "Lesson → Opposite"
    },
    "idea-to-metaphor": {
      key: "idea-to-metaphor",
      file: "idea-to-metaphor.html",
      inputType: "idea",
      outputType: "metaphor",
      label: "Idea → Metaphor"
    },
    "idea-to-opposite": {
      key: "idea-to-opposite",
      file: "idea-to-opposite.html",
      inputType: "idea",
      outputType: "opposite",
      label: "Idea → Opposite"
    },
    "confusion-to-question": {
      key: "confusion-to-question",
      file: "confusion-to-question.html",
      inputType: "confusion",
      outputType: "question",
      label: "Confusion → Question"
    },
    "question-to-structure": {
      key: "question-to-structure",
      file: "question-to-structure.html",
      inputType: "question",
      outputType: "structure",
      label: "Question → Structure"
    },
    "structure-to-action": {
      key: "structure-to-action",
      file: "structure-to-action.html",
      inputType: "structure",
      outputType: "action",
      label: "Structure → Action"
    },
    "emotion-to-action": {
      key: "emotion-to-action",
      file: "emotion-to-action.html",
      inputType: "emotion",
      outputType: "action",
      label: "Emotion → Action"
    },
    "problem-to-action": {
      key: "problem-to-action",
      file: "problem-to-action.html",
      inputType: "problem",
      outputType: "action",
      label: "Problem → Action"
    }
  };

  const GRAPH = {
    criticism: ["criticism-to-lesson"],
    failure: ["failure-to-lesson"],
    lesson: ["lesson-to-angle", "lesson-to-hook", "lesson-to-thread", "lesson-to-opposite"],
    idea: ["idea-to-metaphor", "idea-to-opposite"],
    confusion: ["confusion-to-question"],
    question: ["question-to-structure"],
    structure: ["structure-to-action"],
    emotion: ["emotion-to-action"],
    problem: ["problem-to-action"],
    angle: ["lesson-to-hook", "lesson-to-thread"],
    metaphor: ["lesson-to-hook", "lesson-to-thread"],
    opposite: ["lesson-to-hook", "lesson-to-angle"],
    hook: ["lesson-to-thread"],
    thread: [],
    action: []
  };

  const DRIFT_ROUTES = {
    criticism: ["idea-to-opposite", "lesson-to-opposite"],
    failure: ["idea-to-opposite", "lesson-to-angle"],
    lesson: ["idea-to-opposite", "idea-to-metaphor"],
    idea: ["confusion-to-question", "lesson-to-angle"],
    confusion: ["idea-to-metaphor", "lesson-to-opposite"],
    question: ["idea-to-opposite", "lesson-to-angle"],
    structure: ["idea-to-metaphor", "lesson-to-opposite"],
    emotion: ["idea-to-metaphor", "lesson-to-hook"],
    problem: ["lesson-to-opposite", "idea-to-metaphor"],
    angle: ["idea-to-opposite", "confusion-to-question"],
    metaphor: ["lesson-to-opposite", "emotion-to-action"],
    opposite: ["confusion-to-question", "lesson-to-thread"],
    hook: ["idea-to-opposite", "emotion-to-action"],
    thread: ["idea-to-opposite", "confusion-to-question"],
    action: ["idea-to-metaphor", "lesson-to-opposite"]
  };

  const MODE_CONFIG = {
    stable: {
      driftChance: 0.08,
      min: 2,
      max: 3
    },
    drift: {
      driftChance: 0.35,
      min: 3,
      max: 4
    },
    chaos: {
      driftChance: 0.75,
      min: 3,
      max: 4
    }
  };

  const DRIFT_PROMPTS = [
    "What if the misunderstanding is the interesting part?",
    "Push the thought 20% toward absurdity.",
    "Translate the friction into a character trait.",
    "Invert the emotional logic and keep only what survives.",
    "Make the idea less correct and more alive.",
    "What is unstable here in a useful way?",
    "What would make this more strangely honest?",
    "Turn the problem into a lens, not a burden."
  ];

  function normalizeText(text = "") {
    return String(text).replace(/\s+/g, " ").trim();
  }

  function escapeHTML(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function sample(array = []) {
    if (!array.length) return null;
    return array[Math.floor(Math.random() * array.length)];
  }

  function shuffle(array = []) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function uniq(array = []) {
    return [...new Set(array)];
  }

  function getMode(mode = "") {
    if (MODE_CONFIG[mode]) return mode;
    return "stable";
  }

  function getModeConfig(mode = "") {
    return MODE_CONFIG[getMode(mode)];
  }

  function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      input: params.get("input") || "",
      type: params.get("type") || "",
      from: params.get("from") || "",
      mode: getMode(params.get("mode") || "stable")
    };
  }

  function prefillInput(selector = "#input") {
    const el = document.querySelector(selector);
    if (!el) return "";

    const { input } = getParams();
    if (input) {
      el.value = input;
    }
    return input;
  }

  function prefillSelect(selector = "#mode", fallback = "stable") {
    const el = document.querySelector(selector);
    if (!el) return fallback;

    const { mode } = getParams();
    el.value = mode || fallback;
    return el.value;
  }

  function buildURL(toolKey, input = "", extraParams = {}) {
    const tool = TOOL_REGISTRY[toolKey];
    if (!tool) return "#";

    const url = new URL(tool.file, window.location.href);

    const cleanInput = normalizeText(input);
    if (cleanInput) {
      url.searchParams.set("input", cleanInput);
    }

    Object.entries(extraParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });

    return url.toString();
  }

  function goTo(toolKey, input = "", extraParams = {}) {
    const url = buildURL(toolKey, input, extraParams);
    if (url !== "#") {
      window.location.href = url;
    }
  }

  function detectOutputType(text = "", fallbackType = "") {
    const t = normalizeText(text).toLowerCase();

    if (!t && fallbackType) return fallbackType;

    if (/question|問い|疑問|論点/.test(t)) return "question";
    if (/structure|構造|フレーム|整理/.test(t)) return "structure";
    if (/action|next step|行動|一歩/.test(t)) return "action";
    if (/metaphor|比喩/.test(t)) return "metaphor";
    if (/hook|導入|つかみ/.test(t)) return "hook";
    if (/thread|スレッド|構成/.test(t)) return "thread";
    if (/opposite|逆|反転/.test(t)) return "opposite";
    if (/angle|視点|角度/.test(t)) return "angle";
    if (/lesson|教訓|学び/.test(t)) return "lesson";

    return fallbackType || "lesson";
  }

  function getStableRoutes(type = "") {
    return GRAPH[type] || [];
  }

  function getDriftRoutes(type = "") {
    return DRIFT_ROUTES[type] || [];
  }

  function describeRoute(outputType = "") {
    const map = {
      lesson: "Extract usable signal from friction.",
      angle: "Sharpen the thought into a clearer perspective.",
      hook: "Turn the thought into a stronger opening line.",
      thread: "Expand the thought into content structure.",
      opposite: "Push the thought through inversion.",
      metaphor: "Translate the thought into a more vivid lens.",
      question: "Clarify the fog into a sharper question.",
      structure: "Turn the question into a usable frame.",
      action: "Move the thought toward a concrete next step."
    };

    return map[outputType] || "Continue the mutation.";
  }

  function pickBestToolByType(type = "criticism") {
    const bestMap = {
      criticism: "criticism-to-lesson",
      failure: "failure-to-lesson",
      emotion: "emotion-to-action",
      problem: "problem-to-action",
      confusion: "confusion-to-question",
      idea: "idea-to-metaphor",
      lesson: "lesson-to-angle",
      question: "question-to-structure",
      structure: "structure-to-action",
      angle: "lesson-to-hook",
      hook: "lesson-to-thread",
      opposite: "lesson-to-hook",
      metaphor: "lesson-to-hook"
    };

    return bestMap[type] || "criticism-to-lesson";
  }

  function createDriftText(text = "", prompt = "") {
    const cleanText = normalizeText(text);
    const cleanPrompt = normalizeText(prompt);

    if (!cleanText && !cleanPrompt) return "";

    return `Original thought: ${cleanText}\n\nDrift: ${cleanPrompt}`;
  }

  function pickDriftPrompt() {
    return sample(DRIFT_PROMPTS) || "What is unstable here in a useful way?";
  }

  function getNextMutations(options = {}) {
    const {
      text = "",
      outputType = "",
      currentTool = "",
      mode = "stable",
      min,
      max
    } = options;

    const cleanMode = getMode(mode);
    const modeConfig = getModeConfig(cleanMode);
    const resolvedMin = typeof min === "number" ? min : modeConfig.min;
    const resolvedMax = typeof max === "number" ? max : modeConfig.max;
    const resolvedType = detectOutputType(text, outputType);

    const stableCandidates = shuffle(
      getStableRoutes(resolvedType).filter((key) => key !== currentTool)
    );

    const driftCandidates = shuffle(
      getDriftRoutes(resolvedType).filter(
        (key) => key !== currentTool && !stableCandidates.includes(key)
      )
    );

    let results = [];

    if (cleanMode === "stable") {
      results.push(...stableCandidates.slice(0, resolvedMax));
      if (
        Math.random() < modeConfig.driftChance &&
        driftCandidates.length &&
        results.length < resolvedMax
      ) {
        results.push(driftCandidates[0]);
      }
    }

    if (cleanMode === "drift") {
      const stableCount = Math.max(1, Math.min(2, stableCandidates.length));
      results.push(...stableCandidates.slice(0, stableCount));

      const needed = resolvedMax - results.length;
      if (needed > 0) {
        results.push(...driftCandidates.slice(0, needed));
      }

      if (
        Math.random() < modeConfig.driftChance &&
        driftCandidates.length &&
        results.length < resolvedMax
      ) {
        results.push(driftCandidates[Math.min(1, driftCandidates.length - 1)]);
      }
    }

    if (cleanMode === "chaos") {
      results.push(...driftCandidates.slice(0, resolvedMax));

      if (results.length < resolvedMin) {
        results.push(...stableCandidates.slice(0, resolvedMin - results.length));
      }
    }

    results = uniq(results).slice(0, resolvedMax);

    if (results.length < resolvedMin) {
      const allCandidates = uniq([...stableCandidates, ...driftCandidates]);
      for (const key of allCandidates) {
        if (!results.includes(key)) {
          results.push(key);
        }
        if (results.length >= resolvedMin) break;
      }
    }

    return results.map((key) => TOOL_REGISTRY[key]).filter(Boolean);
  }

  function renderNextMutations(container, options = {}) {
    if (!container) return [];

    const {
      text = "",
      outputType = "",
      currentTool = "",
      mode = "stable",
      labelMap = {}
    } = options;

    const routes = getNextMutations({
      text,
      outputType,
      currentTool,
      mode
    });

    container.innerHTML = "";

    routes.forEach((route) => {
      const label = labelMap[route.outputType] || route.outputType || "next";

      const a = document.createElement("a");
      a.className = "next-card";
      a.href = buildURL(route.key, text, {
        from: currentTool || "router",
        type: route.inputType,
        mode: getMode(mode)
      });

      a.innerHTML = `
        <span class="next-label">${escapeHTML(String(label).toUpperCase())}</span>
        <h4>${escapeHTML(route.label)}</h4>
        <p>${escapeHTML(describeRoute(route.outputType))}</p>
      `;

      container.appendChild(a);
    });

    return routes;
  }

  function updateCurrentPageURL(state = {}) {
    const url = new URL(window.location.href);

    Object.entries(state).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, String(value));
      }
    });

    window.history.replaceState({}, "", url.toString());
    return url.toString();
  }

  return {
    TOOL_REGISTRY,
    GRAPH,
    DRIFT_ROUTES,
    MODE_CONFIG,
    getParams,
    getMode,
    getModeConfig,
    normalizeText,
    escapeHTML,
    prefillInput,
    prefillSelect,
    buildURL,
    goTo,
    detectOutputType,
    getNextMutations,
    renderNextMutations,
    pickBestToolByType,
    createDriftText,
    pickDriftPrompt,
    updateCurrentPageURL
  };
})();
