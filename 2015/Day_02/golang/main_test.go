package main

import "testing"

func TestProcess(t *testing.T) {
	var result int
	result = processPart1([]string{"2x3x4"})
	if result != 58 {
		t.Error("Expected 58, got ", result)
	}
	result = processPart1([]string{"1x1x10"})
	if result != 43 {
		t.Error("Expected 43, got ", result)
	}
}

func TestProcessPart2(t *testing.T) {
	var result int
	result = processPart2([]string{"2x3x4"})
	if result != 34 {
		t.Error("Expected 34, got ", result)
	}
	result = processPart2([]string{"1x1x10"})
	if result != 14 {
		t.Error("Expected 14, got ", result)
	}
}
