const TOOL_REGISTRY = [
  {
    id: "thought-galaxy",
    title: "Thought Galaxy",
    file: "thought-galaxy.html",
    note: "Open the fragment in a wider thinking space."
  },
  {
    id: "mutation-engine",
    title: "Mutation Engine",
    file: "mutation-engine.html",
    note: "Push the fragment into a stronger mutation."
  },
  {
    id: "mutation-flow",
    title: "Mutation Flow v1",
    file: "mutation-flow-v1.html",
    note: "Keep the mutation moving into a next form."
  },
  {
    id: "tool-birth-engine",
    title: "Tool Birth Engine v1",
    file: "tool-birth-engine-v1.html",
    note: "Turn mutation into a possible new tool."
  }
];

function detectSourceType(text) {
  const t = text.toLowerCase();

  if (t.includes("people say") || t.includes("critic") || t.includes("too abstract")) {
    return "criticism";
  }

  if (t.includes("feel") || t.includes("tired") || t.includes("exhaust") || t.includes("overwhelmed")) {
    return "emotion";
  }

  if (t.includes("can't") || t.includes("cannot") || t.includes("stuck") || t.includes("problem")) {
    return "problem";
  }

  if (t.includes("confused") || t.includes("unclear") || t.includes("why")) {
    return "confusion";
  }

  if (t.includes("failed") || t.includes("didn't work") || t.includes("did not work")) {
    return "failure";
  }

  return "idea";
}

function getNextTools(fragment) {
  const type = fragment.sourceType;

  if (type === "idea") {
    return findTools(["mutation-engine", "mutation-flow"]);
  }

  if (type === "criticism") {
    return findTools(["mutation-engine", "mutation-flow"]);
  }

  if (type === "emotion") {
    return findTools(["mutation-engine"]);
  }

  if (type === "problem") {
    return findTools(["mutation-engine", "mutation-flow"]);
  }

  if (type === "confusion") {
    return findTools(["thought-galaxy", "mutation-flow"]);
  }

  if (type === "failure") {
    return findTools(["mutation-engine", "tool-birth-engine"]);
  }

  return findTools(["mutation-engine"]);
}

function findTools(ids) {
  return TOOL_REGISTRY.filter(function (tool) {
    return ids.includes(tool.id);
  });
}
