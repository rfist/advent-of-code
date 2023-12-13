#!/bin/bash

# Prompt for language
read -p "Enter language (default: go): " language
language=${language:-go}

# Prompt for year
read -p "Enter year (default: 2023): " year
year=${year:-2023}

# Prompt for day
read -p "Enter day (default: use the last existing day number + 1): " day

# Check if day is empty
if [ -z "$day" ]; then
    # If day is empty, calculate last_day + 1
    last_day=$(find "$year" -maxdepth 1 -type d -name "Day_*" | grep -o 'Day_[0-9]\+'  | grep -o '[0-9]\+' | sort -n | tail -n 1)
    last_day=${last_day:-0}
    ((day=1+last_day))
fi

# Confirmation prompt
read -p "Will be created template for day $day. Continue? (y/n): " confirmation

# Check the user's response
if [ -z "$confirmation" ] || [ "$confirmation" = "y" ] || [ "$confirmation" = "Y" ]; then
    echo "Creating template for day $day..."
else
    echo "Template creation aborted."
    exit 1
fi

# Create folder for the template
template_folder="$year/Day_$(printf "%02d" "$day")/$language"
mkdir -p "$template_folder"

# Create main.go file
main_file="$template_folder/main.go"
cat > "$main_file" <<EOL
package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	if content, err := os.ReadFile("input.txt"); err == nil {
		// Part 1
		result := ""
		fmt.Printf("Part 1 result = %s \n", result)

		// Part 2
		result2 := ""
		fmt.Printf("Part 2 result = %s \n", result2)
	} else {
		log.Fatal(err)
	}
}
EOL

# Create go.mod file
mod_file="$template_folder/go.mod"
cat > "$mod_file" <<EOL
module aoc$year/day$day

go 1.21.4
EOL

echo "Template generated successfully in $template_folder."

# Create input.txt file
input_file="$template_folder/input.txt"
touch "$input_file"

