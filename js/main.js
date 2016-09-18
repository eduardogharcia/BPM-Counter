//Open Close Menu
document.getElementById('toggle-menu').addEventListener('click', function(){
	document.body.classList.toggle('menu-opened');
});


var taps = [];
var bpmDisplay = document.getElementById('bpm');


var bpmCounter = function(){
	curTime = new Date;
	var curTimeMs = curTime.getTime();
	
	if (taps.length > 5) {
		taps.shift();
	}

	taps.push(curTimeMs);

	if (taps.length > 1) {

		var deltaTimes = deltaTime(taps);

		if (deltaTimes.length >= 1) {
			var avg  =  deltaTimes.reduce(function(prev, cur){return prev+cur;}) / deltaTimes.length;
			var bpm = 60000 / avg;
			bpmDisplay.innerHTML = Math.round(bpm);
			document.getElementById('bpm-indicator').classList.add('visible');
		}
	}
}

var pad = document.getElementById('pad');
pad.addEventListener('click', bpmCounter);


var deltaTime = function (taps){
	var deltaTimes = [];
	for (var i = 1; i <= taps.length - 1; i++) {
		deltaTimes.push(taps[i] - taps[i-1]);
	}
	return deltaTimes;
}


var autoReset = function(){
	curTime = new Date;
	var curTimeMs = curTime.getTime();

	if (curTimeMs - taps[0] >= 3000 ) {
		//document.getElementById('bpm-indicator').classList.remove('visible');
		taps = [];
	}
}
window.setInterval(autoReset, 2000);


var fakeClick = function(){
	pad.classList.add('fakeActive');
	pad.click();
	setTimeout(function(){
		pad.classList.remove('fakeActive');
	}, 100);
}

document.onkeypress = fakeClick;