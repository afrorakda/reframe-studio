(function () {
  const replyFrames = [
    '"{reply}" can mean "I do not get this yet."',
    '"{reply}" can mean "I cannot hold this yet."',
    '"{reply}" can mean "this feels hard to catch."',
    '"{reply}" can mean "I wanted this to be easier."',
    '"{reply}" can mean "I wanted a faster answer."',
    '"{reply}" can mean "this came too soon for me."',
    '"{reply}" can mean "I cannot sort this fast."',
    '"{reply}" can mean "I wanted this in a safer shape."',
    '"{reply}" can mean "I cannot name this yet."',
    '"{reply}" can mean "I lost the thread too fast."',
    '"{reply}" can mean "I wanted a cleaner idea."',
    '"{reply}" can mean "this did not fit my box yet."',
    '"{reply}" can mean "I needed more steps."',
    '"{reply}" can mean "I wanted this to stay simple."',
    '"{reply}" can mean "I could not grab the point fast."',
    '"{reply}" can mean "this moved before I could follow."',
    '"{reply}" can mean "I wanted less fog."',
    '"{reply}" can mean "this asked me to wait."',
    '"{reply}" can mean "I wanted the idea to sit still."',
    '"{reply}" can mean "I needed the thought to slow down."'
  ];

  const softFragments = [
    'Some thoughts need air.',
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
    'A new thought rarely lands in a neat line.',
    'This idea feels early.',
    'Some thoughts move before words do.',
    'A thought can lean before it can stand.',
    'Some ideas arrive without a clean coat.',
    'A soft shape can still be real.',
    'Not ready does not mean wrong.',
    'Some thoughts need quiet first.',
    'Some ideas need time more than proof.',
    'A hard thought can still be good.',
    'Some meaning shows up late.',
    'A thought can be true before it is clear.',
    'Some ideas open slowly.',
    'A rough thought can still have roots.',
    'A strange line can still carry light.',
    'Some thoughts need a second look.',
    'A young idea can sound thin at first.',
    'Some ideas come in sideways.',
    'A thought can shake before it settles.',
    'Not neat does not mean dead.',
    'Some ideas grow after the first no.',
    'A loose thought can still hold a seed.',
    'Some things make sense after they cool.',
    'A thought can miss the moment and still be good.',
    'Some ideas need less light, more time.',
    'A slow thought can still reach far.'
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
    'Some people only trust what sounds finished.',
    'Some people like ideas they can repeat fast.',
    'Many replies are really about pace.',
    'People push back when a thought stays open.',
    'Some readers want the end before the middle.',
    'A fast no is easier than a slow maybe.',
    'People often want a label before a feeling.',
    'Some minds want the point to sit still.',
    'A rough thought asks more from the reader.',
    'People often call it weak when it is just early.',
    'Some readers want clean lines, not live ones.',
    'Many people trust short boxes too much.',
    'Some replies are just a wish for less work.',
    'A thought that moves can make people step back.',
    'People often fear what they cannot sort.',
    'Some readers want order before meaning.',
    'A slow idea can feel rude online.',
    'People often want easy words over live ones.',
    'Some replies are a push toward safer shapes.',
    'Many readers want less drift and more proof.',
    'Some people trust flat words too much.',
    'The crowd often likes sharp edges and quick names.',
    'People often want one point, not a field.',
    'Some readers pull away when a thought stays soft.',
    'A hard thought can look empty from far away.',
    'Some people want less fog, more frame.',
    'Many replies ask for shape, not truth.',
    'People often want ideas to behave.',
    'Some readers only trust what sounds done.'
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
    'The crowd often wants comfort, not surprise.',
    'Some people want clean walls around every idea.',
    'A fast laugh can hide a small fear.',
    'Some replies are just doors shutting early.',
    'The internet loves bold tone more than slow seeing.',
    'Some people say boring when they are lost.',
    'Some people say nonsense when they feel late.',
    'A lot of certainty online is just speed standing up straight.',
    'Some replies try to kill the fog before the shape appears.',
    'The crowd likes thoughts that sit still.',
    'Some readers want a cage, not an opening.',
    'Some people hate drift more than bad ideas.',
    'A quick no can be a mask for weak reading.',
    'Some replies are just fear with short words.',
    'The crowd often treats early as wrong.',
    'Some people would rather sort than feel.',
    'Online, neat can win over alive.',
    'Some people need the thought to kneel before they trust it.',
    'Fast readers often punish slow ideas.',
    'Some replies come with a stopwatch hidden inside.',
    'The crowd often wants sleep, not surprise.'
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
    'Maybe I threw out the bones and called it a body.',
    'Maybe the thought needed one more night.',
    'Maybe I posted the smoke and skipped the fire.',
    'Maybe I asked people to hold mist.',
    'Maybe I shared the seed and called it a tree.',
    'Maybe I was not wrong. Maybe I was still mid-step.',
    'Maybe I rushed the shape.',
    'Maybe I put out the sketch and called it whole.',
    'Maybe the idea could walk, but not yet talk.',
    'Maybe I gave it away before it learned its weight.',
    'Maybe I posted the drift before the line.',
    'Maybe I wanted the thought to count before it could land.',
    'Maybe I shared the door, not the room.',
    'Maybe I served the idea cold and asked for warmth.',
    'Maybe I posted the break, not the bridge.',
    'Maybe I pushed the thought outside too early.',
    'Maybe I gave it no time to breathe.',
    'Maybe I posted the blur and called it shape.',
    'Maybe I heard the idea before I could say it.',
    'Maybe I was still inside the thought.',
    'Maybe I gave them the wave, not the shore.'
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
    'the gap between strange and useless',
    'when the thought moves first',
    'some ideas need more air',
    'what rush does to new ideas',
    'the cost of saying it early',
    'when clean words come too soon',
    'a thought before its frame',
    'why live ideas look messy',
    'when easy wins over alive',
    'the shape is not here yet',
    'some thoughts grow slow'
  ];

  const shortFragments = [
    'This idea feels early.',
    'Some thoughts need air.',
    'Slow thoughts grow roots.',
    'Not clear does not mean wrong.',
    'Some ideas start in fog.',
    'Some meaning shows up late.',
    'A rough thought can still live.',
    'Some thoughts move sideways.',
    'A slow idea can still land.',
    'Not neat does not mean empty.',
    'Some ideas need room.',
    'A thought can be young.',
    'Some words come late.',
    'A live thought can look strange.',
    'Some ideas need quiet.',
    'A hard thought can still hold light.',
    'Some meaning needs drift.',
    'A thought can lean first.',
    'Not done does not mean dead.',
    'Some ideas want less force.'
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

  function pickUnused(pool, used) {
    const options = pool.filter(item => !used.has(item));
    const choice = options.length ? pick(options) : pick(pool);
    used.add(choice);
    return choice;
  }

  function maybeShortLine() {
    return Math.random() < 0.38 ? '\n' + pick(shortFragments) : '';
  }

  function buildPractical(reply, usedA, usedB) {
    const lineA = pickUnused(replyFrames, usedA).replaceAll('{reply}', reply);
    const secondPool = Math.random() < 0.5 ? practicalFragments : softFragments;
    const lineB = pickUnused(secondPool, usedB);
    return `${lineA}\n${lineB}${maybeShortLine()}`;
  }

  function buildSelf(reply, usedA, usedB) {
    const start = pickUnused(selfFragments, usedA);
    const endPool = [
      `Start with "${reply}".`,
      `Open with "${reply}".`,
      `Use "${reply}" as the first line.`,
      `Begin with "${reply}", then turn it on yourself.`,
      `Let "${reply}" be the small wound.`,
      `Start from "${reply}" and make yourself part of it.`
    ];
    const end = pickUnused(endPool, usedB);
    return `${start}\n${end}${maybeShortLine()}`;
  }

  function buildEdgy(reply, usedA, usedB) {
    const start = pickUnused(edgyFragments, usedA);
    const endPool = [
      `Lead with "${reply}".`,
      `Use "${reply}" as the spark.`,
      `Open with "${reply}".`,
      `Start from "${reply}".`,
      `Let "${reply}" be the hook.`,
      `Use "${reply}" as the small proof.`
    ];
    const end = pickUnused(endPool, usedB);
    return `${start}\n${end}${maybeShortLine()}`;
  }

  function buildFragments(count) {
    const pool = shuffle([
      ...replyFrames,
      ...softFragments,
      ...practicalFragments,
      ...edgyFragments,
      ...selfFragments,
      ...shortFragments,
      ...titleFragments
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

    const usedA = new Set();
    const usedB = new Set();

    return [
      { type: 'Practical', text: buildPractical(seeds[0], usedA, usedB) },
      { type: 'Practical', text: buildPractical(seeds[1], usedA, usedB) },
      { type: 'Practical', text: buildPractical(seeds[2], usedA, usedB) },
      { type: 'Self-deprecating', text: buildSelf(seeds[3], usedA, usedB) },
      { type: 'Spicy', text: buildEdgy(seeds[4], usedA, usedB) }
    ];
  }

  function mutateSingle(reply) {
    const seed = replySeed(reply);
    const usedA = new Set();
    const usedB = new Set();

    return {
      title: pick(titleFragments),
      lines: [
        pickUnused(replyFrames, usedA).replaceAll('{reply}', seed),
        pickUnused(softFragments, usedB),
        pick(shortFragments)
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
