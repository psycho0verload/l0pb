#!/bin/bash
# Author: Jonathan Starck (jonathan@starck.info)
# check_permissions.sh (c) 2024
# Desc: description
# Created:  2024-06-07T09:41:16.380Z
# Modified: 2024-06-07T09:45:55.099Z

# Funktion zur Anzeige der Hilfe
usage() {
  echo "Usage: $0 -p <directory_path>"
  exit 1
}

# Parameter verarbeiten
while getopts ":p:" opt; do
  case $opt in
    p)
      DIRECTORY=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      usage
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      usage
      ;;
  esac
done

# Prüfen, ob der Parameter gesetzt wurde
if [ -z "$DIRECTORY" ]; then
  echo "Directory path is required."
  usage
fi

# Prüfen, ob das Verzeichnis existiert
if [ ! -d "$DIRECTORY" ]; then
  echo "Directory $DIRECTORY does not exist."
  exit 1
fi

# Liste der zu überprüfenden Dateien
FILES=("key.pem" "cert.pem")

# Dateien überprüfen
for FILE in "${FILES[@]}"; do
  FILE_PATH="$DIRECTORY/$FILE"
  
  if [ -f "$FILE_PATH" ]; then
    # Berechtigungen der Datei abrufen
    PERMISSIONS=$(stat -c "%a" "$FILE_PATH")

    # Prüfen, ob die Berechtigungen nicht 644 sind
    if [ "$PERMISSIONS" -ne 644 ]; then
      # Berechtigungen auf 644 setzen
      chmod 644 "$FILE_PATH"
      echo "Berechtigungen von $FILE_PATH wurden auf 644 gesetzt."
    fi
  else
    echo "Datei $FILE_PATH existiert nicht."
  fi
done