package main

import (
	"testing"
)

func TestCalculateProcess(t *testing.T) {
	var result int
	result = calculateSurface("2x3x4")
	if result != 58 {
		t.Error("Expected 58, got ", result)
	}
		result = calculateSurface("1x1x10")
	if result != 43 {
		t.Error("Expected 43, got ", result)
	}

}
