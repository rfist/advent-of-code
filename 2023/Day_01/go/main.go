package main

import (
	"aoc23/day1/calibrator"
	"fmt"
	"github.com/samber/lo"
	"log"
	"os"
)

func main() {
	if content, err := os.ReadFile("input.txt"); err == nil {
		calibrators := calibrator.NewCalibrators(string(content))
		sumCalibrators := lo.Sum(calibrators)
		fmt.Printf("Part 1 result = %d \n", sumCalibrators) // 53386

		// Part 2
		withSpelling := calibrator.NewCalibratorsWithSpelling(string(content))
		sumSpelledCalibrators := lo.Sum(withSpelling)
		fmt.Printf("Part 2 result = %d \n", sumSpelledCalibrators) // 53312
	} else {
		log.Fatal(err)
	}
}
