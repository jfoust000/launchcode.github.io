const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

  it("throws error if a name is not passed into the constructor as a first parameter", function () {

    expect( function() { new Message();}).toThrow(new Error('name required.'));
    
  });

  it("constructor sets name", function () {

    let nextMessage = new Message('name');
    expect(nextMessage.name).toEqual('name');

  });

  it("contains a commands array passed into the constructor as 2nd arugument", function () {

    let commands = [new Command('ARG1', 'ARG2'), new Command('ARG3', 'ARG4')];
    let nextMessage = new Message('name', commands); 
    expect(nextMessage.commands).toEqual([new Command('ARG1', 'ARG2'), new Command('ARG3', 'ARG4')]);

  });

});