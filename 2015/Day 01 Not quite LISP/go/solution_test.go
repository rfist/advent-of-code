package main

import (
	"testing"
)

// TestProcess Day 1
func TestProcess(t *testing.T) {
	var result rune

	result = processPart1("(()(()(")
	if result != 3 {
		t.Error("Expected 3, got ", result)
	}

	result = processPart1("))(")
	if result != -1 {
		t.Error("Expected -1, got ", result)
	}

	result2 := processPart2(")")
	if result2 != 1 {
		t.Error("Expected 1, got ", result)
	}

	result2 = processPart2("()())")
	if result2 != 5 {
		t.Error("Expected 5, got ", result)
	}

}
