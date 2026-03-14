// REFRAME Random Next Router

const REFRAME_NEXT_TOOLS = [
  "unknown-mutation.html",
  "thought-collision.html"
];

// 前回ツールを避ける
function getNextTool() {

  const last = sessionStorage.getItem("reframe-last-tool");

  let pool = REFRAME_NEXT_TOOLS.filter(t => t !== last);

  if (pool.length === 0) {
    pool = REFRAME_NEXT_TOOLS;
  }

  const next = pool[Math.floor(Math.random() * pool.length)];

  sessionStorage.setItem("reframe-last-tool", next);

  return next;
}

// Next ボタン接続
function attachNextButton(id) {

  const btn = document.getElementById(id);

  if (!btn) return;

  btn.addEventListener("click", () => {

    const next = getNextTool();

    window.location.href = "./" + next;

  });

}
