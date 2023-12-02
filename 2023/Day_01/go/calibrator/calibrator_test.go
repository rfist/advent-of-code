package calibrator

import "testing"

// TestProcess Day 1
func TestProcessDay1(t *testing.T) {
	testCases := []struct {
		input  string
		output int
	}{
		{"1abc2", 12},
		{"pqr3stu8vwx", 38},
		{"a1b2c3d4e5f", 15},
		{"treb7uchet", 77},
		{"5seveneighteightzzbnzsvdjnkvndsxlttfour", 54},
		// Add more test cases as needed
	}

	for _, tc := range testCases {
		result, err := FindCalibrationValue(tc.input)
		if err != nil || result != tc.output {
			t.Errorf("Expected %d for input '%s', got %d", tc.output, tc.input, result)
		}
	}
}

// TestProcess Day 2
func TestProcessDay2(t *testing.T) {
	testCases := []struct {
		input  string
		output int
	}{
		{"two1nine", 29},
		{"eightwothree", 83},
		{"abcone2threexyz", 13},
		{"xtwone3four", 24},
		{"4nineeightseven2", 42},
		{"zoneight234", 14},
		{"7pqrstsixteen", 76},
		{"5dsxngmpdvjhnlbhxmp7xqqtgdoneightdvm", 58},
		{"djbcgrrtqdshpqqzj43rgcr", 43},
		// Add more test cases as needed
	}

	for _, tc := range testCases {
		result, err := FindCalibrationValue(ReplaceFirstAndLastSpelledOutDigits(tc.input))
		if err != nil || result != tc.output {
			t.Errorf("Expected %d for input '%s', got %d", tc.output, tc.input, result)
		}
	}
}
