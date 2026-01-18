---
id: 'TCEARBINX'
title: We should learn finger binary
date: '2026-01-18T15:23:39'
author: Pr. Bernard Shannon
layout: article
draft: false
---

There has been a lot of talk about what base we should count in[^b12][^b6][^b2].
The most compelling case so far in my opinion has been made by 
[the best way to count](https://www.youtube.com/@thebestwaytocount) in their
video [the best way to count](https://youtu.be/rDDaEVcwIJM). Though a bit on the
nose title-wise, they make a great case for the use of binary.  
Indeed binary is simple. The simplest base in fact. When it comes to arithmetics,
binary is notoriously known for making calculation almost trivial.

[^b12]: [Base 12 by Numberphile](https://youtu.be/qID2B4MK7Y0)
[^b6]: [a better way to count by jan Misali](https://youtu.be/U6xJfP7-HCc)
[^b2]: [the best way to count by the best way to count](https://youtu.be/rDDaEVcwIJM)

That's great on paper but there is a major issue with changing our way to count
to any other base: change is hard. Most people won't change their ways of doing
stuff -- like the old adage says: "if it ain't broke: don't fix it".  
But all is not lost. There are among us people willing ot learn and change their
ways: children. But to teach them we have to starts with the basics. Counting 
seems like as great way to start.

## Counting in general

Counting is the process of going from one number to the next. To do so we increment
the number by one. In this process we first set the unit digit to the next digit
of the base (e.g. from 4 to 5), unless it is the last digit of our base 
(i.e. 9 in base 10). In which case the units "rolls over", meaning it goes to the
lowest digit of the base (i.e. 0 in base 10), and we increase the next digit (usually
to the left) following the same operations.  
For example to go from 99 to 100 in base 10, the unit 9 is increased which rolls over 
which in turn increases the next 9 which also rolls over. This, in turn, increases the next
digit from 0 to 1 -- as there is an infinity of 0s to the left of the number they
are made implicit.  
Counting like this has the neat consequence that the next digit in a number represent
a quantity *b* times greater than the previous one where *b* is the base. In other
words, the first digit (i.e. unit) represents a quantity of itself times 1, then the next 
one of itself times *b*, the next itself times *b²*, then *b³*, etc.

## Counting in binary

This process of counting is thus applicable to base 2 otherwise known as binary.
In binary, the digits are often represented by 0 and 1 -- though it could be any 
2 symbols, we just use those because of the convention of base 10.  
{{< figref count-bin >}} 
Shows and example of how to count in binary.

{{% figtxt caption="Count from 0 to 8 in binary" id="count-bin" %}}
╔════════════════╗ 
║                ║ 
║       0 (0)    ║ 
║       1 (1)    ║ 
║      10 (2)    ║ 
║      11 (3)    ║ 
║     100 (4)    ║ 
║     101 (5)    ║ 
║     110 (6)    ║ 
║     111 (7)    ║ 
║    1000 (8)    ║ 
║                ║ 
╚╤═══════════════╝ 
{{% /figtxt %}}

Same consequence as before each digit (or bit) represent a quantity of power of 2.
But as digit are either 0 or 1, each bit indicate the presence or absence of this
power of 2 from the total. for example 5 in binary is 101, which is 
*1 * 2² + 0 * 2¹ + 1 * 2⁰* which when simplified is *2² + 2⁰* or *4 + 1* -- indeed equal to 5.

## Finger binary

To help children count to 10, we teach them to use their hands. The quantity of
finger raised is equal to the number. We can use the same trick to teach binary.
The idea is that each finger represents a bit, when down it's a 0 when raised it's 
a 1.  
{{< figref finger-bits >}} shows the value of the finger for just one hand
finger binary.

{{% figtxt caption="Finger binary values" id="finger-bits" %}}
╔══════════════════════════════════════╗
║╭──────┬─────┬────┬──────┬─────┬─────╮║
║│finger│pinky│ring│middle│index│thumb│║
║├──────┼─────┼────┼──────┼─────┼─────┤║
║│power │  2⁴ │ 2³ │  2²  │  2¹ │  2⁰ │║
║├──────┼─────┼────┼──────┼─────┼─────┤║
║│value │ 16  │ 8  │  4   │  2  │  1  │║
║╰──────┴─────┴────┴──────┴─────┴─────╯║
╚╤═════════════════════════════════════╝
{{% /figtxt %}}

We can see that with only one hand it's possible to count to 31 (*16 + 8 + 4 + 2  + 1*)
-- if one uses both hands it could go up to 1023!  
{{< figref fingers0 >}} to {{< figref fingers4 >}} 
show how to count from 0 to 4 with finger binary.

{{% fig src="res/f0.jpg" caption="0 in finger binary" id="fingers0" %}}

{{% fig src="res/f1.jpg" caption="1 in finger binary" id="fingers1" %}}

{{% fig src="res/f2.jpg" caption="2 in finger binary" id="fingers2" %}}

{{% fig src="res/f3.jpg" caption="3 in finger binary" id="fingers3" %}}

{{% fig src="res/f4.jpg" caption="4 in finger binary" id="fingers4" %}}

Oh that's\... really unfortunate.  

You know what? Forget about it. Base 10 is alright.