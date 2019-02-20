package main

import (
	"fmt"
	"io/ioutil"
	"path/filepath"
)

func main() {
	absPath, _ := filepath.Abs("./2015/01/input.txt")
	b, _ := ioutil.ReadFile(absPath)
	result := process(string(b))
	fmt.Println("Santa takes", result, "floor")
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
