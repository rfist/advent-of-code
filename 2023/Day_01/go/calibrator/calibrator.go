package calibrator

import (
	"fmt"
	"sort"
	"strings"
	"unicode"
)

const ItemSeparator = "\n"

func NewCalibrators(s string) (result []int) {
	for _, record := range strings.Split(s, ItemSeparator) {
		value, _ := FindCalibrationValue(record)
		result = append(result, value)
	}
	return
}

func NewCalibratorsWithSpelling(s string) (result []int) {
	for _, record := range strings.Split(s, ItemSeparator) {
		value, _ := FindCalibrationValue(ReplaceFirstAndLastSpelledOutDigits(record))
		result = append(result, value)
	}
	return
}

func FindCalibrationValue(input string) (int, error) {
	var firstDigit, lastDigit rune
	foundFirstDigit := false

	for _, char := range input {
		if unicode.IsDigit(char) {
			if !foundFirstDigit {
				firstDigit = char
				foundFirstDigit = true
			}
			lastDigit = char
		}
	}

	if !foundFirstDigit {
		return 0, fmt.Errorf("no digits found in the input string")
	}

	// Subtracting the ASCII value of '0' ('0' is 48 in ASCII) from firstDigit gives you the integer value of the digit.
	// For example, if firstDigit is '5', firstDigit-'0' evaluates to 5.
	calibrationValue := int(firstDigit-'0')*10 + int(lastDigit-'0')
	return calibrationValue, nil
}

type Replacement struct {
	OldValue string
	NewValue string
	Position int
}

func ReplaceFirstAndLastSpelledOutDigits(input string) string {
	replacements := map[string]string{
		"one":   "1",
		"two":   "2",
		"three": "3",
		"four":  "4",
		"five":  "5",
		"six":   "6",
		"seven": "7",
		"eight": "8",
		"nine":  "9",
	}

	var allReplacements []Replacement

	for spelledOut, numericValue := range replacements {
		// Find all occurrences of the spelled-out digit
		occurrences := findAllOccurrences(input, spelledOut, numericValue)
		allReplacements = append(allReplacements, occurrences...)
	}
	// sort by positions, last replacements first
	sort.Slice(allReplacements, func(i, j int) bool {
		return allReplacements[i].Position < allReplacements[j].Position
	})

	if len(allReplacements) == 0 {
		return input
	}
	firstReplacement := allReplacements[0]
	lastReplacement := allReplacements[len(allReplacements)-1]
	input = replaceAtIndex(input, lastReplacement.Position, lastReplacement.OldValue, lastReplacement.OldValue+lastReplacement.NewValue)
	input = strings.Replace(input, firstReplacement.OldValue, firstReplacement.NewValue, 1)
	return input
}

// findAllOccurrences returns the indices of all occurrences of a substring in a string.
func findAllOccurrences(s, substr string, newValue string) []Replacement {
	var occurrences []Replacement
	index := strings.Index(s, substr)
	for index != -1 {
		occurrences = append(occurrences, Replacement{
			OldValue: substr,
			NewValue: newValue,
			Position: index,
		})
		originalIndex := index
		index = strings.Index(s[index+len(substr):], substr)
		if index != -1 {
			index += originalIndex
			index += len(substr)
		}
	}
	return occurrences
}

// replaceAtIndex replaces a substring at a specific index in a string.
func replaceAtIndex(s string, index int, old, new string) string {
	return s[:index] + new + s[index+len(old):]
}
