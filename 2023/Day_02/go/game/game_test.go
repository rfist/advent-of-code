package game

import (
	"reflect"
	"testing"
)

func TestParseGameLine(t *testing.T) {
	input := "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
	expected := Game{
		ID: 1,
		Sets: []Set{
			{Red: 4, Green: 0, Blue: 3},
			{Red: 1, Green: 2, Blue: 6},
			{Red: 0, Green: 2, Blue: 0},
		},
	}

	result, err := parseGameLine(input)
	if err != nil {
		t.Fatalf("Error parsing game line: %v", err)
	}

	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Parsed result does not match expected result.\nExpected: %+v\nGot: %+v", expected, result)
	}
}

// TestProcess Day 1
func TestProcessDay1(t *testing.T) {
	rule := Set{
		Red:   12,
		Green: 13,
		Blue:  14,
	}
	game1, _ := parseGameLine("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")
	game2, _ := parseGameLine("Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue")
	game3, _ := parseGameLine("Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red")
	game4, _ := parseGameLine("Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red")
	game5, _ := parseGameLine("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green")
	games := []Game{game1, game2, game3, game4, game5}

	result := Process(games, rule)

	expectedResult := 8
	if result != expectedResult {
		t.Errorf("Expected result: %d, but got %d", expectedResult, result)
	}
}

// TestProcess Day 2
func TestProcessDay2(t *testing.T) {
	testCases := []struct {
		input  string
		output int
	}{
		{"Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", 48},
		{"Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue", 12},
		{"Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red", 1560},
		{"Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red", 630},
		{"Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green", 36},
	}
	for _, tc := range testCases {
		game, _ := parseGameLine(tc.input)
		result := Process2(game)
		if result != tc.output {
			t.Errorf("Expected %d for input '%s', got %d", tc.output, tc.input, result)
		}
	}
}
