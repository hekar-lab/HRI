---
id: 'TCEAKDECB'
title: To build the ideal decompiler
date: '2026-01-11T18:47:23'
author: Dr. Eugene Severer
layout: article
draft: false
---

{{< heading Abstract >}}

Compilers are hard. Decompilers are a fool's errand.

We've been tasked with the creation of a "perfect" decompiler. And though I've been
clear time and time again on the fact that this is an impossible task, upper management keeps
nagging us with this ludicrous diagram:

{{% figtxt caption="Decompiler diagram[^credit_cc]" id="decompiler" %}}
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
╚╤══════════════════════════════════╝   
{{% /figtxt %}}

I'm thus obligated to write this article deconstructing this silly fantasy and maybe
set more reasonable goals.

## There are no decompilers

To understand it's counterpart we must first see what compilers really are. From
a naive approach we could just reverse {{< figref decompiler >}} to get {{< figref compiler >}}.

{{% figtxt caption="Simplistic compiler diagram" id="compiler" %}}
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
╚╤══════════════════════════════════╝   
{{% /figtxt %}}

But if we go beyond and extrapolate {{< figref compiler >}}, one could say that compiling 
seems like a kind of translation. In that sense the "language" part of "programming language" takes
a more concrete meaning. But we are often used to the fact that translation goes
both way (e.g. one can go from Spanish to Italian and the other way around). It
would thus make sense that decompiling is always possible.

There is, however, a major caveat with that line of thinking. One of the main goal
of translation is to pass on semantics across languages. That is a translation should
keep the meaning of the translated text intact. But, as anyone that has tried
to use automatic translation from a two linguistically distant[^ling_dist] languages
and back (e.g. from English to Chinese and back) knows, meaning can easily get contorted. 
Not to say that it is impossible for someone to know multiple languages
but that it's hard to clearly formalize any kind of translation between them.  
Akin to this phenomenon, not all compilations are equal when it comes to programming
languages.

Compiling aims to keep functionality the same across programming languages.  
But programming languages also offer some semantics. Ways to explain what the code
do and how it supposed to behave (e.g. project structure, classes, functions, variable,
naming, comments, etc.). When compilation is done from any two language it is possible
to keep this semantics. That's a special case of compilation we call transpiling.  
However, if we want the computer to run our code we need to translate to a language for machine,
often called machine code[^mach_code]. As it is made for silicon beings, it has no need for
semantics, just pure functionality. As such, any kind of human semantics will be lost
in the process. To get the high-level program back from its compilation to a binary program
one would have to infer all the semantics from the functionality.

Thus, the inner workings of a decompiler are way different from the one of a compiler[^craft_com].
Working out the semantics on a micro level may be trivial (i.e. figuring out what one machine
code does). But when it comes to the macro scale the guess work becomes nigh impossible if
we wish to get the exact same input program (e.g. how does one get the naming and comments
back). It's like trying to unbake a cake or undo an addition. It's not hopeless but
we may need to manage our expectations.

## A more sensible definition

All is not lost. Some semantics can be inferred from the binary program. But it'll
take some serious work. 

{{< figref decompiler-full >}} shows one possible decompiler design based on the work of Dr. Cifuentes. 

{{% figtxt caption="A more detailed decompiler diagram[^credit_cc]" id="decompiler-full" %}}
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
╚╤════════════════════════════════════╝ 
{{% /figtxt %}}

We'll now explain a bit more about each step of the process.

### Syntax analyzer

Based on the machine code specification we need to retrieve the instruction used
in the binary program. As we do not always know what's code or what's data in a
binary program, this phase works in tandem with the next 3 phase to figure out
where the code is.

### Semantic analyzer

Some groups of instructions are more meaningful together. We call those idioms.
For example, when arithmetic is done one number larger than the memory size of the
machine simple operation will be split into multiple instructions. This step reverses
that process.

### Intermediate code generator

To be able to analyze the program we translate the instructions to an intermediate
representation (IR) that's independent of the machine but keeps the same functionality.

### Control flow graph generator

This step creates a graph of all the subroutines. Each node is a block of code that's
sure to be executed together. Its in edges are the code block could run before it and out edges
the code blocks that could run after. From this, it's possible to infer
function boundaries and where unanalyzed raw code might lie.

### Data flow analyzer

With the control flow graph (CFG), it's then possible to see how data is flowing
(i.e. where data comes from and goes). With this information it's possible to infer
data types and get rid of temporary values -- often stored in registers.

### Control flow analyzer

The other inference possible from the CFG are control flow structures. That is
"*if*", "*else*", "*switch*", "*while*" loops, etc. To get to a higher level of semantics.

### Code generator

Finally, with all the gathered information, this step generate code in a high-level
language as best as it can.

This procedure is far from perfect but it'll be of great help to any human try to retrieve
the semantics of a compiled program.

## Moving forward

Unless this design is approved or we are given another design proposition that's sensible
and grounded we will not move forward on this project.

{{< indent 12 >}} Dr. Eugene Severer

[^credit_cc]: Unicode representation of the diagrams found in *Reverse Compilation Techniques* by Cristina Cifuentes  
[^ling_dist]: See the Wikipedia article on [linguistic distance](https://en.wikipedia.org/wiki/Linguistic_distance)
[^mach_code]: See the Wikipedia article on [machine code](https://en.wikipedia.org/wiki/Machine_code)
[^craft_com]: To learn about the inner workings of a compiler [*Crafting Interpreters* by Robert Nystrom](https://craftinginterpreters.com/)
    is a great way to start