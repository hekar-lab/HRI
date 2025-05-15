---
id: 'ACDFEARXT'
title: The Way of the Arxiv
date: '2025-05-15T12:58:22'
author: Admin Joe
layout: article
---

The Archives are the very essence of the H.R.I. They are embodiment of our hard labor.  
It goes without such an important part or our organization deserves only the best
treatement. As such we've use a brand new technology to implement our Archive Search
System (or ASS) named ACId. ACId, or Article Comprehensive Id, is the modern way to
categories, class and search articles.  
Such a perfect and complete system is of course a bit difficult to get used to at
first. But once you get the hang of it, its qualities are simply too great to use
any other option.

So, here's a quick and simple introduction to familiarize yourself with the ASS.

## The ACId System

An ACId is, as the name implies, an article identifier. It's composed of 9 letters
that can be split into 5 groups. The groups are as follows:

### Team ID

The 1st letter is the team ID. For example, for this article the first letter of
the ACId is "A" which is the ID of the Administration team.  
As of writting there are 5 team IDs:

- A: The Administration
- H: Hazard Unit
- S: Silicon Laboratory
- T: Theorical Department
- X: Unknown/Any

### Year and Day

The 2nd and 3rd letters and the 4th and 5th are used to represent the year and day
of the creation. They both are numerical values represented in
[base-26](https://en.wikipedia.org/wiki/Bijective_numeration#The_bijective_base-26_system).
The value used are the number of year since 1970 for the year value. And the number of day
since the since Jan. 1 of the current year for the day value.  
These choices allow for a compact yet very intuitive notation.

### ID

The 6th to 8th letters are custom to each article. They are chosen by the author
of the article -- often based on the title. Their main purpose is to avoid the 
unlikely case of collision between article ACIds.

### Checkletter

The last letter is a checkletter made by using the
[Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_mod_N_algorithm).
It's used to verify that the ACId is correct.

## Use the ASS

Once you're familiar with how the ACId works using the ASS becomes a trivial task.

In the Archives, you can either type an entire ACId to find a specific article or
type only parts of an ACId to find articles with the same characteristics. For example
you can fill only the 2nd and 3rd letters to find articles from the same year.  
The ASS will then retrieve a box full of the relevant articles and you'll just have
to scour through them to find one that piques your interest.

And, that's it! Easy as pie isn't it?

