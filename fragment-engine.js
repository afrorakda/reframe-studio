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
    '"{reply}" can sometimes mean they wanted a cleaner path.',
    '"{reply}" can sometimes mean they wanted fewer steps.',
    '"{reply}" can sometimes mean they wanted a more familiar shape.',
    '"{reply}" can sometimes mean they wanted the point first.',
    '"{reply}" can sometimes mean they wanted less drift.',
    '"{reply}" can sometimes mean the thought stayed open too long.',
    '"{reply}" can sometimes mean they wanted the easy read.',
    '"{reply}" can sometimes mean the idea asked too much too soon.',
    '"{reply}" can sometimes mean they wanted the answer before the walk.',
    '"{reply}" can sometimes mean they could not hold the shape yet.',
    '"{reply}" can sometimes mean they wanted the safe version.'
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
    'Maybe I needed one more pass.',
    'Maybe I gave it no room.',
    'Maybe I shared the first draft of it.',
    'Maybe I cut the bridge too soon.',
    'Maybe I gave the point away too fast.',
    'Maybe I left out the simple part.',
    'Maybe I pushed past the middle.',
    'Maybe I gave it words before it had weight.',
    'Maybe I showed the edges first.',
    'Maybe I let the rough part lead.',
    'Maybe I made the path too thin.',
    'Maybe I moved before the idea settled.',
    'Maybe I asked too much too fast.',
    'Maybe I shared the motion, not the shape.',
    'Maybe I pushed it before it could stand.',
    'Maybe I opened the door too early.'
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
    'Some ideas need a simpler start.',
    'Some ideas need less speed.',
    'Some thoughts need a cleaner path.',
    'Some ideas need more shape.',
    'Some thoughts need a second pass.',
    'Some ideas need the middle first.',
    'Some thoughts need less force.',
    'Some ideas need a softer start.',
    'Some thoughts need room to move.',
    'Some ideas do not fit fast.',
    'Some ideas come in rough and get better.'
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
    'People often pick easy over open.',
    'People often want the label first.',
    'People often trust the clean take.',
    'People want a path they can follow fast.',
    'People want the idea to behave.',
    'People often want less drift.',
    'People want the small version first.',
    'People often want the shape before the meaning.',
    'People trust what sounds finished.',
    'People often want the map before the walk.',
    'People prefer the version they can repeat.'
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
    'Not smooth yet does not mean lost.',
    'Not small yet does not mean unclear.',
    'Not settled yet does not mean fake.',
    'Not clean yet does not mean weak.',
    'Not quiet yet does not mean wrong.',
    'Not clear yet does not mean dead.'
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
    'Unclear ideas can make people uneasy.',
    'Sometimes people fear looking slow.',
    'Sometimes people fear losing their place.',
    'Some reactions come from fear of not knowing what to do next.',
    'Sometimes people want the old shape because it feels safer.',
    'Some pushback comes from fear of getting left behind.',
    'Sometimes the fast reply hides a small fear.',
    'People often fear what does not fit fast.',
    'Some people fear the shift more than the idea.',
    'Sometimes the reaction protects a calm they already know.',
    'Some people fear losing the frame they trust.'
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
    'Some people fear losing the shape they know.',
    'Sometimes the pushback protects a rank.',
    'Some reactions are trying to keep the old order still.',
    'Sometimes people defend the role they built.',
    'Some replies are guarding a place they earned.',
    'Sometimes a rough idea can make a fixed role feel thin.',
    'Some reactions protect how a person is seen.',
    'Sometimes the reply protects a spot, not a thought.',
    'Some people hold the line when the order starts to move.',
    'Sometimes the pushback is about staying above the shift.',
    'Some reactions defend an old way of leading.'
  ];

  const identityFragments = [
    'Some reactions protect an identity.',
    'Sometimes the pushback protects how a person sees themself.',
    'Some replies defend a story people already live in.',
    'Sometimes the reaction keeps an old self in place.',
    'Some people protect the label they know best.',
    'Sometimes a new idea rubs against who someone thinks they are.',
    'Some reactions guard a familiar self.',
    'Sometimes the pushback is about keeping the old name.',
    'Some people defend the version of them that already makes sense.',
    'Sometimes the reply protects the self more than the point.',
    'Some reactions keep a known identity from slipping.',
    'Sometimes an open idea can feel personal fast.',
    'Some people push back when the thought touches who they are.',
    'Sometimes the reply protects a self they worked hard to build.',
    'Some reactions defend a place inside the group story.',
    'Sometimes a new idea asks too much from an old self.',
    'Some people pull back when a thought moves too close.',
    'Sometimes the pushback protects a known face.',
    'Some reactions keep a person inside the role they know.',
    'Sometimes the idea is fine, but the self is not ready.'
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
    'A soft shape can make control feel thin.',
    'Some people want the thought to sit still.',
    'A wide idea can feel hard to hold.',
    'People often prefer ideas with clear edges.',
    'Some readers want the idea inside a box.',
    'A shifting thought can feel like lost control.',
    'Some people trust closed shapes more.',
    'Open meanings can feel harder to handle.',
    'Some readers want the thought to stop moving.',
    'People often want the frame before the drift.',
    'A live idea can feel harder to manage.'
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
    'A rough idea can feel harder than it is.',
    'Sometimes the reply means the thread slipped.',
    'Some reactions come from a missed turn.',
    'Sometimes the pushback begins where the path went thin.',
    'Some readers lose the point when the middle is weak.',
    'Sometimes the problem is not meaning, but order.',
    'Some people need more shape before they can stay with it.',
    'Sometimes the path is there, just not yet visible.',
    'A quick no can hide a slow confusion.',
    'Some reactions start where the reader lost the step.',
    'Sometimes the idea is fine, but the path is late.'
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
    'Friction can mean the thought touched something real.',
    'Some reactions mark the place where the idea pressed back.',
    'Sometimes the reply is the scrape, not the truth.',
    'Friction can show where old habits hold tight.',
    'Some pushback starts where the idea stops fitting cleanly.',
    'A little heat can mean the thought found a live wire.',
    'Sometimes the rough part is where the signal is.',
    'Some reactions are just the sound of the old frame pushing back.',
    'Friction can point to the part that matters most.',
    'Sometimes the scrape is part of the value.',
    'Some replies show where the thought stopped being harmless.'
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
    'Fast certainty often beats slow thought.',
    'Some people would rather sort than stay with it.',
    'The clean version usually gets the first yes.',
    'Some readers want the answer before the idea is done.',
    'Quick takes often beat rough truth.',
    'The safe shape usually gets less pushback.',
    'Some people want the line, not the drift.',
    'People often reward what feels finished.',
    'The crowd often trusts what stays simple.',
    'Fast clarity usually beats slow growth at first.',
    'Some people want the point trimmed down.'
  ];

  const selfEndings = [
    'Start with "{reply}".',
    'Open with "{reply}".',
    'Begin with "{reply}" and turn it on yourself.',
    'Start from "{reply}" and make yourself part of it.',
    'Use "{reply}" as the first line.',
    'Let "{reply}" be the small bruise.',
    'Use "{reply}" as the opening cut.',
    'Begin with "{reply}" and stay inside it.'
  ];

  const spicyEndings = [
    'Open with "{reply}".',
    'Lead with "{reply}".',
    'Use "{reply}" as the hook.',
    'Start from "{reply}".',
    'Use "{reply}" as the spark.',
    'Let "{reply}" do the first cut.',
    'Use "{reply}" as the entry line.',
    'Open on "{reply}" and go sharper.'
  ];

  function buildPractical(reply, used) {
    const line1 = pickUnused(replyFrames, used).replace("{reply}", reply);

    const secondPools = shuffle([
      someIdeaFragments,
      peopleFragments,
      notYetFragments,
      fearFragments,
      statusFragments,
      identityFragments,
      controlFragments,
      confusionFragments,
      frictionFragments
    ]);

    const line2 = pickUnused(secondPools[0], used);
    const line3 = Math.random() < 0.32 ? '\n' + pickUnused(secondPools[1], used) : '';
    return line1 + '\n' + line2 + line3;
  }

  function buildSelf(reply, used) {
    const line1 = pickUnused(maybeFragments, used);
    const line2 = pickUnused(selfEndings, used).replaceAll("{reply}", reply);
    const extraPool = shuffle([notYetFragments, someIdeaFragments, confusionFragments]);
    const line3 = Math.random() < 0.28 ? '\n' + pickUnused(extraPool[0], used) : '';
    return line1 + '\n' + line2 + line3;
  }

  function buildSpicy(reply, used) {
    const firstPools = shuffle([
      spicyFragments,
      fearFragments,
      statusFragments,
      identityFragments,
      controlFragments
    ]);

    const line1 = pickUnused(firstPools[0], used);
    const line2 = pickUnused(spicyEndings, used).replaceAll("{reply}", reply);
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
