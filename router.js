// REFRAME Studio — Mutation Router v1

const TOOL_REGISTRY = [
  {
    id: "thought-galaxy",
    title: "Thought Galaxy",
    file: "thought-galaxy.html",
    inputField: "friction",
    outputField: "mutation"
  },
  {
    id: "mutation-engine",
    title: "Mutation Engine",
    file: "mutation-engine.html",
    inputField: "friction",
    outputField: "mutation"
  },
  {
    id: "mutation-flow",
    title: "Mutation Flow",
    file: "mutation-flow.html",
    inputField: "mutation",
    outputField: "mutation"
  },
  {
    id: "tool-birth-engine",
    title: "Tool Birth Engine",
    file: "tool-birth-engine.html",
    inputField: "mutation",
    outputField: "expression"
  }
];

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
    return findTools(["mutation-flow"]);
  }

  if (type === "failure") {
    return findTools(["mutation-engine", "tool-birth-engine"]);
  }

  return findTools(["mutation-engine"]);
}

function findTools(ids) {
  return TOOL_REGISTRY.filter(tool => ids.includes(tool.id));
}
