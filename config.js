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

var config = {
	showClassname: true,
	showLinenumber: true,
	autoScroll: true,
	reqFilters: ""
}

module.exports = {

	getConfig:function(){
		return config;
	},
	
	saveOption:function(option, value){
		config[option] = value;
	},
	
	/** autoScroll **/
	
	isAutoScroll:function(){
		return config.autoScroll;
	},
	
	autoScrollOn:function(){
		config.autoScroll = true;
	},
	
	autoScrollOff:function(){
		config.autoScroll = false;
	},
	
	/** Request Filters **/
	
	addReqFilter:function(filter_toadd){
	
		var filters = new String(config.reqFilters).split(",");
		
		if (filters[0].length == 0){
			filters.shift();
		}
		
		var filterFound = false;
		var result = 0;
		
		for (var i = 0; i<filters.length; i++){
			
			var currentFilter = filters[i];
			
			if (currentFilter === filter_toadd){
				filterFound = true;
				break;
			}
			
		}
		
		if (filterFound == false){
		
			filters.push(filter_toadd);
			config.reqFilters = filters;
			result = 1;
			
		}else{
			result = 2; // Filter already added
		}
		
		return result;
		
	},
	
	getReqFilter:function(){
		return new String(config.reqFilters).split(",");
	}
  
};