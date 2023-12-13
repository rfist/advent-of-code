package main

import (
	"aoc2023/day3/engine"
	"fmt"
	"log"
	"os"
)

func main() {
	if content, err := os.ReadFile("input.txt"); err == nil {
		partNumbers, symbols := engine.ParseSchematic(string(content))
		// Part 1
		result := engine.Process(partNumbers, symbols)
		fmt.Printf("Part 1 result = %d \n", result) // 550064

		// Part 2
		result2 := engine.Process2(partNumbers, symbols)
		fmt.Printf("Part 2 result = %d \n", result2) // 850104615
	} else {
		log.Fatal(err)
	}
}
