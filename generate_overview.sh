#!/usr/bin/env bash
set -euo pipefail
shopt -s globstar nullglob

OUTPUT="Overview.md"
EXTENSIONS=(go ts py rs js java cpp cs kt)
declare -A ext_to_lang=(["go"]="Golang" ["ts"]="TypeScript" ["py"]="Python" ["rs"]="Rust" ["js"]="JavaScript" ["java"]="Java" ["cpp"]="C++" ["cs"]="C#" ["kt"]="Kotlin")

echo -n "" >"$OUTPUT"

for year in 20*/; do
  [[ -d "$year" ]] || continue
  year=${year%/}
  echo "# $year" >>"$OUTPUT"
  echo "" >>"$OUTPUT"

  declare -A day_names=()
  declare -A links=()
  declare -A langs=()
  declare -A files=()

  days=("$year"/Day_*)
  for day_path in "${days[@]}"; do
    day_name=$(basename "$day_path")
    day_number=${day_name#Day_}
    day_key="$year.$day_number"
    readme="$day_path/Readme.md"
    if [[ -f "$readme" ]]; then
      title=$(grep -m1 '^#' "$readme" | sed 's/^# *//')
      [[ -z "$title" ]] && title="Unknown"
    else
      title="Unknown"
    fi
    day_names["$day_key"]="$title"
    links["$day_key"]="$readme"

    for lang_path in "$day_path"/*/; do
      [[ -d "$lang_path" ]] || continue
      lang_folder=$(basename "$lang_path")
      for ext in "${EXTENSIONS[@]}"; do
        files_found=("$lang_path"/*."$ext")
        for file in "${files_found[@]}"; do
          fname=$(basename "$file")
          if [[ -f "$file" && "$fname" != *test* ]]; then
            lang="${ext_to_lang[$ext]}"
            [[ -n "$lang" ]] || continue
            langs["$lang"]=1
            files["$day_key.$lang"]="$file"
            break 2
          fi
        done
      done
    done
  done

  # Build header
  echo -n "|  Day  | Name " >>"$OUTPUT"
  for lang in "${!langs[@]}"; do
    echo -n "| $lang " >>"$OUTPUT"
  done
  echo "|" >>"$OUTPUT"

  echo -n "|:-----:|------" >>"$OUTPUT"
  for lang in "${!langs[@]}"; do
    echo -n "|:-----:" >>"$OUTPUT"
  done
  echo "|" >>"$OUTPUT"

  # Sort day keys like 2015.01, 2015.02...
  sorted_keys=($(printf "%s\n" "${!day_names[@]}" | sort -t. -k1,1n -k2,2n))

  for key in "${sorted_keys[@]}"; do
    day="${key#*.}"
    echo -n "| $day | [${day_names[$key]}][$key] " >>"$OUTPUT"
    for lang in "${!langs[@]}"; do
      if [[ -n "${files[$key.$lang]:-}" ]]; then
        lid="${key}.${lang}"
        echo -n "| [:star:][$lid] " >>"$OUTPUT"
      else
        echo -n "| " >>"$OUTPUT"
      fi
    done
    echo "|" >>"$OUTPUT"
  done

  echo "" >>"$OUTPUT"

  # Footnotes
  for key in "${!day_names[@]}"; do
    echo "[$key]: ./${year}/Day_${key#*.}/Readme.md" >>"$OUTPUT"
    for lang in "${!langs[@]}"; do
      lid="${key}.${lang}"
      if [[ -n "${files[$key.$lang]:-}" ]]; then
        relpath="${files[$key.$lang]}"
        echo "[$lid]: ./${relpath}" >>"$OUTPUT"
      fi
    done
  done

  echo "" >>"$OUTPUT"
done
