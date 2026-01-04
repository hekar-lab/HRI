---
id: 'TCDNZDECM'
title: To build the ideal decompiler
subtitle: Invent a time machine
date: '2025-12-30T20:41:26'
author: Dr. Eugene Severer
layout: article
draft: true
---

{{< heading Abstract >}}

Compilers are hard. Decompilers are a fool's errand.

We've been tasked with the creation of a "perfect" decompiler. And though we've been
clear time and time again that this is an impossible task, upper management keeps
nagging us with this ludicrous diagram:

{{% hri_tfig caption="*Decompiler* diagram[^fa]" %}}
╔═══════════════════════════════════╗   
║                                   ║   
║           binary program          ║   
║                  ╷                ║   
║          ╭───────╯──────╮         ║   
║          │  DECOMPILER  │         ║   
║          ╰──────╭───────╯         ║   
║                 ↓                 ║   
║    high-level language program    ║   
║                                   ║   
╚═══════════════════════════════════╝   
{{% /hri_tfig %}}

[^fa]: fe

{{< hri_tfig caption="Decompiler" >}}
╔═══════════════════════════════════╗   
║                                   ║   
║    high-level language program    ║   
║                 ╷                 ║   
║           ╭─────╰──────╮          ║   
║           │  COMPILER  │          ║   
║           ╰──────╮─────╯          ║   
║                  ↓                ║   
║           binary program          ║   
║                                   ║   
╚═══════════════════════════════════╝   
{{</ hri_tfig >}}

{{< hri_tfig caption="Decompiler" >}}
╔═════════════════════════════════════╗ 
║                                     ║ 
║            binary program           ║ 
║                  │                  ║ 
║   ╭──────────────│───────────────╮  ║ 
║   │      ╭───────↓───────╮       │  ║ 
║   │      │syntax analyzer│       │  ║ 
║  D│     ╭────────↓────────╮      │  ║ 
║  E│     │semantic analyzer│      │  ║ 
║  C│╭─────────────↓─────────────╮ │  ║ 
║  O││intermediate code generator│ │  ║ 
║  M│╭─────────────↓──────────────╮│  ║ 
║  P││control flow graph generator││  ║ 
║  I│╰────╭────────↓─────────╮────╯│  ║ 
║  L│     │data flow analyzer│     │  ║ 
║  E│   ╭──────────↓──────────╮    │  ║ 
║  R│   │control flow analyzer│    │  ║ 
║   │   ╰───╭──────↓───────╮──╯    │  ║ 
║   │       │code generator│       │  ║ 
║   │       ╰──────┬───────╯       │  ║ 
║   ╰──────────────│───────────────╯  ║ 
║                  ↓                  ║ 
║     high-level language program     ║ 
║                                     ║ 
╚═════════════════════════════════════╝ 
{{</ hri_tfig >}}

I'm thus obligated to write this article deconstructing this silly fantasy and maybe
set more reasonable goals.

## There are no decompilers

Compilers != translators

Unbake a cake

## A more sensible definition

## Moving forward
