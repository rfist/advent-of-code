// /usr/bin/true; exec /usr/bin/env go run "$0" "$@"
package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.ReadFile("../input.txt")
	inputs := strings.Split(string(input), "\n")
	result := processPart1(inputs)
	result2 := processPart2(inputs)
	// Part1
	fmt.Printf("Part 1 result = %d \n", result)

	// Part 2
	fmt.Printf("Part 2 result = %d \n", result2)
}

func processPart1(inputs []string) (total int) {
	total = 0
	for _, input := range inputs {
		parts := strings.Split(input, "x")
		if len(parts) != 3 {
			continue
		}
		w, _ := strconv.Atoi(parts[0])
		h, _ := strconv.Atoi(parts[1])
		l, _ := strconv.Atoi(parts[2])
		areas := []int{w * h, h * l, w * l}
		minArea := areas[0]
		for _, area := range areas {
			total += 2 * area
			if area < minArea {
				minArea = area
			}
		}
		total += minArea
	}
	return
}

func processPart2(inputs []string) (total int) {
	total = 0
	for _, input := range inputs {
		parts := strings.Split(input, "x")
		if len(parts) != 3 {
			continue
		}
		dims := make([]int, 3)
		for i, p := range parts {
			dims[i], _ = strconv.Atoi(p)
		}
		sort.Ints(dims)
		a, b, c := dims[0], dims[1], dims[2]
		total += 2*a + 2*b + (a * b * c)
	}
	return
}
