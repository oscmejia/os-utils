var OSUtils = function(){
	
};

OSUtils.prototype.getMemory = function(){ 
	return "1MB (fake)"; 
}

OSUtils.prototype.getCPU = function(){ 
	return "2% (fake)"; 
}

OSUtils.prototype.className = "OSUtils";

module.exports.create = function(){
	return new OSUtils();
};

module.exports._class = OSUtils;