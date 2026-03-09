# REFRAME Router Field Interpreter v1

router.js is not a simple tool switcher.

router.js is a field interpreter.

Its job is:

Input
→ read field state
→ find nearby contact zones
→ surface next mutations


--------------------------------------------------

CORE IDEA

Old router:

Input → Tool

New router:

Input
→ Friction Field
→ Mutation Field
→ Expression Field
→ Contact Zone resonance
→ Next openings


--------------------------------------------------

WHAT router.js MUST DO

1. Read user input
2. Estimate field state
3. Find matching contact zones
4. Return the best nearby zones
5. Keep Mutation Loop alive


--------------------------------------------------

STEP 1 — READ INPUT

router.js receives raw user input text.

Example:

"I have ideas but I cannot turn them into tools."

The router does not directly choose a tool.

It first reads the field state behind the input.


--------------------------------------------------

STEP 2 — ESTIMATE FIELD STATE

router.js estimates 3 things:

A. Friction Field
Where is thinking stuck?

B. Mutation Field
What kind of transformation is needed?

C. Expression Field
What output form is easiest to surface now?


Example:

Input:
"I have ideas but I cannot turn them into tools."

Possible field read:

Friction
- Expression high
- Ambiguity medium
- Structural medium

Mutation
- Convert high
- Condense medium
- Sequence medium

Expression
- Structure high
- List medium


--------------------------------------------------

STEP 3 — FIND CONTACT ZONE RESONANCE

router.js compares the field state with contact zones inside mutation-map.js.

It does not ask:

"What tool is correct?"

It asks:

"Which zones are nearest to this field state?"


Example match:

Idea → Tool Spec
Tool Spec → HTML
Tool Generator v3


--------------------------------------------------

STEP 4 — RETURN NEXT OPENINGS

router.js should surface:

- best zone
- 2 or 3 nearby zones
- why they appeared
- what kind of next mutation they offer


The result should not feel like final answer.

It should feel like:

"Here are the next places your thought can touch."


--------------------------------------------------

STEP 5 — KEEP MUTATION LOOP ALIVE

Every result must create the next field state.

That means the router should return:

- suggested zone
- reason
- next openings

Not just one fixed destination.


--------------------------------------------------

MODE SYSTEM

Stable
- clearer reading
- safer routing
- less turbulence

Drift
- slight sideways movement
- nearby unexpected angles

Chaos
- meaningful turbulence
- more surprising openings

Chaos is not random.

Chaos means:
less rigid matching,
more unexpected but relevant contact.


--------------------------------------------------

MINIMUM OUTPUT FORMAT

router.js should produce something like:

1. Primary Zone
2. Nearby Zones
3. Why This Appeared
4. Next Openings


Example:

Primary Zone
Idea → Tool Spec

Nearby Zones
Tool Spec → HTML
Tool Generator v3

Why This Appeared
Your input shows high expression friction and high convert pressure.

Next Openings
Build structure
Generate HTML
Prepare registry entry


--------------------------------------------------

WHAT router.js IS NOT

router.js is not:

- a hardcoded if/else tool menu
- a probability picker
- a random suggestion box
- a final-answer engine


--------------------------------------------------

WHAT router.js IS

router.js is:

- a field reader
- a resonance detector
- a contact surfacer
- a mutation loop keeper


--------------------------------------------------

NEXT IMPLEMENTATION GOAL

router.js should use:

window.REFRAME_MUTATION_MAP

and do:

1. read input
2. estimate field state
3. score contact zones
4. sort zones
5. return best matches


--------------------------------------------------

FINAL RULE

REFRAME routing is not:

Question → Answer

REFRAME routing is:

Input → Field Read → Contact → Mutation → Next Field
