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
	shoeLinenumber: true,
	autoScroll: true
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
	}
  
};