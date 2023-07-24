// Command class

class Command {

  constructor(commandType, value) {

    // initialize commandType which could be either 'MOVE', 'MODE_CHANGE', or 'STATUS_CHECK'

    this.commandType = commandType;

    // make sure commandType is passed to the constructor, or throw an error

    if (!commandType) {

      throw Error("Command type required.");

    }
    // initialize value - which can be a number if commandType is 'MOVE', 
    // 'LOW_POWER' or 'NORMAL' if commandType is 'MODE_CHANGE', or if the commandType is 'STATUS_CHECK',
    // value is not set

    this.value = value;
    
  }

}

module.exports = Command;