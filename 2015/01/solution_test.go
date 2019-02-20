package main

import (
	"testing"
)

func TestProcess(t *testing.T) {
	var result rune

	result = process("(()(()(")
	if result != 3 {
		t.Error("Epexted 3, got ", result)
	}

	result = process("))(")
	if result != -1 {
		t.Error("Epexted -1, got ", result)
	}
}
