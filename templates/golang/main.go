// /usr/bin/true; exec /usr/bin/env go run "$0" "$@"
package main

import (
	"fmt"
	"os"
)

func main() {
	input, _ := os.ReadFile("../input.txt")
	anwser := 1
	// Part1
	fmt.Printf("Part 1 result = %d \n", anwser)

	// Part 2
	fmt.Printf("Part 2 result = %d \n", anwser)
}

func processPart1(input []int) (result int) {
	result = 0
	for _, sum1 := range input {
		result += sum1
	}
	return
}
