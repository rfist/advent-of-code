package main

import "testing"

func TestProcess(t *testing.T) {
	input := []int{1721, 979, 366, 299, 675, 1456}
	result := processPart1(input)
	if result != 514579 {
		t.Error("Expected 514579, got ", result)
	}
}
