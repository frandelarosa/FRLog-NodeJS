var chalk = require('chalk');
var dump  = require('./dump');

module.exports = {

  colorize: function(data) {
    
    // Final string that will be printed
    var log_str = "";
    
    // TYPE
    if (data.obj_type == "1"){
	    
	    log_str = chalk.green.bold("URL");
	    
	    
    }else if (data.obj_type == "2"){
	    
	    log_str = chalk.orange.bold("INFO");
	    
	    
    }else if (data.obj_type == "3"){
	    
	    log_str = chalk.red.bold("ERROR");
	    
    }
    
    // Add classname and linenumber
    log_str += this.addClassnameAndLine(data);
    
    // Add content
    log_str += this.addContent(data);
    
    // Dump to file
    dump.dumpToFile(log_str);
    
    // Output console
    console.log(log_str);
    
  },
  
  addClassnameAndLine: function(data){
	  
	  var obj_classname = data.obj_classname;
	  var obj_line      = data.obj_line;
	 
	  return chalk.gray(" " + obj_classname + ":" + obj_line);
	  
  },
  
  addContent: function(data){
	  
	  var obj_content = data.obj_content;
	  
	  return chalk.white(" " + obj_content);
	  
  }
  
};