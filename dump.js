/*-------------------------------------------------------------------------
*
*   FRLog v0.1
*   17-01-15
*   Francisco de la Rosa (c)
*
*   Server application to get log objects that are being sent by iOS client.
*
*   DEPENDENCIES
*    - node fs module
*
*-------------------------------------------------------------------------*/

var fs = require("fs");

var file_sufix = "_frlog.log"
var filename;

module.exports = {

  dumpToFile: function(data) {
  
  	var _self = this;
  
  	// Get current date splitted into components
  	var currentDate = new Date();
  
	var month = currentDate.getUTCMonth() + 1;
	var day   = currentDate.getUTCDate();
	var year  = currentDate.getUTCFullYear();
	
	var hours   = currentDate.getHours();
	var minutes = currentDate.getMinutes();
	var seconds = currentDate.getSeconds();
	
	// Date string
	var dateStr = year + month + day + "_" + hours + ":" + minutes + ":" + seconds;
  	
  	// Filename
  	if (!filename){
  		filename = "./" + dateStr + file_sufix;
  	}
    	
    // Check if file exists
  	fs.exists(filename, function(exists) {
  		
  		// If exists, open file in write mode
	  	if (exists) {
			_self.writeToFile(data);
		}else{
			_self.createFile(filename, data);
		}
	});
  	
  },
  
  // Create a new log file base on timestamp
  createFile: function(f_name, f_data){
	
	var dataToAppend = "\r";
	
	fs.writeFile("./" + f_name, dataToAppend, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("The file was saved!");
			filename = f_name;
		}
	}); 
	
	
  },
  
  // Append lines to an existing file
  writeToFile: function(data){
  	
  	 var dataToAppend = "\r" + data;
	 
	 fs.appendFile(filename, dataToAppend, function (err) {

	 });
	  
  }
  
};