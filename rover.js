// Rover class

class Rover {
  
   // Write code here!
  
   constructor(position, mode, generatorWatts) {
     
      // rover's position
     
      this.position = position;
     
      // provide default values to mode and 
      //generatorWatts if not passed to constructor
     
      if(!mode) {
        
         //only 2 modes - 'NORMAL' and 'LOW_POWER'
        
         this.mode = "NORMAL";

      }
      
      if(!generatorWatts) {
        
         // Default is 110 
        
         this.generatorWatts = 110;
      
      }

   }
  
   // Method receiveMessage receives a message object containing the properties 'message' 
   // (which is the message name as a string) and 'commands' (which is an array of Command objects)
  
   receiveMessage(message) {
     
      // Create objects to provide the completion status of the different commands
      // statusCheck object contains property 'completed' as boolean and a 'roverStatus' object that contains
      // properties 'mode', 'generatorWatts', and 'position' which are 
      // initially assigned values initialized in the constructor
     
      let statusCheck = {
         
         completed: false,
         roverStatus: {

            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
   
         }

      };
     
      // move object with properties 'completed' and position to store value of new position
     
      let move = {

         completed: false,
         position: this.position

      };
     
      // modeChange object with properties 'completed' and mode to store the value of the new mode
     
      let modeChange = {

         completed: false,
         mode: this.mode

      };
     
      // unknownCommand object in case we receive an unkown command that is not supported
     
      let unknownCommand = {

         completed: false,
         errorMessage: "Unknown command received"

      };
     
      // response object to return the results of the commands received
      // results is an array that will hold the above objects. 
      // For example, if we receive a message with message.commands.length === 2
      // we will execute each command and set the completed properties of the corresponding objects to true or false.
      // Then, add the appropriate object to the results array before returning response.
     
      let response = {

         message: message.name,
         results: []

      };
     
         // loop through message.commands array to validate the commands and execute them if we can
     
         for (let i = 0; i < message.commands.length; i++) {
           
            // is the command 'MOVE'?
           
            if (message.commands[i].commandType === "MOVE") {
              
               // if so, we cannot move in LOW_POWER mode, so we check our current mode first  
              
               if (this.mode === "LOW_POWER") {
                 
                  // we cannot move, so set move.completed to false and response.results[i] = the move object
                 
                  move.completed = false;
                  response.results[i] = move;

               } else {
                 
                  // we are in normal mode and can move
                  // so we set this.position to equal the message.commands[i].value property 
                  // which should be a number representing a position to move to
                  // then, we set statusCheck.roverStatus.position = this.position and
                  // set move.position to this.position, and
                  // move.completed to true and assign the move object to response.results[i]
                 
                  this.position = message.commands[i].value;
                  statusCheck.roverStatus.position = this.position;
                  move.position = this.position;
                  move.completed = true;
                  response.results[i] = move;

               }
              
            // if the command is 'STATUS_CHECK' we set statusCheck.completed = true and
            // assign the statusCheck object to results[i]
              
            } else if (message.commands[i].commandType === "STATUS_CHECK") {

                  statusCheck.completed = true;
                  response.results[i] = statusCheck;
              
            // if the command is 'MODE_CHANGE', set this.mode to the value in message.commands[i].value (which 
            // can be either 'NORMAL', or 'LOW_POWER')
            // then set statusCheck.roverStatus.mode = this.mode
            // then set modeChange.mode to this.mode and 
            // modeChange.completed to true and assign the modeChange object to response.results[i]  
              
            } else if (message.commands[i].commandType === "MODE_CHANGE") {

                  this.mode = message.commands[i].value;
                  statusCheck.roverStatus.mode = this.mode;
                  modeChange.mode = this.mode;
                  modeChange.completed = true;
                  response.results[i] = modeChange;
              
            // else, we received an unsupported command and 
            // should assign the unknownCommand object to response.results[i]
              
            } else {

               response.results[i] = unknownCommand;

            }

         }
     
      // return the response object
     
      return response;

   }

}

module.exports = Rover;