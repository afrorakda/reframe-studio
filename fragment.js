function createFragment(text, sourceType = "idea", mode = "drift") {
  return {
    id: "frag_" + Date.now(),
    text: text.trim(),
    sourceType: sourceType,
    currentField: "friction",
    mode: mode,
    history: []
  };
}
