package main

import "testing"

func TestProcess(t *testing.T) {
	input := []int{1, 2}
	result := processPart1(input)
	if result != 3 {
		t.Error("Expected 3, got ", result)
	}
}
