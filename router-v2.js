(function () {
  "use strict";

  function safeLower(value) {
    return String(value || "").toLowerCase();
  }

  function uniqueArray(items) {
    return Array.from(new Set(items));
  }

  function createEmptyFieldState() {
    return {
      friction: {
        ambiguity: 0,
        overload: 0,
        emotional: 0,
        structural: 0,
        decision: 0,
        expression: 0,
        momentum: 0,
        identity: 0,
        context: 0
      },
      mutation: {
        clarify: 0,
        decompose: 0,
        narrow: 0,
        expand: 0,
        reframe: 0,
        oppose: 0,
        convert: 0,
        sequence: 0,
        externalize: 0,
        contrast: 0,
        destabilize: 0,
        condense: 0
      },
      expression: {
        question: 0,
        statement: 0,
        list: 0,
        contrast: 0,
        structure: 0,
        action: 0,
        metaphor: 0,
        prompt: 0,
        pattern: 0,
        seed: 0
      }
    };
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

  function containsAny(text, keywords) {
    return keywords.some(function (word) {
      return text.indexOf(word) !== -1;
    });
  }

  function estimateFieldState(input, mode) {
    var text = safeLower(input);
    var state = createEmptyFieldState();

    if (!text.trim()) {
      addScore(state.friction, "ambiguity", 1.0);
      addScore(state.friction, "decision", 0.6);
      addScore(state.mutation, "clarify", 1.0);
      addScore(state.expression, "list", 0.7);
      addScore(state.expression, "prompt", 0.6);
      return finalizeFieldState(state, mode);
    }

    // ---------- Friction detection ----------

    if (
      containsAny(text, [
        "stuck", "unclear", "confused", "vague", "not sure", "don't know",
        "わから", "迷", "曖昧", "はっきりし", "困"
      ])
    ) {
      addScore(state.friction, "ambiguity", 1.0);
    }

    if (
      containsAny(text, [
        "too much", "many", "overwhelmed", "mess", "chaos", "scattered",
        "多すぎ", "多い", "散ら", "ぐちゃぐちゃ", "混乱"
      ])
    ) {
      addScore(state.friction, "overload", 1.0);
    }

    if (
      containsAny(text, [
        "afraid", "fear", "anxious", "sad", "tired", "angry", "upset",
        "怖", "不安", "しんど", "疲れ", "つら", "怒", "恥ずか"
      ])
    ) {
      addScore(state.friction, "emotional", 1.0);
    }

    if (
      containsAny(text, [
        "why", "cause", "structure", "root", "behind", "problem",
        "原因", "構造", "なぜ", "問題", "背景", "根本"
      ])
    ) {
      addScore(state.friction, "structural", 0.9);
    }

    if (
      containsAny(text, [
        "choose", "decision", "which", "option", "compare",
        "選べ", "決め", "どれ", "比較", "選択"
      ])
    ) {
      addScore(state.friction, "decision", 1.0);
    }

    if (
      containsAny(text, [
        "can't write", "cannot write", "can't say", "cannot say",
        "express", "word", "output", "shape",
        "書け", "言え", "表現", "言語化", "形に", "出せ"
      ])
    ) {
      addScore(state.friction, "expression", 1.0);
    }

    if (
      containsAny(text, [
        "can't start", "cannot start", "later", "procrast", "lazy", "no energy",
        "始めら", "動け", "やる気", "進ま", "先延ばし"
      ])
    ) {
      addScore(state.friction, "momentum", 1.0);
    }

    if (
      containsAny(text, [
        "i am not", "not for me", "my role", "my identity",
        "自分には", "向いてない", "自分らし", "自分の役割"
      ])
    ) {
      addScore(state.friction, "identity", 1.0);
    }

    if (
      containsAny(text, [
        "time", "money", "device", "phone", "environment", "constraint",
        "時間", "お金", "端末", "環境", "制約", "条件"
      ])
    ) {
      addScore(state.friction, "context", 1.0);
    }

    // ---------- Mutation detection ----------

    if (
      containsAny(text, [
        "clarify", "clear", "understand", "figure out",
        "明確", "整理", "はっきり", "理解"
      ])
    ) {
      addScore(state.mutation, "clarify", 1.0);
    }

    if (
      containsAny(text, [
        "break down", "root cause", "cause", "parts",
        "分解", "原因", "要素", "内訳"
      ])
    ) {
      addScore(state.mutation, "decompose", 1.0);
    }

    if (
      containsAny(text, [
        "focus", "narrow", "reduce", "constraint",
        "絞", "減ら", "制約", "集中"
      ])
    ) {
      addScore(state.mutation, "narrow", 1.0);
    }

    if (
      containsAny(text, [
        "options", "ideas", "more", "possibilities", "expand",
        "選択肢", "アイデア", "広げ", "可能性"
      ])
    ) {
      addScore(state.mutation, "expand", 1.0);
    }

    if (
      containsAny(text, [
        "reframe", "another angle", "different view",
        "見方", "別の視点", "リフレーム"
      ])
    ) {
      addScore(state.mutation, "reframe", 1.0);
    }

    if (
      containsAny(text, [
        "opposite", "reverse", "逆", "反対"
      ])
    ) {
      addScore(state.mutation, "oppose", 1.0);
    }

    if (
      containsAny(text, [
        "turn into", "convert", "transform", "make into",
        "変換", "にする", "落とし込", "変える"
      ])
    ) {
      addScore(state.mutation, "convert", 1.0);
    }

    if (
      containsAny(text, [
        "step", "sequence", "order", "first", "next",
        "順番", "ステップ", "最初", "次に"
      ])
    ) {
      addScore(state.mutation, "sequence", 1.0);
    }

    if (
      containsAny(text, [
        "write out", "say it", "externalize", "dump",
        "吐き出", "書き出", "外に出", "言語化"
      ])
    ) {
      addScore(state.mutation, "externalize", 1.0);
    }

    if (
      containsAny(text, [
        "compare", "difference", "contrast",
        "比較", "違い", "対比"
      ])
    ) {
      addScore(state.mutation, "contrast", 1.0);
    }

    if (
      containsAny(text, [
        "shake", "break pattern", "chaos", "unexpected",
        "崩", "壊", "カオス", "予想外"
      ])
    ) {
      addScore(state.mutation, "destabilize", 1.0);
    }

    if (
      containsAny(text, [
        "summarize", "condense", "core", "short",
        "要約", "圧縮", "核", "短く"
      ])
    ) {
      addScore(state.mutation, "condense", 1.0);
    }

    // ---------- Expression detection ----------

    if (
      text.indexOf("?") !== -1 ||
      containsAny(text, ["question", "問い", "質問"])
    ) {
      addScore(state.expression, "question", 1.0);
    }

    if (
      containsAny(text, [
        "one sentence", "statement", "short line",
        "一文", "短文", "文"
      ])
    ) {
      addScore(state.expression, "statement", 1.0);
    }

    if (
      containsAny(text, [
        "list", "many", "options",
        "一覧", "リスト", "複数", "候補"
      ])
    ) {
      addScore(state.expression, "list", 1.0);
    }

    if (
      containsAny(text, [
        "compare", "versus", "difference",
        "比較", "対比", "違い"
      ])
    ) {
      addScore(state.expression, "contrast", 1.0);
    }

    if (
      containsAny(text, [
        "structure", "framework", "map", "spec",
        "構造", "フレーム", "地図", "仕様"
      ])
    ) {
      addScore(state.expression, "structure", 1.0);
    }

    if (
      containsAny(text, [
        "action", "step", "do next",
        "行動", "次の一手", "やること"
      ])
    ) {
      addScore(state.expression, "action", 1.0);
    }

    if (
      containsAny(text, [
        "metaphor", "image", "symbol",
        "比喩", "イメージ", "象徴"
      ])
    ) {
      addScore(state.expression, "metaphor", 1.0);
    }

    if (
      containsAny(text, [
        "prompt", "input", "ask me",
        "プロンプト", "入力", "問い返し"
      ])
    ) {
      addScore(state.expression, "prompt", 1.0);
    }

    if (
      containsAny(text, [
        "pattern", "habit", "tendency",
        "パターン", "傾向", "癖"
      ])
    ) {
      addScore(state.expression, "pattern", 1.0);
    }

    if (
      containsAny(text, [
        "seed", "starter", "idea seed",
        "種", "きっかけ", "タネ"
      ])
    ) {
      addScore(state.expression, "seed", 1.0);
    }

    // ---------- Soft defaults ----------
    addScore(state.mutation, "clarify", 0.2);
    addScore(state.expression, "list", 0.2);

    return finalizeFieldState(state, mode);
  }

  function finalizeFieldState(state, mode) {
    normalizeBucket(state.friction);
    normalizeBucket(state.mutation);
    normalizeBucket(state.expression);

    applyModeAdjustments(state, mode || "stable");

    normalizeBucket(state.friction);
    normalizeBucket(state.mutation);
    normalizeBucket(state.expression);

    return state;
  }

  function applyModeAdjustments(state, mode) {
    if (mode === "drift") {
      addScore(state.mutation, "reframe", 0.25);
      addScore(state.mutation, "contrast", 0.2);
      addScore(state.expression, "prompt", 0.2);
      addScore(state.expression, "seed", 0.15);
    }

    if (mode === "chaos") {
      addScore(state.mutation, "destabilize", 0.45);
      addScore(state.mutation, "oppose", 0.35);
      addScore(state.mutation, "expand", 0.25);
      addScore(state.expression, "metaphor", 0.35);
      addScore(state.expression, "contrast", 0.25);
      addScore(state.expression, "seed", 0.25);
    }
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

    var total = frictionScore * 0.4 + mutationScore * 0.4 + expressionScore * 0.2;

    if (mode === "stable") {
      if (zone.cluster === "entry" || zone.cluster === "conversion") {
        total += 0.08;
      }
    }

    if (mode === "drift") {
      if (
        zone.mutationProfile.secondary.indexOf("reframe") !== -1 ||
        zone.mutationProfile.secondary.indexOf("contrast") !== -1 ||
        zone.mutationProfile.primary.indexOf("expand") !== -1
      ) {
        total += 0.12;
      }
    }

    if (mode === "chaos") {
      if (
        zone.mutationProfile.secondary.indexOf("contrast") !== -1 ||
        zone.expressionProfile.secondary.indexOf("seed") !== -1
      ) {
        total += 0.15;
      }

      if (zone.id === "problem-to-options" || zone.id === "tool-factory" || zone.id === "tool-factory-pro") {
        total += 0.12;
      }
    }

    return total;
  }

  function explainWhy(zone, fieldState) {
    var topFriction = getTopKeys(fieldState.friction, 2).map(function (item) {
      return item.key;
    });
    var topMutation = getTopKeys(fieldState.mutation, 2).map(function (item) {
      return item.key;
    });
    var topExpression = getTopKeys(fieldState.expression, 1).map(function (item) {
      return item.key;
    });

    return {
      friction: topFriction,
      mutation: topMutation,
      expression: topExpression,
      text:
        "This zone appeared because your input suggests friction around " +
        (topFriction.join(", ") || "ambiguity") +
        ", with mutation pressure toward " +
        (topMutation.join(", ") || "clarify") +
        ", and an expression opening toward " +
        (topExpression.join(", ") || "list") +
        "."
    };
  }

  function routeInput(input, options) {
    options = options || {};

    var mode = options.mode || "stable";
    var limit = typeof options.limit === "number" ? options.limit : 3;
    var map = window.REFRAME_MUTATION_MAP;

    if (!map || !Array.isArray(map.contactZones)) {
      throw new Error("REFRAME_MUTATION_MAP is missing. Load mutation-map.js first.");
    }

    var fieldState = estimateFieldState(input, mode);

    var rankedZones = map.contactZones
      .map(function (zone) {
        return {
          zone: zone,
          score: scoreZone(zone, fieldState, mode)
        };
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });

    var selected = rankedZones.slice(0, limit);
    var primary = selected[0] || null;

    return {
      input: input,
      mode: mode,
      fieldState: fieldState,
      primaryZone: primary
        ? {
            id: primary.zone.id,
            title: primary.zone.title,
            cluster: primary.zone.cluster,
            role: primary.zone.role,
            score: Number(primary.score.toFixed(3)),
            outputState: primary.zone.outputState.slice(),
            nextOpenings: primary.zone.nextOpenings.slice(),
            why: explainWhy(primary.zone, fieldState)
          }
        : null,
      nearbyZones: selected.slice(1).map(function (item) {
        return {
          id: item.zone.id,
          title: item.zone.title,
          cluster: item.zone.cluster,
          score: Number(item.score.toFixed(3)),
          nextOpenings: item.zone.nextOpenings.slice()
        };
      }),
      allRankedZones: selected.map(function (item) {
        return {
          id: item.zone.id,
          title: item.zone.title,
          cluster: item.zone.cluster,
          score: Number(item.score.toFixed(3))
        };
      })
    };
  }

  function formatRoutingResult(result) {
    if (!result || !result.primaryZone) {
      return {
        title: "No zone found",
        summary: "No strong contact zone was found.",
        primary: null,
        nearby: []
      };
    }

    return {
      title: "Routing Result",
      summary: result.primaryZone.why.text,
      primary: {
        title: result.primaryZone.title,
        cluster: result.primaryZone.cluster,
        score: result.primaryZone.score,
        outputState: result.primaryZone.outputState,
        nextOpenings: result.primaryZone.nextOpenings
      },
      nearby: result.nearbyZones
    };
  }

  function getRecommendedToolIds(input, options) {
    var result = routeInput(input, options);
    var ids = [];

    if (result.primaryZone) ids.push(result.primaryZone.id);
    result.nearbyZones.forEach(function (zone) {
      ids.push(zone.id);
    });

    return uniqueArray(ids);
  }

  var routerV2 = {
    version: "2.0",
    name: "REFRAME Router v2",
    description: "Reads field state and surfaces nearby mutation contact zones.",
    estimateFieldState: estimateFieldState,
    routeInput: routeInput,
    formatRoutingResult: formatRoutingResult,
    getRecommendedToolIds: getRecommendedToolIds
  };

  window.REFRAME_ROUTER_V2 = routerV2;
})();
