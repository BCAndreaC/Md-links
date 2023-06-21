# Markdown Links

## Índice

* [1. Description ](#1-Description)
* [2. Features ](#2-Features)
* [3. Installation ](#3-Installation)
* [4. Usage ](#4-Usage)
* [5. Contact](#5-Contact)

***

## 1. Description

This project is a command-line tool (CLI) designed to read .md (Markdown) files and validate the URL links contained within the files. It provides additional options to validate and obtain statistics about the found links.

## 2. Features

- Reads .md files and extracts URL links contained within them.
- Allows validating the obtained links to verify their availability and status.
- Provides command-line options (--validate and --stats) to validate and obtain statistics about the found links.

## 3. Installation

Make sure you have Node.js installed on your system. Then, you can install the package using the following command:

npm install md-links-andysapples

## 4. Usage

Run the command-line tool by providing the path to a file or directory containing .md files. You can then add the additional options as needed:

md-links path/to/file-or-directory [--validate] [--stats]

path/to/file-or-directory: The path to the file or directory you want to analyze.

--validate: Option to validate the found links. It will check the status and availability of each link.

--stats: Option to get statistics about the found links. It will display the total link count and unique link count.

--stats --validate: Option to get statistics about the found links, including the total link count, unique link count, and broken link count.

## 5. Contact

If you have any questions or comments, please feel free to contact me at

Author: [ Andrea C Bonilla Carreola ]
GitHub Project: [https://github.com/BCAndreaC/Md-links]