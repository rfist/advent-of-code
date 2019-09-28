package main

import (
	"fmt"
	"io/ioutil"
)

func main() {
	input, _ := ioutil.ReadFile("../input.txt")
	result := processPart1(string(input))
	result2 := processPart2(string(input))
	fmt.Println("Santa takes", result, "floor")
	fmt.Println("Santa enters first the basement at", result2, "position")
}

func processPart1(input string) rune {
	var floor rune = 0

	for _, c := range input {
		if c == '(' {
			floor++
		} else {
			floor--
		}

	}
	return floor
}

func processPart2(input string) int {
	floor, position := 0, 0

	for _, c := range input {
		position++
		if c == '(' {
			floor++
		} else {
			floor--
		}
		if floor == -1 {
			break
		}
	}
	return position
}
