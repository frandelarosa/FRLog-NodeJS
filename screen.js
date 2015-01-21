/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - node http module
*    - node chalk module
*    - parser.js
*    - commandline.js
*
*-------------------------------------------------------------------------*/

var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
	resizeTimeout: '0'
});

var boxTitle, boxLog, boxInput;

module.exports = {

	drawScreens:function() {
	
		this.drawTitleScreen();
		this.drawLogScreen();
		this.drawInputScreen();
		
		// Quit on Escape, q, or Control-C.
		screen.key(['escape', 'q', 'C-c'], function(ch, key) {
		  return process.exit(0);
		});
		
		// Render the screen.
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
			top: '9%',
			left: 'center',
			width: '100%',
			height: '88%',
			content: '{yellow-fg} Listening for events{/yellow-fg}',
			keys: true,
			mouse: true,
			tags: true,
			vi: true,
			scrollbar: {
				fg: 'blue',
				ch: '|'
			},
			/*
			border: {
			type: 'line'
			},
			*/
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
	// Draw input screen on the console
	drawInputScreen:function(){
		
		boxInput = blessed.textarea({
			parent: screen,
			keys: true,
			left: 0,
			bottom: 0,
			width: 100,
			height: 1,
			bg: 'blue'
		});
		
		screen.append(boxInput);
		
		// If input field is focused, handle enter event
		boxInput.key('enter', function(ch, key) {
		
			boxLog.insertBottom(this.getValue().trim());
			boxInput.clearValue();
			
		});
		
		boxInput.focus();
		boxInput.readInput();
		
	},
	
	appendLine:function(data){
		
		boxLog.insertBottom(data);
		boxLog.scroll(1);
		screen.render();
		
	}
  
};


