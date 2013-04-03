// Javascript 2d_slider

function position(target, ajaxCommand, oscName, uiIndex, oscIp) {
					
	//self awareness
	var self = this;
	this.uiIndex = uiIndex;
	
	//get common attributes and methods
	this.getTemplate = getTemplate;
	this.getTemplate(self, target, ajaxCommand);
	this.ajaxCommand = ajaxCommand;
	
	//this.line_width = 3;
	this.nodeSize = 15;
	
	this.ajax_send = ajax_send;
	this.oscName = oscName;
	this.oscIp = oscIp;
	
	this.default_text = "click or touch to control a node";	
	this.throttle = throttle;
	this.clip = clip;
	
	

	this.init = function() {
		getHandlers(self);
		
		if (!self.ajaxCommand) {
			self.ajaxCommand = "position";
		}

		self.draw();
	}

	this.draw = function() {
		self.erase();
		self.makeRoundedBG();
		with (self.context) {
			strokeStyle = Colors.border;
			fillStyle = Colors.fill;
			lineWidth = self.lineWidth;
			stroke();
			fill();
			if (self.nodePos[0] != null) {
				self.drawNode();
			}
			else {
				fillStyle = Colors.border;
				font = "14px courier";
				fillText(self.default_text, 10, 20);
			}
		}
	}

	this.drawNode = function() {
		//stay within right/left bounds
		if (self.nodePos[0]<(self.bgLeft+self.nodeSize)) {
			self.nodePos[0] = self.bgLeft + self.nodeSize;
		} else if (self.nodePos[0]>(self.bgRight-self.nodeSize)) {
			self.nodePos[0] = self.bgRight - self.nodeSize;
		}
		//stay within top/bottom bounds
		if (self.nodePos[1]<(self.bgTop+self.nodeSize)) {
			self.nodePos[1] = self.bgTop + self.nodeSize;
		} else if (self.nodePos[1]>(self.bgBottom-self.nodeSize)) {
			self.nodePos[1] = self.bgBottom - self.nodeSize;
		}
	
		with (self.context) {
			beginPath();
				fillStyle = Colors.accent;
				strokeStyle = Colors.border;
				lineWidth = self.lineWidth;
				arc(self.nodePos[0], self.nodePos[1], self.nodeSize, 0, Math.PI*2, true);					
				fill();
			closePath();
		}
	}

	this.click = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
	//	self.ajax_send(self.ajaxCommand, self.osc_name, self.uiIndex, click_position.x+" "+click_position.y);
		self.draw();
		
		console.log(self.clickPos.y);
	}

	this.move = function() {
		if (self.clicked) {
			self.nodePos[0] = self.clickPos.x;
			self.nodePos[1] = self.clickPos.y;
			self.mainAjax();
			self.draw();
			var help = {
				"self.clickPos.x": self.clickPos.x,
				"self.clickPos.y": self.clickPos.y,
				"self.nodePos[0]": self.nodePos[0],
				"self.nodePos[1]": self.nodePos[1],
				"self.offset": self.offset
			}
			//console.log(help);
		}
	}
	

	this.release = function() {
		
	}
	
	this.touch = function() {
		self.nodePos[0] = self.clickPos.x;
		self.nodePos[1] = self.clickPos.y;
	//	self.ajax_send(self.ajaxCommand, self.osc_name, self.uiIndex, click_position.x+" "+click_position.y);		
		draw();
	}

	this.touchMove = function() {
		if (self.clicked) {
			self.nodePos[0] = self.clickPos.x;
			self.nodePos[1] = self.clickPos.y;
		//	self.ajax_send(self.ajaxCommand, self.osc_name, self.uiIndex, click_position.x+" "+click_position.y);
			self.draw();
		}
	}

	this.touchRelease = function() {
		
	}
	
	
	this.mainAjax = function() {
		self.Yvalue = self.nodePos[1] / self.canvas.height;
		if (self.Yvalue > 1) { 
			self.Yvalue = 1;	
		} else if (self.Yvalue < 0) { 
			self.Yvalue = 0;	
		}
		self.Yvalue = Math.abs(self.Yvalue - 1);
	//	self.ajax_send(self.ajaxCommand, self.oscName, self.uiIndex, click_position.x+" "+click_position.y);
		self.ajax_send(self.ajaxCommand, self.oscName, self.uiIndex, self.Yvalue, self.oscIp)
	}
	
	this.init();
}