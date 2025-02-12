const fs = require('fs')

const Config = require('./config')

class LootLogger {
  constructor() {
    this.stream = null
    this.logFileName = null

    this.createNewLogFileName()
  }

  init() {
    if (this.stream != null) {
      this.stream.close()
    }

    this.stream = fs.createWriteStream(this.logFileName, { flags: 'a' })

    const header = [
      'timestamp_utc',
      'looted_by__alliance',
      'looted_by__guild',
      'looted_by__name',
      'item_id',
      'item_name',
      'quantity',
      'looted_from__alliance',
      'looted_from__guild',
      'looted_from__name'
    ].join(';')

    this.stream.write(header + '\n')

    process.on('exit', () => {
      this.close()
    })
  }

  createNewLogFileName() {
    const d = new Date()

    this.logFileName = `loot-events-${d.getDate()}-${
      d.getMonth() + 1
    }-${d.getFullYear()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}.txt`
  }

  write({ date, itemId, quantity, itemName, lootedBy, lootedFrom }) {
    if (this.stream == null) {
      this.init()
    }

    if (Config.players[lootedBy.playerName.toLowerCase()]) {
      return
    }

    const line = [
      date.toISOString(),
      lootedBy.allianceName ?? '',
      lootedBy.guildName ?? '',
      lootedBy.playerName,
      itemId,
      itemName,
      quantity,
      lootedFrom.allianceName ?? '',
      lootedFrom.guildName ?? '',
      lootedFrom.playerName
    ].join(';')

    this.stream.write(line + '\n')
  }

  close() {
    if (this.stream != null) {
      this.stream.close()
    }

    this.stream = null
  }
}

module.exports = new LootLogger()
