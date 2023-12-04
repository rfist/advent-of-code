package game

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

type Set struct {
	Red   int
	Green int
	Blue  int
}

type Game struct {
	ID   int
	Sets []Set
}

func parseGameLine(line string) (Game, error) {
	// Define the regular expression pattern to extract the game ID and sets
	re := regexp.MustCompile(`Game (\d+): (.+)$`)

	// Find matches in the line
	matches := re.FindStringSubmatch(line)

	// Extract game ID
	gameID, err := strconv.Atoi(matches[1])
	if err != nil {
		return Game{}, fmt.Errorf("failed to parse game ID: %v", err)
	}

	// Extract sets
	setsStr := matches[2]
	setStrings := strings.Split(setsStr, ";")
	var sets []Set

	for _, setStr := range setStrings {
		set := Set{}
		rawSets := strings.Split(setStr, ",")

		for _, rawSet := range rawSets {
			colorCountPair := strings.Fields(rawSet)

			color := colorCountPair[1]
			count, err := strconv.Atoi(colorCountPair[0])
			if err != nil {
				return Game{}, fmt.Errorf("failed to parse count in set: %s", setStr)
			}

			switch color {
			case "red":
				set.Red = count
			case "green":
				set.Green = count
			case "blue":
				set.Blue = count
			default:
				return Game{}, fmt.Errorf("unknown color in set: %s", setStr)
			}
		}

		sets = append(sets, set)
	}

	// Create and return the Game struct
	game := Game{
		ID:   gameID,
		Sets: sets,
	}

	return game, nil
}

func NewGames(s string) (result []Game) {
	for _, line := range strings.Split(s, "\n") {
		game, err := parseGameLine(line)
		if err != nil {
			panic(err)
		}
		result = append(result, game)
	}
	return
}

func Process(games []Game, rule Set) (result int) {
	for _, game := range games {
		matched := true
		for _, set := range game.Sets {
			if set.Red > rule.Red || set.Green > rule.Green || set.Blue > rule.Blue {
				matched = false
			}
		}
		if matched {
			result += game.ID
		}
	}
	return
}

func Process2(game Game) (result int) {
	minimumSet := Set{
		Red:   0,
		Green: 0,
		Blue:  0,
	}
	for _, set := range game.Sets {
		if set.Red > minimumSet.Red {
			minimumSet.Red = set.Red
		}
		if set.Green > minimumSet.Green {
			minimumSet.Green = set.Green
		}
		if set.Blue > minimumSet.Blue {
			minimumSet.Blue = set.Blue
		}
	}
	return minimumSet.Red * minimumSet.Green * minimumSet.Blue
}
