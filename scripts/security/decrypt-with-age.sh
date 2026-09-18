#!/usr/bin/env bash
set -euo pipefail

if ! command -v age >/dev/null 2>&1; then
  echo "age is required. Install age first." >&2
  exit 1
fi

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <file.age>" >&2
  exit 1
fi

input_file="$1"
output_file="${input_file%.age}"

age -d -o "$output_file" "$input_file"
echo "Decrypted file written to $output_file"
