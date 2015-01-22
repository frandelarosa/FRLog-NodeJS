/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - node chalk module
*    - dump.js
*
*-------------------------------------------------------------------------*/

var chalk  = require('chalk');
var dump   = require('./dump');
var screen = require('./screen');
var config = require('./config');

var idx = 0;

module.exports = {

  parseObject:function(data) {
  
  	var strToConsole = "";
  	
  	switch(parseInt(data.obj_type)){
		case 1: // URL
			strToConsole = this.parseURL(data);
			break;
			
		case 2: // INFO
			strToConsole = this.parseInfo(data);
			break;	
  	}
           
    // Dump to file
    //dump.dumpToFile(strToConsole);
    
    // Output console
    screen.appendLine(" #" + (idx++) + " " + strToConsole);
    
  },
  
  addClassnameAndLine:function(data){
	  
	  var obj_classname = data.obj_classname;
	  var obj_line      = data.obj_line;
	 
	  return chalk.red(" " + obj_classname + ":" + obj_line);
	  
  },
  
  addContent: function(data){
	  
	  var obj_content = data.obj_content;
	  
	  return chalk.white(" " + obj_content);
	  
  },
  // Parse FRLogURL Object
  parseURL:function(data){
	  
	  // Title
	  var log_str = chalk.green.bold("URL");
	  
	  // Request name
	  log_str += " " + chalk.green(data.obj_requestname);
	  
	  // Full URL
	  log_str += " " + chalk.white(data.obj_url);
	  
	  return log_str;
	  
  },
  // Parse FRLogObject
  parseInfo:function(data){
	  
	  var log_str = chalk.yellow.bold("INFO");
	  
	  // Add classname and linenumber
      log_str += this.addClassnameAndLine(data);
    
	  // Add content
	  log_str += this.addContent(data);
	  
	  return log_str;
	  
  }
  
};