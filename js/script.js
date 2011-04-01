
var mp3;
var mySound;
var viz;

$(document).ready(function(){

	viz = EQGraph;
	viz.create();
	mp3 = $("#tracks option:selected").val();
	
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

	soundManager.url = 'swf/'; 
	soundManager.flashVersion = 9;
	soundManager.useFlashBlock = false;
	soundManager.debugMode = false;
	soundManager.useFastPolling = true;
	soundManager.flash9Options = {
	  isMovieStar: null, 
	  usePeakData: false,
	  useWaveformData: false,
	  useEQData: true,       
	  onbufferchange: null,	 
	  ondataerror: null
	}

	soundManager.onload = function() {	
	    mySound = soundManager.createSound({
	      id: 'aSound',
	      url: mp3
	    });		 
	}		
	
	$('#tracks').change(function(){
		mp3 = $("#tracks option:selected").val();
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
		if($(this).val() == "cube") {
			viz = cube;
			$('#options').hide();
		}
		if($(this).val() == "EQGraph") {
			viz = EQGraph;		
			$('#options').show();
		}
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

