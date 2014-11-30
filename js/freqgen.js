$(document).ready(function() {
	var local = this;
	var data = [];
	var enabler = 0;
	var audio;
	lockedAllowed = window.screen.lockOrientation("portrait-primary");

	// Find button via ID and prevent form submitting
	$("#toggle").click(function(event){
		event.preventDefault();
		if(enabler == 0){
			var freq = getDefaultFreq("#hz");
			var	sample = getDefaultSample("#sample");
			var player = playSound(freq, sample);
			audio.play();
			enabler = 1;
		}
		else {
			audio.pause();
			audio.currentTime = 0;
			enabler = 0;
		}	
	});

// Find out user input and/or gives out default one
	function getDefaultFreq(divId){
		var freq2 = $(divId).val();
		if (freq2){
			return freq2;
		}
		else {
			return 15000;
		}

	}

	function playSound(freqGiven, sampleGiven){
		var freq = freqGiven;  // Frequency (cycles per second)
		var rate = sampleGiven;  // Sample rate (samples per second)
		for(var i = 0; i < 10000; i++) {
		    var time = i / rate;       
		    data[i] = 128 + Math.round(127 * (Math.sin(2 * Math.PI * freq * time)));
		}
		var wave = new RIFFWAVE(data);
		audio = new Audio(wave.dataURI);
	}

	function getDefaultSample(sampleId){
		var sample = $(sampleId).val();
		if (sample){
			return sample;
		}
		else {
			return 44100;
		}
	}
});