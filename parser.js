var chalk = require('chalk');
var dump  = require('./dump');

module.exports = {

  parseObject: function(data) {
  
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
   // dump.dumpToFile(log_str);
    
    // Output console
    console.log(strToConsole);
    
  },
  
  addClassnameAndLine: function(data){
	  
	  var obj_classname = data.obj_classname;
	  var obj_line      = data.obj_line;
	 
	  return chalk.gray(" " + obj_classname + ":" + obj_line);
	  
  },
  
  addContent: function(data){
	  
	  var obj_content = data.obj_content;
	  
	  return chalk.white(" " + obj_content);
	  
  },
  // Parse FRLogURL Object
  parseURL: function(data){
	  
	  // Title
	  var log_str = chalk.green.bold("URL");
	  
	  // Request name
	  log_str += " " + chalk.green(data.obj_requestname);
	  
	  // Full URL
	  log_str += " " + chalk.white(data.obj_url);
	  
	  return log_str;
	  
  },
  // Parse FRLogObject
  parseInfo: function(data){
	  
	  var log_str = chalk.yellow.bold("INFO");
	  
	  // Add classname and linenumber
      log_str += this.addClassnameAndLine(data);
    
	  // Add content
	  log_str += this.addContent(data);
	  
	  return log_str;
	  
  }
  
};