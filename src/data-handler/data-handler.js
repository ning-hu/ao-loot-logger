const RequestData = require('./request-data')
const ResponseData = require('./response-data')
const EventData = require('./event-data')
const Logger = require('../utils/logger')
const ParserError = require('./parser-error')
const Config = require('../config')
const fs = require('fs');

BigInt.prototype.toJSON = function() { return this.toString() }

const might = {};
const market = {};

class DataHandler {
  static handleEventData(event) {
    try {
      if (!event || event.eventCode !== 1) {
        return
      }

      const eventId = event?.parameters?.[252]

      switch (eventId) {
        // case Config.events.EvInventoryPutItem:
        //   return EventData.EvInventoryPutItem.handle(event)

        case Config.events.EvNewCharacter:
          return EventData.EvNewCharacter.handle(event)

        case Config.events.EvNewEquipmentItem:
          return EventData.EvNewEquipmentItem.handle(event)

        case Config.events.EvNewSimpleItem:
          return EventData.EvNewSimpleItem.handle(event)

        case Config.events.EvNewLoot:
          return EventData.EvNewLoot.handle(event)

        case Config.events.EvAttachItemContainer:
          return EventData.EvAttachItemContainer.handle(event)

        case Config.events.EvDetachItemContainer:
          return EventData.EvDetachItemContainer.handle(event)

        case Config.events.EvCharacterStats:
          return EventData.EvCharacterStats.handle(event)

        case Config.events.EvOtherGrabbedLoot:
          return EventData.EvOtherGrabbedLoot.handle(event)

        case Config.events.EvNewLootChest:
          return EventData.EvNewLootChest.handle(event)

        case Config.events.EvUpdateLootChest:
          return EventData.EvUpdateLootChest.handle(event)

        default:
          if (process.env.LOG_UNPROCESSED) Logger.silly('handleEventData', event.parameters)
      }
    } catch (error) {
      if (error instanceof ParserError) {
        Logger.warn(error, event)
      } else {
        Logger.error(error, event)
      }
    }
  }

  static handleRequestData(event) {
    const eventId = event?.parameters?.[253]

    try {
      switch (eventId) {
        case Config.events.OpInventoryMoveItem:
          return RequestData.OpInventoryMoveItem.handle(event)

        default:
          if (process.env.LOG_UNPROCESSED) Logger.silly('handleRequestData', event.parameters)
      }
    } catch (error) {
      if (error instanceof ParserError) {
        Logger.warn(error, event)
      } else {
        Logger.error(error, event)
      }
    }
  }

  static handleResponseData(event) {
    const eventId = event?.parameters?.[253];

    try {
      switch (eventId) {
        case 76:
          // Market
          let mrkt_data = "";
          for (let i = 0; i < event.parameters[0].length; i++) {
            let obj = JSON.parse(event.parameters[0][i]);
            let id = obj["Id"];
            if (market.hasOwnProperty(id)) {
              continue;
            }
            
            market[id] = true;
            mrkt_data += obj["ItemTypeId"] + ',' + obj["QualityLevel"] + ',' + obj["Amount"] + ',' + Math.round(Number(obj["UnitPriceSilver"]) / 10000) + ',' +  obj["SellerName"] + '\n';
          }

          if (mrkt_data !== "") {
            fs.appendFile('market.txt', mrkt_data, (err) => {
              if (err) throw err;
            });
          }

          console.log("Finished recording market page\n");

        case 440:
          // Might ranking
          const type = event.parameters[1];
          if (!might.hasOwnProperty(type)) {
            might[type] = {};
          }

          let data = "";
          for (let i = 0; i < event.parameters[6].length && i < event.parameters[7].length; i++) {
            const name = event.parameters[6][i];
            if (might[type].hasOwnProperty(name)) {
              continue;
            }
            
            might[type][name] = true;
            data += event.parameters[1] + ',' + name + ',' + Math.round(Number(event.parameters[7][i]) / 10000) + '\n'
          }

          if (data !== "") {
            fs.appendFile('might.txt', data, (err) => {
              if (err) throw err;
            });
          }

          console.log("Size of " + type + " is " +  Object.keys(might[type]).length);

        case Config.events.OpJoin:
          return ResponseData.OpJoin.handle(event)

        default:
          if (process.env.LOG_UNPROCESSED) Logger.silly('handleResponseData', event.parameters)
      }
    } catch (error) {
      if (error instanceof ParserError) {
        Logger.warn(error, event)
      } else {
        Logger.error(error, event)
      }
    }
  }
}

module.exports = DataHandler
