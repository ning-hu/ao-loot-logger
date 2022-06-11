const MemoryStorage = require('../../storage/memory-storage')
const uuidStringify = require('../../utils/uuid-stringify')
const Logger = require('../../utils/logger')
const ParserError = require('../parser-error')

const EventId = 91

function handle(event) {
  const { uuid } = parse(event)

  const container = MemoryStorage.containers.deleteByUUID(uuid)

  Logger.debug('EvDetachItemContainer', container)
}

function parse(event) {
  const encodedUuid = event.parameters[0]

  if (!Array.isArray(encodedUuid) || encodedUuid.length !== 16) {
    throw new ParserError(
      'EvDetachItemContainer has invalid encodedUuid parameter'
    )
  }

  const uuid = uuidStringify(encodedUuid)

  return { uuid }
}

module.exports = { EventId, handle, parse }
