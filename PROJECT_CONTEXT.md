# REFRAME Studio

REFRAME Studio is a collection of ultra-simple browser tools designed to reduce thinking friction.

The project focuses on tiny utilities that help people transform confusion, criticism, ideas, or emotions into clearer thinking and useful outputs.

---

## Core Philosophy

1 tool = 1 problem

Each tool performs a simple transformation:

Input → Output

Examples:

Confusion → Question  
Problem → Options  
Idea → Post Angles  
Hook → Draft  
Draft → Polished Post  
Criticism → Lesson  

Tools should feel like small thinking utilities rather than complex applications.

---

## Technical Constraints

All tools must follow these rules:

- HTML + CSS + Vanilla JavaScript only
- Single HTML file
- Runs entirely in the browser
- No login
- No tracking
- No personal data collection
- No external APIs
- No frameworks
- Works well on mobile
- Optimized for iPhone and low-spec devices
- Deployable via GitHub Pages

---

## Language Behavior

Tools must automatically detect input language.

Rules:

If input is Japanese  
→ Output must be Japanese

If input is English  
→ Output must be English

Never mix languages in the output.

UI language remains English.

---

## Tool Structure

Typical tool layout:

1. Back link
2. Tool title
3. Short description
4. Input field
5. Main action button
6. Optional buttons (example, voice input, copy result)
7. Result area
8. Footer

---

## Standard Footer

All tools include the REFRAME Studio footer.

Purpose:

- Clarify philosophy
- Emphasize privacy
- Maintain consistent branding

---

## Site Structure

The main index page includes:

- Random Tool button
- Thinking Loop
- "Where are you stuck?" navigation
- Auto-detected tool list

The index page dynamically reads all tool HTML files in the repository.

---

## Thinking Loop

REFRAME Studio tools roughly follow this thinking flow:

Confusion → Question  
Problem → Options  
Idea → Post Angles  
Hook → Draft  
Draft → Polished Post

This structure helps users move from unclear thoughts to publishable content.

---

## Example Tools

Examples of existing tools:

confusion-to-question.html  
problem-to-options.html  
idea-to-post-angles.html  
hook-generator.html  
tweet-polisher.html  
criticism-to-lesson.html  
emotion-to-action.html  
complexity-cleaner.html  
overthinking-breaker.html  

Each tool remains independent and lightweight.

---

## Project Goal

Build a library of 100+ tiny thinking tools.

The focus is:

- simplicity
- speed
- clarity
- usefulness

REFRAME Studio aims to become a lightweight "thinking tools library" for creators, builders, and thinkers.
