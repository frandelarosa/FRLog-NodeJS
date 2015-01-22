/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - manager.js
*    - config.js
*    - help.js
*
*-------------------------------------------------------------------------*/

var manager    = require('./manager');
var config     = require('./config');
var help       = require('./help');

var screenInstance;

module.exports = {

	execCommand:function(screen, command) {
		
		if (!screenInstance){
			screenInstance = screen;
		}
		
		// Check if command has arguments
		var command_args = new String(command).split(" ");
		
		if (command_args.length > 1){
			this.execCommandsWithArgs(command_args);
		}else{
			this.execCommandNoArgs(command);
		}
		
				
	},
	/** Execute a command without arguments **/
	execCommandNoArgs:function(command){
		
		switch(command){
			
			/**  Config **/
			
			case "config":
				this.commandShowConfig();
				break;
				
			/** Command List **/
			
			case "help":
				this.commandHelp();
				break;
				
			/** Quit **/
			case "quit":
				this.commandQuit();
				break;
				
			/** Default **/
				
			default:
				screenInstance.appendLineToConsole("\'" + command + "' command not found");
				screenInstance.updateConsoleScroll();
				break;
		}	

	},
	/** Execute the command with arguments **/
	execCommandsWithArgs:function(command_args){
	
		var cmd = command_args[0];
		
		screenInstance.appendLineToConsole('args: ' + cmd);
		
		switch(cmd){
		
			/** Clear **/
			
			case "clear":
				if (command_args[1] === "log"){
					screenInstance.clearLog();
				}else if (command_args[1] === "console"){
					screenInstance.clearConsole();
				}
				break;
				
			/** Autoscroll **/
			
			case "autoscroll":
				if (command_args[1] === "on"){
					this.commandAutoScrollOn();
				}else if (command_args[1] === "off"){
					this.commandAutoScrollOff();
				}
		}	
		
		
	},
	/** Shows FRLog settings **/
	commandShowConfig:function(){
		
		var configStr = config.getConfig();
		
		var text = screenInstance.makeTextBasedJSON(configStr, "Settings");
		
		screenInstance.appendLineToConsole(text);
		screenInstance.updateConsoleScroll();
		
	},
	/** Shows help on the screen **/
	commandHelp:function(){
	
		var helpText = help.getHelp();
		
		var text = screenInstance.makeTextBasedJSON(helpText, "Commands List");
		
		screenInstance.appendLineToConsole(text);
		screenInstance.updateConsoleScroll();
		
	},
	/** Tun off autoscroll on log screen **/
	commandAutoScrollOff:function(){
		
		config.saveOption("autoScroll", false);
		screenInstance.appendLineToConsole("autoScroll: false");
		
	},
	/** Turn on autoscroll on log screen **/
	commandAutoScrollOn:function(){
		
		config.saveOption("autoScroll", true);
		screenInstance.appendLineToConsole("autoScroll: true");
		
	},
	/** Quit FRLog **/
	commandQuit:function(){
		process.exit(code=0);
	}
  
};