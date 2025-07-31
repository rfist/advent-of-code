#!/bin/bash
# - [ ] add logo
# - [ ] during creation of a new solution, in the root folder $year/$day should be created input.txt and Readme.md
#  * https://adventofcode.com/2015/events

# Reusable menu selection function
menu_select() {
  local title="$1"
  shift
  local options=("$@")
  local selected=0
  local key

  while true; do
    clear
    echo "$title (↑/↓ or j/k, Enter or l to select):"
    for i in "${!options[@]}"; do
      if [[ $i == $selected ]]; then
        tput rev
        echo "  ${options[$i]}  "
        tput sgr0
      else
        echo "  ${options[$i]}  "
      fi
    done

    IFS= read -rsn1 key
    case "$key" in
    $'\x1b')
      read -rsn2 -t 0.1 rest
      key+=$rest
      case "$key" in
      $'\x1b[A') ((selected--)) ;;
      $'\x1b[B') ((selected++)) ;;
      esac
      ;;
    j) ((selected++)) ;;
    k) ((selected--)) ;;
    "") return $selected ;;
    l) return $selected ;;
    esac

    ((selected < 0)) && selected=0
    ((selected >= ${#options[@]})) && selected=$((${#options[@]} - 1))
  done
}

# Create solution folder and copy template
createSolution() {
  local year="$1"
  local day="$2"
  local language="$3"
  local day_padded=$(printf "%02d" "$day")
  local dir="$year/Day_$day_padded/$language"

  mkdir -p "$dir"

  # Copy template files
  cp -r "./templates/$language/." "$dir"

  # Replace placeholders in all copied files
  find "$dir" -type f -exec sed -i "s/\$year/$year/g; s/\$day/$day/g" {} +

  echo "Created: $dir using $language template"
}

# Main menu logic
main_menu() {
  local main_options=("new" "open" "generate statistics" "exit")
  menu_select "Main Menu" "${main_options[@]}"
  local choice=$?
  local cmd="${main_options[$choice]}"

  case "$cmd" in
  new)
    local years=($(seq 2015 2024))
    menu_select "Select Year" "${years[@]}"
    local year="${years[$?]}"

    local days=($(seq 1 25))
    menu_select "Select Day" "${days[@]}"
    local day="${days[$?]}"

    # Detect languages from /templates subdirectories
    local languages=()
    for lang_dir in ./templates/*; do
      [[ -d $lang_dir ]] && languages+=("$(basename "$lang_dir")")
    done

    if [[ ${#languages[@]} -eq 0 ]]; then
      echo "No templates found in ./templates"
      exit 1
    fi

    menu_select "Select Language" "${languages[@]}"
    local language="${languages[$?]}"

    createSolution "$year" "$day" "$language"
    ;;
  open)
    echo "You chose open"
    ;;
  "generate statistics")
    if [[ -x ./generate_overview.sh ]]; then
      ./generate_overview.sh
    else
      echo "generate_overview.sh not found or not executable"
      read -rp "Press enter to return to menu..."
    fi
    ;;
  exit)
    exit 0
    ;;
  esac
}

# Start the program
main_menu
