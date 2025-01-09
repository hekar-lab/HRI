---
id: TYYDDXXXC
title: Some kind of demo
date: 2025-01-09T07:05:00
author: DrFuk
layout: article
---

googbie :/
ho no  
fef

## Images

{{< hri_fig src="img/GASTON.gif" caption="The sleeper" >}}

{{< hri_fig src="img/kenji.jpg" title="KENJI :)" alt="IT'S keji" caption="The king king kingking king king king king king king king king king king" >}}

## NO

### Mathhhhhhhhhh Mathhhhhhhhhh Mathhhhhhhhhh Mathhhhhhhhhh Mathhhhhhhhhh

#### YEYA

##### HYOE

{{< highlight c >}}
package main

import "fmt"

// calculateSquares calculates the sum of the squares of the digits of the given number
// and sends the result to the squareop channel.
func calculateSquares(number int, squareop chan int) {
	sum := 0
	for number != 0 {
		digit := number % 10
		sum += digit * digit
		number /= 10
	}
	squareop <- sum
}

// calculateCubes calculates the sum of the cubes of the digits of the given number
// and sends the result to the cubeop channel.
func calculateCubes(number int, cubeop chan int) {
	sum := 0
	for number != 0 {
		digit := number % 10
		sum += digit * digit * digit
		number /= 10
	}
	cubeop <- sum
}

func main() {
	number := 589
	sqrch := make(chan int)
	cubech := make(chan int)

	// Start two goroutines to calculate the sum of squares and cubes of the digits.
	go calculateSquares(number, sqrch)
	go calculateCubes(number, cubech)

	// Receive the results from the channels and add them.
	squares, cubes := <-sqrch, <-cubech
	fmt.Println("Final result", squares+cubes)
}
{{< /highlight >}}

###### GG

## A

### a

### h

### i

## B

{{< pixeltex lines="5" caption="man" >}}
OH NO
NOT ME
{{< /pixeltex >}}

{{< pixeltex >}}
what's happening ...


\sqrt{3\left(\frac{\frac{a}{\left(\theta+\overline{\omega}\right)x_n}}{\log{b}}\right)^2_i}=4\sum_{i=0}^{n}(u_i\cdotv_i)+\int_1^3x\dx-\left(\lim_{n\rightarrow\infty}\frac{\overline{\gamma\xi}}{n^{-2}}\right)
{{< /pixeltex >}}
