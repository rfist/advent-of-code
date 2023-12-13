package engine

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

type PartNumber struct {
	Value          int
	X              int
	Y              int
	HasAdjustments bool
}

func (s *PartNumber) CheckAdjustments(symbols []Symbol) {
	s.HasAdjustments = false
	for _, symbol := range symbols {
		if math.Abs(float64(s.Y-symbol.Y)) <= 1 {
			if symbol.X+1 >= s.X && symbol.X <= s.X+len(strconv.Itoa(s.Value)) {
				s.HasAdjustments = true
			}
		}
	}
}

func (s *PartNumber) TestAdjustments(symbols []Symbol) bool {
	hasAdjustments := false
	for _, symbol := range symbols {
		if math.Abs(float64(s.Y-symbol.Y)) <= 1 {
			if symbol.X+1 >= s.X && symbol.X <= s.X+len(strconv.Itoa(s.Value)) {
				hasAdjustments = true
			}
		}
	}
	return hasAdjustments
}

type Symbol struct {
	Value rune
	X     int
	Y     int
}

func (s *Symbol) IsGear() bool {
	return s.Value == '*'
}

func ParseSchematic(s string) (partNumbers []PartNumber, symbols []Symbol) {
	for y, line := range strings.Split(s, "\n") {
		x := 0 // Track the current x position

		for i := 0; i < len(line); i++ {
			char := rune(line[i])

			if isDigit(char) {
				// Check if the next character is also a digit
				valueStr := string(char)
				for i+1 < len(line) && isDigit(rune(line[i+1])) {
					i++
					valueStr += string(line[i])
				}

				value, err := strconv.Atoi(valueStr)
				if err != nil {
					fmt.Printf("Error converting %s to integer: %v\n", valueStr, err)
					continue
				}

				partNumber := PartNumber{
					Value: value,
					X:     x,
					Y:     y,
				}
				partNumbers = append(partNumbers, partNumber)
				x += len(valueStr) - 1
			} else if !isWhitespace(char) {
				symbol := Symbol{
					Value: char,
					X:     x,
					Y:     y,
				}
				symbols = append(symbols, symbol)
			}

			x++
		}
	}
	return partNumbers, symbols
}

func isDigit(char rune) bool {
	return char >= '0' && char <= '9'
}

func isWhitespace(char rune) bool {
	return char == ' ' || char == '.' || char == '\t' || char == '\n'
}

func Process(partNumbers []PartNumber, symbols []Symbol) (totalSum int) {
	for _, partNumber := range partNumbers {
		partNumber.CheckAdjustments(symbols)
		if partNumber.HasAdjustments {
			totalSum += partNumber.Value
		}
	}
	return
}

func Process2(partNumbers []PartNumber, symbols []Symbol) (totalSum int) {
	for _, symbol := range symbols {
		if symbol.IsGear() {
			// create array of two PartNumbers
			adjustedPartNumbers := []PartNumber{}
			for _, partNumber := range partNumbers {
				if partNumber.TestAdjustments([]Symbol{symbol}) {
					adjustedPartNumbers = append(adjustedPartNumbers, partNumber)
				}
			}
			if len(adjustedPartNumbers) == 2 {
				totalSum += adjustedPartNumbers[0].Value * adjustedPartNumbers[1].Value
			}
		}
	}
	return
}
