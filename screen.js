/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - node blessed module
*    - commandLine.js
*    - config.js
*    - prettyjson.js
*
*-------------------------------------------------------------------------*/

var blessed    = require('blessed');
var commands   = require('./commandline');
var config     = require('./config');
var prettyjson = require('prettyjson');

// Create a screen object.
var screen = blessed.screen({
	resizeTimeout: '300'
});

var boxTitle, boxLog, boxInput, boxConsole;

module.exports = {

	drawScreens:function() {
	
		this.drawTitleScreen();
		this.drawLogScreen();
		this.drawConsoleScreen();
		this.drawInputScreen();
		
		// Quit on ESC, q, or CTRL-C
		screen.key(['escape', 'C-c'], function(ch, key) {
		  return process.exit(0);
		});
		
		// Render the screen
		screen.render();
  
	},
	// Draw title screen on the console
	drawTitleScreen:function(){
		
		boxTitle = blessed.box({
			top: '0%',
			left: 'center',
			align: 'center',
			width: '100%',
			height: 5,
			tags: true,
			content: 'FRLog {bold}{red-fg}0.1{/red-fg}{/bold}',
			style: {
				fg: 'white',
				bg: 'blue',
				bold: true
			},
			padding: {
				top: 1 
			},
			border: {
				type: 'line'
			}
		});
		
		screen.append(boxTitle);
		
	},
	// Draw log screen on the console
	drawLogScreen:function(){
		
		boxLog = blessed.scrollabletext({
			top: 5,
			left: 'center',
			width: '100%',
			height: '75%',
			keys: true,
			mouse: true,
			tags: true,
			vi: true,
			scrollbar: {
				fg: 'yellow',
				ch: '|'
			},
			
			border: {
			type: 'line'
			},
			
			style: {
				fg: 'white',
				// bg: 'magenta',
				border: {
					fg: '#f0f0f0'
				},
			}
		});

		// Append our box to the screen.
		screen.append(boxLog);
		
	},
	// Draw console screen
	drawConsoleScreen:function(){
		
		boxConsole = blessed.scrollabletext({
			top: '84%',
			left: 'center',
			width: '100%',
			height: '16%',
			content: '{blue-fg} Welcome to FRLog 1.0{/blue-fg}',
			keys: true,
			mouse: true,
			tags: true,
			vi: true,
			scrollbar: {
				fg: 'yellow',
				ch: '|'
			},
			padding: {
				left: 1
			},
			border: {
				type: 'line'
			},
			style: {
				fg: 'white',
				// bg: 'magenta',
				border: {
					fg: '#f0f0f0'
				},
			}
		});

		// Append our box to the screen.
		screen.append(boxConsole);

		
	},
	// Draw input screen on the console
	drawInputScreen:function(){
	
		var _self_ = this;
		
		boxInput = blessed.textarea({
			parent: screen,
			keys: true,
			clickable: true,
			left: 0,
			bottom: 0,
			width: 100,
			height: 1,
			bg: 'blue'
		});
		
		screen.append(boxInput);
		
		// If input field is focused, handle enter event
		boxInput.key('enter', function(ch, key) {
		
			var command = this.getValue().trim();
			
			if (command.length > 0){
				commands.execCommand(_self_, command);
			}
			
			//boxLog.insertBottom();
			boxInput.clearValue();
			
		});
		
		// If our box is clicked, take the focus
		boxInput.on('click', function(data) {
			boxInput.focus();
			boxInput.readInput();
		});
		
		boxInput.focus();
		boxInput.readInput();
		
	},
	
	/** Lines **/
	
	appendLine:function(data){
		
		boxLog.insertBottom(data);
		
		if (config.isAutoScroll() == true){
			this.updateScroll();
		}
	
		screen.render();
		
	},
	
	appendLineToConsole:function(data){
		boxConsole.insertBottom(data);
		screen.render();
	},
	
	/** Scroll **/
	
	updateScroll:function(){
		boxLog.scroll(1);
	},
	
	updateConsoleScroll:function(){
		boxConsole.scrollTo(this.getConsoleLines().length);
	},
	
	getConsoleLines:function(){
		return boxConsole.getLines();
	},
	
	/** Print JSON **/
	
	makeTextBasedJSON:function(json_parsed, title){
	
		var options = {
			keysColor: 'green',
			dashColor: 'magenta',
			stringColor: 'white'
		};
		
		var line = "\n" + title + "\n\n" + prettyjson.render(json_parsed, options) + "\n";
		
		return line;
		
	},
	
	/** Clear **/
	
	clearLog:function(){
		
	},
	
	clearConsole:function(){
		
	}
  
};


