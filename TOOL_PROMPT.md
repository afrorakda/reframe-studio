# REFRAME Studio Tool Generation Prompt

Create a complete final single-file HTML tool for REFRAME Studio.

Core goal:

Build a tiny browser tool that solves one moment of thinking friction.

The tool performs a simple transformation:

Input → Output

---

## Technical Rules

- HTML + CSS + Vanilla JavaScript only
- Single HTML file
- Mobile friendly
- Runs entirely in the browser
- No login
- No tracking
- No personal data
- No external APIs
- No frameworks

---

## Language Behavior

Detect input language automatically.

Japanese input → Japanese output  
English input → English output

Never mix languages.

UI stays in English.

---

## UI Layout

Back link  
Title  
Description  
Input field  
Main button  
Example button  
Voice input (optional)  
Result  
Footer

---

## HTML Metadata

Always include:

<title>TOOL_NAME | REFRAME Studio</title>

<meta name="description" content="SHORT_TOOL_DESCRIPTION" />

---

## Footer

Include the REFRAME Studio footer.
