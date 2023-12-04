package main

import (
	"aoc23/day2/game"
	"fmt"
	"github.com/samber/lo"
	"log"
	"os"
)

func main() {
	if content, err := os.ReadFile("input.txt"); err == nil {
		games := game.NewGames(string(content))
		rule := game.Set{
			Red:   12,
			Green: 13,
			Blue:  14,
		}
		result := game.Process(games, rule)
		fmt.Printf("Part 1 result = %d \n", result) // 29135

		// Part 2
		powers := lo.Map(games, func(g game.Game, index int) int {
			return game.Process2(g)
		})
		sumPowers := lo.Sum(powers)
		fmt.Printf("Part 2 result = %d \n", sumPowers) // 53312
	} else {
		log.Fatal(err)
	}
}
