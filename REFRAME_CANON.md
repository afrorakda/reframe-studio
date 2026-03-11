# REFRAME Studio Canon

This document defines the core rules, philosophy, and design system of REFRAME Studio.

All tools, pages, and future development must follow this canon.

If there is a conflict between files, this document has priority.

---

# 1. Core Concept

REFRAME Studio is not an AI tool.

It is a Browser-native Thinking Playground.

Typical AI:

Question → Answer

REFRAME Studio:

Thought Fragment  
↓  
Mutation  
↓  
Angle  
↓  
Expression  

Goal:

Chaos → Creation

The system encourages thought movement, not answers.

---

# 2. Tool Philosophy

Core rule:

1 tool = 1 mutation

Tools are not applications.

They are thinking utilities.

Each tool performs a simple transformation.

Examples:

Confusion → Question  
Problem → Options  
Idea → Post Angles  
Hook → Draft  
Draft → Polished Post  
Criticism → Lesson  
Emotion → Action  

Tools must remain:

- extremely simple  
- fast  
- frictionless  

---

# 3. Technical Constraints

All tools must follow these rules.

Allowed:

HTML  
CSS  
Vanilla JavaScript  

Forbidden:

Frameworks  
Backend  
Database  
Login  
Tracking  
External APIs  

Principles:

No login  
No tracking  
No personal data collection  
Runs entirely in the browser  

Each tool must be:

Single HTML file  
Mobile friendly  
Optimized for iPhone  
Fast to load  
GitHub Pages compatible  

---

# 4. Language Behavior

Input language determines output language.

Rules:

If input is Japanese  
→ Output must be Japanese  

If input is English  
→ Output must be English  

Never mix languages.

UI language remains English.

---

# 5. UI Canon (Design Rules)

REFRAME Studio must maintain a consistent visual atmosphere.

The UI should feel like a thinking space, not a SaaS dashboard.

### Background

Preferred:

Dark or soft deep gradient background

Avoid:

Bright SaaS-style white dashboards

---

### Visual Tone

The interface should evoke:

Calm  
Space  
Clarity  
Thought movement  

Preferred style:

Subtle glow  
Soft gradients  
Glass-like cards  
Quiet spacing  

Avoid:

Crowded UI  
Heavy borders  
Corporate dashboards  
Dense tables  

---

### Layout Structure

Typical tool layout:

Back link  

Tool label / tag  

Title  

Short description  

Input field  

Primary action button  

Optional buttons  
(example / clear / copy)

Result area  

Footer  

---

### Spacing

REFRAME UI must feel calm and breathable.

Rules:

Wide vertical spacing  
Clear hierarchy  
Minimal clutter  

---

### Mobile First

Primary device:

iPhone

Avoid layouts that require:

Zooming  
Horizontal scrolling  
Tiny buttons  

---

# 6. Thinking System Architecture

REFRAME Studio functions as a Thinking OS.

Core flow:

Fragment  
↓  
Router  
↓  
Mutation  
↓  
Trail  
↓  
Expression  

Example system tools:

fragment-drop  
fragment-router  
mutation-trail  
thinking-ocean  

These tools move thoughts through the system.

---

# 7. Mutation Principle

Every tool must encourage continued thinking.

A tool should never terminate thought.

Output should lead to:

New idea  
New angle  
New question  
New action  

Tools should suggest next mutations.

---

# 8. Privacy Philosophy

REFRAME Studio guarantees:

No login  
No tracking  
No personal data collection  
No analytics scripts  

Users interact freely without identity.

---

# 9. Project Goal

REFRAME Studio aims to build:

100+ tiny thinking tools

Focus:

Simplicity  
Speed  
Clarity  
Creative thinking  

The system should remain:

Lightweight  
Independent  
Browser-native  

---

# 10. Development Workflow Rule

Whenever files are changed, the developer must always provide:

1. Modified file names  
2. Live check URLs  
3. Verification checkpoints  

Example:

File: fragment-router.html  

Check URL:  
https://afrorakda.github.io/reframe-studio/fragment-router.html  

Checkpoints:  
- UI follows REFRAME style  
- Buttons work  
- Mobile layout correct  

This rule prevents design drift.

---

# 11. Canon Priority

If any file contradicts this document:

REFRAME_CANON.md is the final authority.
