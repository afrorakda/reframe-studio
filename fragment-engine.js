(function () {
  const replyFrames = [
    '"{reply}" can mean "I do not get this yet"',
    '"{reply}" can mean "this does not fit my box yet"',
    '"{reply}" can mean "this feels hard to hold"',
    '"{reply}" can mean "I wanted this to be easier"',
    '"{reply}" can mean "I wanted a faster answer"',
    '"{reply}" can mean "this came too early for me"',
    '"{reply}" can mean "I cannot sort this fast"',
    '"{reply}" can mean "I want this to feel more safe"',
    '"{reply}" can mean "I cannot name this yet"',
    '"{reply}" can mean "this is not ready for me yet"',
    '"{reply}" can mean "I lost the thread too fast"',
    '"{reply}" can mean "I want this in a simpler shape"'
  ];

  const softFragments = [
    'Some thoughts need more time.',
    'Not clear yet does not mean bad.',
    'A rough idea can still have heat.',
    'Some ideas come out early.',
    'A strange thought can make sense later.',
    'Some people need a clean shape first.',
    'The first form of an idea is often messy.',
    'A thought can be alive before it is neat.',
    'Some ideas start in fog.',
    'A messy thought can still be worth keeping.',
    'Not easy does not mean empty.',
    'Some ideas need air before they need defense.',
    'A thought can feel odd before it feels right.',
    'Some ideas need room, not force.',
    'A new thought rarely lands in a neat line.'
  ];

  const practicalFragments = [
    'People like ideas they can name fast.',
    'Some replies come from rush, not care.',
    'The internet likes clean answers.',
    'People often want the point too soon.',
    'Fast meaning feels safe to many people.',
    'Some people pull away from what feels open.',
    'A lot of replies ask for speed, not depth.',
    'People often trust neat words too much.',
    'Some readers want the whole idea at once.',
    'Many people want thoughts that fit fast.',
    'Quick judgment is easier than slow thought.',
    'Some people only trust what sounds finished.'
  ];

  const edgyFragments = [
    'Some people are not mad at the idea. They are mad they cannot hold it fast.',
    'The crowd often picks easy over alive.',
    'Some replies are not deep. They are just fast.',
    'A lot of people do not hate bad ideas. They hate feeling slow.',
    'Some people want a label more than a thought.',
    'The internet laughs fast when it cannot sort something.',
    'Some people call it bad when they just mean hard.',
    'A lot of online confidence is only speed with better clothes.',
    'Some replies are just panic in short form.',
    'The crowd often wants comfort, not surprise.'
  ];

  const selfFragments = [
    'Maybe the idea was fine. Maybe I posted it too soon.',
    'Maybe the thought was good. Maybe I gave it no time to grow.',
    'Maybe I was early and loud.',
    'Maybe I posted the first draft of a feeling.',
    'Maybe the idea needed more shape first.',
    'Maybe I gave people a spark and called it done.',
    'Maybe the thought was alive, but still too raw.',
    'Maybe I was still building the bridge.',
    'Maybe I shared it before it could stand up.',
    'Maybe I threw out the bones and called it a body.'
  ];

  const titleFragments = [
    'too early, not wrong',
    'when people want easy words',
    'why rough thoughts get pushed away',
    'not clear yet',
    'when a thought has no neat shape',
    'the fear of not getting it fast',
    'what bad replies really show',
    'when ideas land before they are ready',
    'why some thoughts need fog',
    'the gap between strange and useless'
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function cleanLines(text) {
    return String(text || '')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .slice(0, 20);
  }

  function safeReply(line) {
    return String(line || '')
      .replace(/[“”"'`]/g, '')
      .trim();
  }

  function replySeed(line) {
    const clean = safeReply(line);
    return clean || 'bad reply';
  }

  function uniquePush(list, value) {
    if (!list.includes(value)) list.push(value);
  }

  function buildPractical(reply) {
    const lineA = pick(replyFrames).replaceAll('{reply}', reply);
    const lineB = Math.random() < 0.5 ? pick(practicalFragments) : pick(softFragments);
    return `${lineA}\n${lineB}`;
  }

  function buildSelf(reply) {
    const start = pick(selfFragments);
    const end = Math.random() < 0.5
      ? `Start with "${reply}".`
      : `Open with "${reply}".`;
    return `${start}\n${end}`;
  }

  function buildEdgy(reply) {
    const start = pick(edgyFragments);
    const end = Math.random() < 0.5
      ? `Lead with "${reply}".`
      : `Use "${reply}" as the spark.`;
    return `${start}\n${end}`;
  }

  function buildFragments(count) {
    const pool = shuffle([
      ...softFragments,
      ...practicalFragments,
      ...edgyFragments,
      ...selfFragments
    ]);

    return pool.slice(0, count || 5);
  }

  function mutateReplies(rawText) {
    const lines = cleanLines(rawText);
    if (!lines.length) return null;

    const shuffled = shuffle(lines).map(replySeed);
    const seeds = [];
    for (let i = 0; i < 5; i++) {
      seeds.push(shuffled[i % shuffled.length]);
    }

    return [
      { type: 'Practical', text: buildPractical(seeds[0]) },
      { type: 'Practical', text: buildPractical(seeds[1]) },
      { type: 'Practical', text: buildPractical(seeds[2]) },
      { type: 'Self-deprecating', text: buildSelf(seeds[3]) },
      { type: 'Spicy', text: buildEdgy(seeds[4]) }
    ];
  }

  function mutateSingle(reply) {
    const seed = replySeed(reply);
    return {
      title: pick(titleFragments),
      lines: [
        pick(replyFrames).replaceAll('{reply}', seed),
        pick(softFragments),
        pick(practicalFragments)
      ]
    };
  }

  window.REFRAME_FRAGMENT_ENGINE = {
    cleanLines,
    buildFragments,
    mutateReplies,
    mutateSingle
  };
})();
