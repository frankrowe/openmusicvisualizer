
var mp3;
var mySound;
var viz;

$(document).ready(function(){

	viz = EQGraph;
	dojo.require("dijit.ColorPalette");
    dojo.addOnLoad(function() {
        var myPalette1 = new dijit.ColorPalette({
            palette: "3x4",
            onChange: function(val) {
                viz.leftColor = val;
                viz.remove();
                viz.create();
            }
        },
        "colorPalette");
        var myPalette2 = new dijit.ColorPalette({
            palette: "3x4",
            onChange: function(val) {
                viz.rightColor = val;
                viz.remove();
                viz.create();
            }
        },
        "colorPalette2");        
    });	
	mp3 = $("select option:selected").val();
	soundManager.url = 'swf/'; // directory where SM2 .SWFs live
	soundManager.flashVersion = 9; // optional: shiny features (default = 8)
	soundManager.useFlashBlock = false;
	soundManager.debugMode = false;
	soundManager.useFastPolling = true;
	soundManager.flash9Options = {
	  isMovieStar: null,      // "MovieStar" MPEG4 audio mode. Null (default) = auto detect MP4, AAC etc. based on URL. true = force on, ignore URL
	  usePeakData: false,     // enable left/right channel peak (level) data
	  useWaveformData: false, // enable sound spectrum (raw waveform data) - WARNING: May set CPUs on fire.
	  useEQData: true,       // enable sound EQ (frequency spectrum data) - WARNING: Also CPU-intensive.
	  onbufferchange: null,	  // callback for "isBuffering" property change
	  ondataerror: null	  // callback for waveform/eq data access error (flash playing audio in other tabs/domains)
	}

	
	soundManager.onload = function() {	
	    mySound = soundManager.createSound({
	      id: 'aSound',
	      url: mp3
	    });		 
	}
	
	viz.create();

	
	$('#tracks').change(function(){
		mp3 = $("select option:selected").val();
		mySound.destruct();
		viz.remove();
		viz.create();
		mySound = soundManager.createSound({
	      id: 'aSound',
	      url: mp3
	    });	
	});	
	
	$('#vizs').change(function(){
		viz.remove();
		if($(this).val() == "cube") viz = cube;
		if($(this).val() == "EQGraph") viz = EQGraph;		
		viz.create();
	});
		
	$('#play').click(function(){
		viz.remove();
		viz.create();
		soundManager.play('aSound',{
			whileplaying: function(){ viz.animate(this); }			
		});
	});

	$('#stop').click(function(){
		mySound.stop();
		viz.stop();
	});
});


function animate(){
		console.log(this.eqData);
		var gScale = 128; 			  
		for (var i=0; i<viz.length; i++) {
			var heightLeft = Math.ceil(this.eqData.left[i]*gScale);
			var heightRight = Math.ceil(this.eqData.right[i]*gScale);
			viz.left[i].scale(1, heightLeft);
			viz.right[(viz.length-1)-i].scale(1, heightRight);
		}	
	}



function animate2(){
		//set.animate({rotation: "5"}, 20);
		//set.rotate(5);
		var gScale = 128; 
		for(var j=0; j<4; j++){	
			var arr = viz.lines[j];		  
			for (var i=0; i<32; i++) {
				var heightLeft = Math.ceil(this.eqData.left[i]*gScale);
				//arr[i].animate({height: heightLeft}, 50);
				arr[i].attr('height', heightLeft);
			}	
		}
	}









