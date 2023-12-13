package engine

import (
	"strings"
	"testing"
)

func TestParseSchematic(t *testing.T) {
}

// TestProcess Day 1
func TestProcessDay1(t *testing.T) {
	input := []string{
		"467..114..",
		"...*......",
		"..35..633.",
		"......#...",
		"617*......",
		".....+.58.",
		"..592.....",
		"......755.",
		"...$.*....",
		".664.598..",
	}
	// convert input to sting using strings.Join
	partNumbers, symbols := ParseSchematic(strings.Join(input, "\n"))
	result := Process(partNumbers, symbols)
	expectedResult := 4361
	if result != expectedResult {
		t.Errorf("Expected result: %d, but got %d", expectedResult, result)
	}
}

// TestProcess Day 2
func TestProcessDay2(t *testing.T) {
	input := []string{
		"467..114..",
		"...*......",
		"..35..633.",
		"......#...",
		"617*......",
		".....+.58.",
		"..592.....",
		"......755.",
		"...$.*....",
		".664.598..",
	}
	partNumbers, symbols := ParseSchematic(strings.Join(input, "\n"))
	result := Process2(partNumbers, symbols)
	expectedResult := 467835
	if result != expectedResult {
		t.Errorf("Expected result: %d, but got %d", expectedResult, result)
	}
}
