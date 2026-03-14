(function () {

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function cleanLines(text) {
    return String(text || "")
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean)
      .slice(0, 20);
  }

  function safeReply(line) {
    return String(line || "")
      .replace(/[“”"'`]/g, "")
      .trim();
  }

  function seed(line) {
    const r = safeReply(line);
    return r || "bad reply";
  }

  function pickUnused(arr, used) {
    const filtered = arr.filter(item => !used.has(item));
    const choice = filtered.length ? pick(filtered) : pick(arr);
    used.add(choice);
    return choice;
  }

  const replyFrames = [
    '"{reply}" can sometimes mean they wanted a clearer step.',
    '"{reply}" can sometimes mean they wanted the point faster.',
    '"{reply}" can sometimes mean they wanted it simpler.',
    '"{reply}" can sometimes mean the idea came too early for them.',
    '"{reply}" can sometimes mean they lost the middle.',
    '"{reply}" can sometimes mean they wanted the short version.',
    '"{reply}" can sometimes mean the shape was still rough.',
    '"{reply}" can sometimes mean they wanted a safer idea.',
    '"{reply}" can sometimes mean they could not place it fast.',
    '"{reply}" can sometimes mean they wanted a cleaner path.'
  ];

  const maybeFragments = [
    'Maybe I said it too early.',
    'Maybe I rushed it.',
    'Maybe the idea needed one more step.',
    'Maybe the thought was still forming.',
    'Maybe I shared the rough version.',
    'Maybe the point came too late.',
    'Maybe I skipped a step.',
    'Maybe I moved too fast.',
    'Maybe the middle was missing.',
    'Maybe I shared it too soon.',
    'Maybe the shape was not there yet.',
    'Maybe I dropped it too fast.',
    'Maybe I jumped ahead.',
    'Maybe the order was wrong.',
    'Maybe the step was missing.',
    'Maybe I skipped the setup.',
    'Maybe the start was rough.',
    'Maybe the path was not clear.',
    'Maybe I rushed the ending.',
    'Maybe the idea was not ready yet.',
    'Maybe I pushed the thought out too early.',
    'Maybe I made it harder than it needed to be.',
    'Maybe I said the strange part first.',
    'Maybe I left people with half the shape.',
    'Maybe I needed one more pass.'
  ];

  const someIdeaFragments = [
    'Some ideas need one more step.',
    'Some thoughts take longer.',
    'Some ideas grow slow.',
    'Some ideas start rough.',
    'Some thoughts come out early.',
    'Some ideas need more time.',
    'Some ideas need clearer words.',
    'Some ideas need a second look.',
    'Some thoughts start messy.',
    'Some ideas come out sideways.',
    'Some ideas need more room.',
    'Some ideas come before the words.',
    'Some ideas need a pause.',
    'Some ideas land later.',
    'Some ideas take a while.',
    'Some thoughts grow slowly.',
    'Some ideas settle with time.',
    'Some thoughts become clear later.',
    'Some ideas open slowly.',
    'Some ideas need a simpler start.'
  ];

  const peopleFragments = [
    'People want the point fast.',
    'People like clean answers.',
    'People trust simple words first.',
    'People want the end quickly.',
    'People like clear shapes.',
    'People want the idea to sit still.',
    'People move on fast online.',
    'People want the shortcut.',
    'People want the simple version.',
    'People trust what they know.',
    'People want the short answer.',
    'People want the safe idea.',
    'People want the easy read.',
    'People read fast.',
    'People decide fast.',
    'People want the answer now.',
    'People want the point first.',
    'People want the easy take.',
    'People want the quick win.',
    'People often pick easy over open.'
  ];

  const notYetFragments = [
    'Not clear yet does not mean wrong.',
    'Not ready yet does not mean bad.',
    'Not simple yet does not mean empty.',
    'Not finished yet does not mean useless.',
    'Not easy yet does not mean weak.',
    'Not neat yet does not mean broken.',
    'Not done yet does not mean failed.',
    'Not clear yet does not mean nothing.',
    'Not perfect yet does not mean bad.',
    'Not smooth yet does not mean lost.'
  ];

  const fearFragments = [
    'Sometimes the pushback is about fear.',
    'Sometimes people fear losing what already feels safe.',
    'Sometimes the reaction is trying to protect something old.',
    'Sometimes people push back when the ground starts to move.',
    'Sometimes the reply is really about worry, not truth.',
    'Some reactions come from fear of change.',
    'Some pushback comes from fear of losing control.',
    'Some people pull back when the shape is still unknown.',
    'For some people, open ideas feel risky.',
    'Unclear ideas can make people uneasy.'
  ];

  const statusFragments = [
    'Some reactions are trying to protect a role.',
    'Sometimes the pushback is trying to protect status.',
    'Some people protect the place they already have.',
    'Sometimes the reply is guarding an old position.',
    'Some reactions protect a way of being seen.',
    'Sometimes a new idea can threaten an old role.',
    'Some people push back when a thought shifts the order.',
    'Sometimes the reaction is about standing, not meaning.',
    'Some replies protect a place in the group.',
    'Some people fear losing the shape they know.'
  ];

  const controlFragments = [
    'People like ideas they can control.',
    'Open ideas can feel unstable.',
    'Some people trust ideas they can hold still.',
    'People often want a thought they can manage fast.',
    'Some readers want a shape they can control.',
    'A moving idea can feel hard to trust.',
    'Some people want the idea to stay in bounds.',
    'Open thoughts can feel hard to manage.',
    'Some people trust ideas that behave.',
    'A soft shape can make control feel thin.'
  ];

  const confusionFragments = [
    'Sometimes people push back when they feel lost.',
    'Some replies come from confusion, not hate.',
    'Sometimes the fast reply hides a missed step.',
    'Some reactions are really about losing the thread.',
    'People often react fast when they cannot place the thought.',
    'Sometimes the problem is pace, not the idea.',
    'Some readers want the map before the walk.',
    'Sometimes the reply comes before the thought catches up.',
    'Some people need the path before the point.',
    'A rough idea can feel harder than it is.'
  ];

  const frictionFragments = [
    'Sometimes the reaction is just friction.',
    'Some pushback comes from the idea rubbing against habit.',
    'A hard edge can wake people up fast.',
    'Sometimes the reply shows where the friction is.',
    'Pushback can show where the idea still bites.',
    'Some reactions happen where the thought hits a wall.',
    'Friction often shows up before understanding does.',
    'A rough reply can still point to something useful.',
    'Sometimes the heat is part of the signal.',
    'Friction can mean the thought touched something real.'
  ];

  const spicyFragments = [
    'People often want the easy read.',
    'The crowd often picks easy over alive.',
    'Some people want a label more than a thought.',
    'People often want comfort before surprise.',
    'Some replies are just fast, not deep.',
    'People often want the clean answer first.',
    'Some people want the point before the process.',
    'The easy version usually wins first.',
    'Some people trust quick takes too much.',
    'Fast certainty often beats slow thought.'
  ];

  function buildPractical(reply, used) {
    const line1 = pickUnused(replyFrames, used).replace("{reply}", reply);

    const secondPools = shuffle([
      someIdeaFragments,
      peopleFragments,
      notYetFragments,
      fearFragments,
      statusFragments,
      controlFragments,
      confusionFragments,
      frictionFragments
    ]);

    const line2 = pickUnused(secondPools[0], used);

    const maybeThird = Math.random() < 0.35 ? '\n' + pickUnused(secondPools[1], used) : '';
    return line1 + '\n' + line2 + maybeThird;
  }

  function buildSelf(reply, used) {
    const start = pickUnused(maybeFragments, used);
    const endings = [
      `Start with "${reply}".`,
      `Open with "${reply}".`,
      `Begin with "${reply}" and turn it on yourself.`,
      `Start from "${reply}" and make yourself part of it.`,
      `Use "${reply}" as the first line.`,
      `Let "${reply}" be the small bruise.`
    ];
    const end = pickUnused(endings, used);
    const maybeThird = Math.random() < 0.35 ? '\n' + pickUnused(notYetFragments, used) : '';
    return start + '\n' + end + maybeThird;
  }

  function buildSpicy(reply, used) {
    const firstPools = shuffle([
      spicyFragments,
      fearFragments,
      statusFragments,
      controlFragments
    ]);

    const line1 = pickUnused(firstPools[0], used);

    const endings = [
      `Open with "${reply}".`,
      `Lead with "${reply}".`,
      `Use "${reply}" as the hook.`,
      `Start from "${reply}".`,
      `Use "${reply}" as the spark.`,
      `Let "${reply}" do the first cut.`
    ];

    const line2 = pickUnused(endings, used);
    return line1 + '\n' + line2;
  }

  function mutateReplies(text) {
    const lines = cleanLines(text);
    if (!lines.length) return null;

    const seeds = shuffle(lines).map(seed);
    while (seeds.length < 5) {
      seeds.push(seeds[0]);
    }

    const used = new Set();

    return [
      { type: "Practical", text: buildPractical(seeds[0], used) },
      { type: "Practical", text: buildPractical(seeds[1], used) },
      { type: "Practical", text: buildPractical(seeds[2], used) },
      { type: "Self-deprecating", text: buildSelf(seeds[3], used) },
      { type: "Spicy", text: buildSpicy(seeds[4], used) }
    ];
  }

  window.REFRAME_FRAGMENT_ENGINE = {
    cleanLines,
    mutateReplies
  };

})();
