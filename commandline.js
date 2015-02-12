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
var chalk      = require('chalk');
var request    = require('./request');

var cmdnotfound = " command not found";

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
				
			/** Test **/
			case "test":
				this.commandTest();
				break;
				
			/** Default **/
				
			default:
				this.commandNotFound(new Array(command));
				break;
				
		}	

	},
	/** Execute the command with arguments **/
	execCommandsWithArgs:function(command_args){
	
		var cmd = command_args[0];
		
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
				break;
				
			/** Request Filters **/
			
			case "reqfilter":
				this.commandRequestFilter(command_args);
				break;
				
			default:
				this.commandNotFound(new Array(cmd));
				break;
				
		}	
		
		
	},
	/** Shows FRLog settings **/
	commandShowConfig:function(){
		
		var configStr = config.getConfig();
		
		var text = screenInstance.makeTextBasedJSON(configStr, "Settings");
		
		screenInstance.appendLineToConsole(text);
		
	},
	/** Shows help on the screen **/
	commandHelp:function(){
	
		var helpText = help.getHelp();
		
		var text = screenInstance.makeTextBasedJSON(helpText, "Commands List");
		
		screenInstance.appendLineToConsole(text);
		
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
	},
	commandTest:function(){
		
		// Draw BoxJSON
		screenInstance.drawShowJSONScreen();
		
		var url = "http://jsonplaceholder.typicode.com/users";
		
		// Make Request to get JSON Data
		request.getDataFromURL(url, screenInstance);		
		
	},
	/** Add or Remove URL filter **/
	commandRequestFilter:function(filter){
	
		var _self_ = this;
	
		// Add o delete filter
		var createFilter = function(){
			
			if (filter[1] === "add" || filter[1] === "delete"){
				
				switch(filter[1]){
					case "add":
						// Add filter
						var res = config.addReqFilter(filter[2]);
				
						if (res == 1){
							screenInstance.appendLineToConsole("Filter '" + filter[2] + "' added");
						}else if(res == 2){
							screenInstance.appendLineToConsole("Filter '" +filter[2] + "' has already been added");
						}else{
							screenInstance.appendLineToConsole("Can't add '" + filter[2] + "' filter");
						}
					break;
					
					case "delete":
					break;
				}

			}else{
			
				_self_.commandNotFound(filter);
			}

		}
		
		// Parse arguments
		switch(filter.length){
			case 1:
				this.commandsExpected(filter, 3);
				break;
				
			case 2:
				if (filter[1] !== "add" || filter[1] !== "delete"){
					this.commandNotFound(filter);
				}else{
					this.commandsExpected(filter, 3);
				}
				break;
			
			case 3:
				createFilter();			
				break;

		}
	
		
	},
	/** Show command not found **/
	commandNotFound:function(command){
			
		var commandParsed = "";
	
		if (command.length > 1){
			commandParsed = command.join(" ");
		}else{
			commandParsed = command;
		}
		
		screenInstance.appendLineToConsole("'" + commandParsed + "'" + cmdnotfound);
		
	},
	
	commandsExpected:function(commands, length){
		
		screenInstance.appendLineToConsole("'" + commands.join(" ") + "' have " + commands.length + " argument(s), expected " + length);
		
	},
	
	
};