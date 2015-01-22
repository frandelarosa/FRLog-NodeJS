/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - node readline module
*
*-------------------------------------------------------------------------*/

var manager    = require('./manager');
var config     = require('./config');
var prettyjson = require('prettyjson');

var screenInstance;

module.exports = {

	execCommand:function(screen, command) {
		
		if (!screenInstance){
			screenInstance = screen;
		}
		
		switch(command){
			
			/**  Config **/
			
			case "show_config":
				this.commandShowConfig();
				break;
				
			/** AutoScroll **/			
				
			case "autoscroll_start":
				config.saveOption("autoScroll", true);
				screenInstance.appendLineToConsole("autoScroll: true");
				break;
				
			case "autoscroll_stop":
				config.saveOption("autoScroll", false);
				screenInstance.appendLineToConsole("autoScroll: false");
				break;
				
			/** Default **/
				
			default:
				screenInstance.appendLineToConsole("\'" + command + "' command not found");
				screenInstance.updateConsoleScroll();
				break;
		}	
		
	},
	
	commandShowConfig:function(){
		
		var configStr = config.getConfig();
		
		var options = {
			keysColor: 'green',
			dashColor: 'magenta',
			stringColor: 'white'
		};
		
		var line = "\n\n" + prettyjson.render(configStr, options);
		
		screenInstance.appendLineToConsole(line);
		screenInstance.updateConsoleScroll();
		
	}
  
};