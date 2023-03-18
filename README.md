[![Download AO Loot Logger](https://img.shields.io/badge/AO%20Loot%20Logger-Download-blue)](https://github.com/matheussampaio/ao-loot-logger/releases/latest)
[![Discord](https://img.shields.io/badge/discord-join-blue)](https://discord.gg/fvNMF2abXr)

# Might Checker 

Uses the networking/decoding code to check might gains by each member in your guild. It does not know the list of guild members, so any members who have 
accumulated 0 might will not show up. 

It creates a file called `might.txt`. Run the program and open the Season Overview tab. Scroll through each Might list. The console will print the number of 
unique members currently logged for each category. Make sure that number matches the total number of contributors to that category in game. The result is a 
csv file that is pretty self explanatory.

# Albion Online Loot Logger

With AO Loot Logger you can write all the loot grabbed by other players to a file. With this file, you can use [Loot Logger Viewer](https://matheus.sampaio.us/ao-loot-logger-viewer) to analyze it.

**NOTE:** It does not work with a VPN (i.e. Exit Lag) or playing through Geforce Now.

## Discord

Join the discord server for questions and help: https://discord.gg/fvNMF2abXr


## Funding

You can always [buy me a coffee](https://www.buymeacoffee.com/MatheusSampaio) or [sponsor me](https://github.com/sponsors/matheussampaio). ❤️

## How to Use (Windows)

1. Install [Npcap with WinPcap compatibility](https://nmap.org/npcap).
1. Download the latest AO Loot Logger for Windows: https://github.com/matheussampaio/ao-loot-logger/releases/latest
1. Execute `ao-loot-logger.exe`.
1. The log is written to file in the same folder as the executable (you can see the full path when the AO Loot Logger starts).

## How to Use (Linux)

1. Install `libpcap-dev`: `sudo apt-get install libpcap-dev`.
1. Download the latest AO Loot Logger for Linux: https://github.com/matheussampaio/ao-loot-logger/releases/latest
1. Execute `ao-loot-logger`.
1. The log is written to file in the same folder as the executable (you can see the full path when the AO Loot Logger starts).

## How to run from the code

1. Install [Nodejs](https://nodejs.org/en) v16.
1. If you're on windows, install [Npcap with WinPcap compatibility](https://nmap.org/npcap)
1. If you're on linux, install `libpcap-dev`: `sudo apt-get install libpcap-dev`.
1. In the project's folder, open a terminal and run `npm install` to install all dependencies.
1. In the project's folder, open a terminal and run `npm start`.

## Question?

Start a [discussion](https://github.com/matheussampaio/ao-loot-logger/discussions).

## Found any problem?

Create an [issue](https://github.com/matheussampaio/ao-loot-logger/issues) so we can get it fixed.
