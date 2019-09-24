package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
)

func main() {
	args := os.Args
	fmt.Println("args", args[1])
	// absPath, _ := filepath.Abs("./2015/01/input.txt")
	absPath, _ := filepath.Abs(args[1])
	fmt.Println("path", absPath)
	b, _ := ioutil.ReadFile(absPath)
	result := process(string(b))
	result2 := process2(string(b))
	fmt.Println("Santa takes", result, "floor")
	fmt.Println("Santa enters first the basement at", result2, "position")
}

func process(input string) rune {
	var floor rune = 0

	for _, c := range input {
		if c == '(' {
			floor += 1
		} else {
			floor -= 1
		}

	}
	return floor
}

func process2(input string) int {
	floor, position := 0, 0

	for _, c := range input {
		position++
		if c == '(' {
			floor += 1
		} else {
			floor -= 1
		}
		if floor == -1 {
			break
		}
	}
	return position
}
