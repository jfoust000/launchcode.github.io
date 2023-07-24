// Message class

class Message {

   // Write code here!

  constructor(name, commands) {

     // initialize name

     this.name = name;

     // ensure name passed to the constructor or throw an error

     if (!name) {

       throw Error("name required.");

     }

     // initialize commands - commands is an array of Command objects

     this.commands = commands;

  }
  
}

module.exports = Message;