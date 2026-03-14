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

  function clean(text) {
    return String(text || "").trim();
  }

  function shortReply(text) {
    return clean(text).replace(/[“”"'`]/g, "");
  }

  const insightFrames = [
    'People often react to protect something they already trust.',
    'Sometimes the reaction says more about fear than truth.',
    'A fast reply often hides a need for control.',
    'Some pushback is really about keeping the old shape safe.',
    'People often want the point before they want the idea.',
    'Some reactions are trying to keep the world simple.',
    'Pushback often starts where the idea stops feeling safe.',
    'People often move toward the easier shape first.',
    'A rough reply can show where the fear is.',
    'Some reactions protect a role, not a truth.'
  ];

  const reframeFrames = [
    '"{reply}" may not mean the idea is weak. It may mean the shape is still new.',
    '"{reply}" may not be rejection. It may be a wish for a safer path.',
    '"{reply}" may be less about truth and more about pace.',
    '"{reply}" may mean the reader wanted the point sooner.',
    '"{reply}" may be a sign that the thought is still ahead of the room.',
    '"{reply}" may mean the idea stayed open longer than they wanted.',
    '"{reply}" may be what happens when a thought does not fit fast.',
    '"{reply}" may show where the old frame starts pushing back.',
    '"{reply}" may be fear wearing a quick voice.',
    '"{reply}" may mean they wanted the easy version first.'
  ];

  const oppositeFrames = [
    'Clear ideas travel fast. Live ideas often travel slower.',
    'Easy words spread first. Hard thoughts stay longer.',
    'The safe idea gets the quick yes. The rough idea keeps growing.',
    'Fast clarity gets attention. Slow meaning gets roots.',
    'Simple takes get shared. Strange takes get remembered.',
    'The clean version lands first. The deeper version lands later.',
    'What feels easy gets approved. What feels alive gets resisted.',
    'Quick answers calm people. Open thoughts move them.',
    'The short path feels safe. The rough path changes more.',
    'The finished shape gets trust. The forming shape gets doubt.'
  ];

  const patternFrames = [
    'new thought\n↓\nconfusion\n↓\npushback\n↓\nlater meaning',
    'rough idea\n↓\nfast reply\n↓\nfriction\n↓\nclearer shape',
    'new angle\n↓\npeople feel lost\n↓\nthey push back\n↓\nthe idea keeps growing',
    'strange thought\n↓\nquick judgment\n↓\nresistance\n↓\nsecond look',
    'early idea\n↓\npeople want the shortcut\n↓\nthey reject it\n↓\nit lands later',
    'open thought\n↓\nneed for control\n↓\npushback\n↓\nnew path',
    'hard idea\n↓\nneed for safety\n↓\nsimple reply\n↓\ndeeper read later',
    'new shape\n↓\nold habit pushes back\n↓\nfriction\n↓\nnew meaning',
    'thought moves first\n↓\nwords lag behind\n↓\npeople react fast\n↓\nmeaning catches up',
    'fresh idea\n↓\nthe room is not ready\n↓\nreply comes first\n↓\nunderstanding comes later'
  ];

  const contentSeedFrames = [
    'People say "{reply}" when they really mean "give me the point faster."',
    'Sometimes "{reply}" means "make this easier for me to hold."',
    '"{reply}" can become a post about how people protect what already feels safe.',
    'Use "{reply}" as the start of a post about fear of not getting it fast.',
    '"{reply}" can lead to a post about why open ideas make people uneasy.',
    'Turn "{reply}" into a post about how pushback often protects an old role.',
    'Start from "{reply}" and write about why people trust simple shapes first.',
    '"{reply}" can become a post about how rough ideas get mistaken for weak ones.',
    'Use "{reply}" to write about fast replies and slow understanding.',
    'Start with "{reply}" and write about how people react when the shape is still new.'
  ];

  const hookFrames = [
    'Maybe the problem was not the idea. Maybe it was the timing.',
    'People do not always reject the idea. Sometimes they reject the feeling of not getting it fast.',
    'A lot of "boring" is really "make this easier for me."',
    'Sometimes pushback is just fear in a simple voice.',
    'People often call it weak when it is just early.',
    'Some replies are really asking for safety, not truth.',
    'The first version of an idea often gets judged like the final one.',
    'What feels unclear can still be alive.',
    'People trust finished shapes first.',
    'Fast judgment often arrives before real understanding.'
  ];

  function buildMutation(reply) {
    const r = shortReply(reply) || 'bad reply';

    return {
      insight: pick(insightFrames),
      reframe: pick(reframeFrames).replaceAll('{reply}', r),
      opposite: pick(oppositeFrames),
      pattern: pick(patternFrames),
      contentSeed: pick(contentSeedFrames).replaceAll('{reply}', r),
      hook: pick(hookFrames)
    };
  }

  function mutateList(replies) {
    const cleaned = (replies || [])
      .map(shortReply)
      .filter(Boolean);

    if (!cleaned.length) return null;

    const seeds = shuffle(cleaned);
    return seeds.slice(0, 3).map(reply => ({
      reply,
      mutation: buildMutation(reply)
    }));
  }

  window.REFRAME_MUTATION_ENGINE = {
    buildMutation,
    mutateList
  };
})();
