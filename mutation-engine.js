(function () {
  function ensureFragmentEngine() {
    if (!window.REFRAME_FRAGMENT_ENGINE) {
      throw new Error("REFRAME_FRAGMENT_ENGINE is required.");
    }
    return window.REFRAME_FRAGMENT_ENGINE;
  }

  function normalizeText(str) {
    return String(str || "").replace(/\s+/g, " ").trim();
  }

  function tokenize(str) {
    return normalizeText(str)
      .toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  }

  function uniq(arr) {
    return [...new Set(arr)];
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function clampWords(str, maxWords = 6) {
    const words = normalizeText(str).split(/\s+/).filter(Boolean);
    return words.slice(0, maxWords).join(" ");
  }

  function shortLead(input) {
    const stop = new Set(["the","a","an","is","are","am","this","that","it","you","your","to","of","for","and","or","but","so"]);
    const tokens = tokenize(input).filter(t => !stop.has(t));
    return clampWords(tokens.join(" "), 4) || clampWords(input, 4).toLowerCase();
  }

  function stripMaybe(text) {
    return normalizeText(text).replace(/^maybe\s+/i, "");
  }

  function removeEndPunctuation(text) {
    return normalizeText(text).replace(/[.?!]+$/g, "");
  }

  function maybeQuestion(text) {
    const clean = removeEndPunctuation(text);
    return clean ? `${clean}?` : "";
  }

  function titleCase(text) {
    const clean = normalizeText(text);
    if (!clean) return "";
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  function getTags(item) {
    return Array.isArray(item.tags) ? item.tags.map(t => String(t).toLowerCase()) : [];
  }

  function hasAnyTag(item, list) {
    const tags = new Set(getTags(item));
    return list.some(tag => tags.has(String(tag).toLowerCase()));
  }

  function detectImageWord(item, lead) {
    const text = `${lead} ${item.text}`.toLowerCase();

    if (/\bdoor\b/.test(text)) return "door";
    if (/\bmap\b/.test(text)) return "map";
    if (/\bframe\b/.test(text)) return "frame";
    if (/\bstory\b/.test(text)) return "story";
    if (/\bsignal\b/.test(text)) return "signal";
    if (/\bnoise\b/.test(text)) return "noise";
    if (/\bpattern\b/.test(text)) return "pattern";
    if (/\bedge\b/.test(text)) return "edge";
    if (/\bsilence\b/.test(text)) return "silence";
    if (/\bcuriosity\b/.test(text)) return "curiosity";
    if (/\bfriction\b/.test(text)) return "friction";
    if (/\bchaos\b/.test(text)) return "chaos";
    if (/\battention\b/.test(text)) return "attention";
    if (/\bquestion\b/.test(text)) return "question";

    return "shape";
  }

  function selectMaterials(input, toolName) {
    const engine = ensureFragmentEngine();
    return engine.chooseThree(input, toolName);
  }

  function mutateShift(item, input) {
    const lead = shortLead(input);
    const base = normalizeText(item.text);

    if (!lead) return base;
    if (/^maybe\s+/i.test(base)) return base.replace(/^maybe\s+/i, `maybe ${lead} / `);
    return `${lead} / ${base}`;
  }

  function mutateMisread(item, input) {
    const lead = shortLead(input);
    const core = stripMaybe(item.text);

    if (!lead) return titleCase(core);

    if (hasAnyTag(item, ["dismissal","criticism","reaction"])) {
      return titleCase(`${lead} / attention in disguise`);
    }

    if (hasAnyTag(item, ["confusion","question","thinking"])) {
      return titleCase(`${lead} / not wrong, just mis-entered`);
    }

    if (hasAnyTag(item, ["abstract","frame","shift"])) {
      return titleCase(`${lead} / wrong frame, live signal`);
    }

    if (hasAnyTag(item, ["silence","timing","audience"])) {
      return titleCase(`${lead} / not absence, delayed contact`);
    }

    return titleCase(`${lead} / ${core}`);
  }

  function mutateOpposite(item, input) {
    const lead = shortLead(input);
    const core = stripMaybe(item.text);

    if (hasAnyTag(item, ["dismissal","criticism","reaction"])) {
      return titleCase(`not rejection / ${lead || core}`);
    }

    if (hasAnyTag(item, ["confusion","question","thinking"])) {
      return titleCase(`not nonsense / unfinished entry`);
    }

    if (hasAnyTag(item, ["abstract","frame","shift"])) {
      return titleCase(`not vague / wrong frame`);
    }

    if (hasAnyTag(item, ["silence","timing","audience"])) {
      return titleCase(`not dead / not yet`);
    }

    return titleCase(`not ${lead || "that"} / ${core}`);
  }

  function mutateMetaphor(item, input) {
    const lead = shortLead(input);
    const image = detectImageWord(item, lead);
    const core = stripMaybe(item.text);

    if (image === "door") return titleCase(`${lead || core} / a door opening sideways`);
    if (image === "map") return titleCase(`${lead || core} / a map drawn in moving water`);
    if (image === "frame") return titleCase(`${lead || core} / glass bending before it breaks`);
    if (image === "story") return titleCase(`${lead || core} / a page turning by itself`);
    if (image === "signal") return titleCase(`${lead || core} / a radio full of weather`);
    if (image === "noise") return titleCase(`${lead || core} / static hiding a voice`);
    if (image === "pattern") return titleCase(`${lead || core} / footprints in dark water`);
    if (image === "edge") return titleCase(`${lead || core} / a wire carrying stormlight`);
    if (image === "silence") return titleCase(`${lead || core} / a room before the echo`);
    if (image === "curiosity") return titleCase(`${lead || core} / a hand under the table`);
    if (image === "friction") return titleCase(`${lead || core} / flint waiting for contact`);
    if (image === "chaos") return titleCase(`${lead || core} / a pattern still underwater`);
    if (image === "attention") return titleCase(`${lead || core} / a lamp facing the wall`);
    if (image === "question") return titleCase(`${lead || core} / a key with no visible door`);

    return titleCase(`${lead || core} / something changing shape in the dark`);
  }

  function mutateQuestion(item, input) {
    const lead = shortLead(input);
    const core = stripMaybe(item.text);

    if (hasAnyTag(item, ["dismissal","criticism","reaction"])) {
      return "What is still here after the dismissal?";
    }

    if (hasAnyTag(item, ["confusion","question","thinking"])) {
      return "What if the line is not wrong, only unfinished?";
    }

    if (hasAnyTag(item, ["abstract","frame","shift"])) {
      return "What changes if the frame changes first?";
    }

    if (hasAnyTag(item, ["silence","timing","audience"])) {
      return "What is quiet here, but not gone?";
    }

    if (lead) {
      return `What else could ${lead} be opening?`;
    }

    return maybeQuestion(core || item.text);
  }

  function mutateItem(item, input, toolName) {
    if (toolName === "shift") return mutateShift(item, input);
    if (toolName === "misread") return mutateMisread(item, input);
    if (toolName === "opposite") return mutateOpposite(item, input);
    if (toolName === "metaphor") return mutateMetaphor(item, input);
    if (toolName === "question") return mutateQuestion(item, input);

    return normalizeText(item.text);
  }

  function dedupeResults(items) {
    const seen = new Set();
    const out = [];

    for (const item of items) {
      const key = normalizeText(item.text).toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    }

    return out;
  }

  function generate(input, toolName = "shift") {
    const materials = selectMaterials(input, toolName);

    const results = materials.map(item => ({
      source: item.source || "pool",
      original: item.text,
      text: mutateItem(item, input, toolName),
      tags: item.tags || [],
      tone: item.tone || "",
      style: item.style || ""
    }));

    return dedupeResults(results).slice(0, 3);
  }

  window.REFRAME_MUTATION_ENGINE = {
    generate
  };
})();
