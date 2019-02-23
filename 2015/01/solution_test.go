package main

import (
	"testing"
)

func TestProcess(t *testing.T) {
	var result rune

	result = process("(()(()(")
	if result != 3 {
		t.Error("Expected 3, got ", result)
	}

	result = process("))(")
	if result != -1 {
		t.Error("Expected -1, got ", result)
	}

	result2 := process2(")")
	if result2 != 1 {
		t.Error("Expected 1, got ", result)
	}

	result2 = process2("()())")
	if result2 != 5 {
		t.Error("Expected 5, got ", result)
	}

}
