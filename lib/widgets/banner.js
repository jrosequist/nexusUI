var util = require('util');
var widget = require('../core/widget');

/** 
	@class banner      
	"Powered by NexusUI" tag with a link to our website. Use it if you want to share the positive vibes of NexusUI. Thanks for using!
	```html
	<canvas nx="banner"></canvas>
	```
	<canvas nx="banner" style="margin-left:25px"></canvas>
*/

var banner = module.exports = function (target) {
	this.defaultSize = { width: 125, height: 50 };
	widget.call(this, target);
	
	//unique attributes
	this.message1 = "Powered by";
	this.message2 = "* Nexus UI *";
	this.message3 = "nexusosc.com";
}
util.inherits(banner, widget);

banner.prototype.init = function() {
	this.draw();
}

banner.prototype.draw = function() {
	with (this.context) {

		globalAlpha = 0.1;
		fillStyle = this.colors.accent;
		beginPath();
			moveTo(0,10);
			lineTo(10,this.height/2+5);
			lineTo(0,this.height);
			lineTo(30,this.height);
			lineTo(30,10);
			fill();
			moveTo(this.width-30,10);
			lineTo(this.width-30,this.height);
			lineTo(this.width,this.height);
			lineTo(this.width-10,this.height/2+5);
			lineTo(this.width,10);
			fill();
		closePath();
		globalAlpha = 1;

		fillStyle = this.colors.accent;
		fillRect(15,0,this.width-30,this.height-10);
		
		fillStyle = this.colors.white;
		font = this.height/5+"px courier";
		textAlign = "center";
		fillText(this.message1, this.width/2, this.height/3.3);
		fillText(this.message2, this.width/2, (this.height/3.3)*2);

		fillStyle = this.colors.black;
		beginPath();
			moveTo(15,this.height-10);
			lineTo(30,this.height);
			lineTo(30,this.height-10);
			lineTo(15,this.height-10);
			fill();
			moveTo(this.width-15,this.height-10);
			lineTo(this.width-30,this.height);
			lineTo(this.width-30,this.height-10);
			lineTo(this.width-15,this.height-10);
			fill();
		closePath();
	
	}
}

banner.prototype.click = function() {
	window.location = "http://www.nexusosc.com";
}