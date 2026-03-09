# REFRAME Mutation Loop Engine v1

REFRAME Studio must not stop at one mutation.

It must continue.

Input
→ Mutation
→ New Field
→ Next Mutation
→ New Field
→ Next Mutation


--------------------------------------------------

CORE IDEA

A tool result is not the end.

A tool result becomes the next field state.

This creates the Mutation Loop.


--------------------------------------------------

MUTATION LOOP DEFINITION

Mutation Loop means:

1. read current input
2. estimate field state
3. drift the field
4. surface the best contact zone
5. create output state
6. convert output state into next field state
7. repeat


--------------------------------------------------

WHY IT MATTERS

Without Mutation Loop:

Input
→ Tool
→ Output
→ Stop

With Mutation Loop:

Input
→ Tool
→ Output
→ Next opening
→ Next tool
→ New output
→ Continue


--------------------------------------------------

LOOP ENGINE JOB

The Mutation Loop Engine must:

1. receive input
2. use router to read field state
3. use drift engine to modify field state
4. choose a primary contact zone
5. surface nearby zones
6. create a loop step
7. allow next step generation


--------------------------------------------------

LOOP STEP

Each loop step should contain:

- step number
- input text
- mode
- field state
- drift summary
- primary zone
- nearby zones
- next openings
- output state


--------------------------------------------------

NEXT FIELD STATE

The output of one step becomes the next field state.

Not by exact text meaning.

By directional carry-over.

Example:

If output state contains:
- less-stuck
- oriented
- next-tool-visible

Then next field state should slightly increase:
- sequence
- action
- structure

And reduce:
- ambiguity


--------------------------------------------------

LOOP PRINCIPLE

Every step must do two things:

1. create one useful mutation now
2. make the next mutation easier


--------------------------------------------------

MODE BEHAVIOR

Stable
- clearer loop
- safer progression
- more readable path

Drift
- sideways progression
- nearby unexpected path

Chaos
- controlled instability
- more surprising next contact


--------------------------------------------------

LOOP OUTPUT RULE

The engine must return:

- current best zone
- why it appeared
- next openings
- next carried field state

This keeps thought moving.


--------------------------------------------------

FINAL RULE

REFRAME Mutation Loop Engine is not:

- chatbot conversation memory
- hardcoded flowchart
- linear tutorial

REFRAME Mutation Loop Engine is:

- continuing thought motion
- repeated field transition
- mutation chain generator
