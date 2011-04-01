
var EQGraph = {
	paper: null,
	left: [],
	right: [],
	length: 128,
	leftColor: '#ddd',
	rightColor: '#ddd',
	create: function(){
		this.paper = Raphael('graph', 1200, 600);
		console.log();
		for (var i=0; i<this.length; i++) {
			this.left[i] = this.paper.rect(100+(4*i), 100, 1, 1);
			this.left[i].attr('stroke', this.leftColor);
		}
		for (var i=0; i<this.length; i++) {
			this.right[i] = this.paper.rect(600+(4*i), 100, 1, 1);
			this.right[i].attr('stroke', this.rightColor);
		}	
	},
	animate: function(sound){
		//console.log(sound);
		var gScale = 128; 			  
		for (var i=0; i<this.length; i++) {
			var heightLeft = Math.ceil(sound.eqData.left[i]*gScale);
			var heightRight = Math.ceil(sound.eqData.right[i]*gScale);
			this.left[i].scale(1, heightLeft);
			this.right[(this.length-1)-i].scale(1, heightRight);
		}	
	},
	remove: function(){		
		for (var i=0; i<this.length; i++) {
			this.left[i].remove();
			this.right[i].remove();		
		}
		this.paper.remove();
	},
	stop: function(){
		for (var i=0; i<this.length; i++) {			  	
			this.left[i].animate({height: 1, width: 1, y: 100}, 200);
			this.right[(this.length-1)-i].animate({height: 1,  width: 1, y: 100}, 300);
		}		
	}
}

var cube = {
	paper: null,
	lines: [],
	set: null,
	length: 128,
	x: 600,
	y: 200,	
	create: function(){
		this.paper = Raphael('graph', 1200, 600);
		var sets = [];
		for(var j=0; j<4; j++){
			var arr = [];
			for (var i=0; i<32; i++) {
				arr[i] = this.paper.rect(this.x+(4*i), this.y, 1, 1);
				if(j==0)arr[i].attr('stroke', '#0f0');
				if(j==1)arr[i].attr('stroke', '#f00');
				if(j==2)arr[i].attr('stroke', '#00f');
				if(j==3)arr[i].attr('stroke', '#ff0');									
				arr[i].rotate(j*90, this.x, this.y);	
			}	
			this.lines[j] = arr;		
		}		
	},
	animate: function(sound){
		//set.animate({rotation: "5"}, 20);
		//set.rotate(5);
		var gScale = 128; 
		for(var j=0; j<4; j++){	
			var arr = this.lines[j];		  
			for (var i=0; i<32; i++) {
				var heightLeft = Math.ceil(sound.eqData.left[i*(j+1)]*gScale);
				//arr[i].animate({height: heightLeft}, 50);
				arr[i].attr('height', heightLeft);
			}	
		}
	},
	remove: function(){
		for(var j=0; j<this.lines.length; j++){
			var arr = this.lines[j];
			for (var i=0; i<arr.length; i++) {			  	
				arr[i].remove();;
			}
		}	
	},
	stop: function(){
		for(var j=0; j<this.lines.length; j++){
			var arr = this.lines[j];
			for (var i=0; i<arr.length; i++) {			  	
				arr[i].animate({height: 1, width: 1, y: this.y}, this.y);
			}
		}	
	}
}
