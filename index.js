var navigator = require('web-midi-api');

navigator.requestMIDIAccess()
         .then(onMIDISuccess, onMIDIFailure);

var midi = null;
var inputs = [];
var outputs = [];

function onMIDISuccess(m){
  // console.log('成功')
  // console.log(m, 'm?')
  midi = m;

  var it = midi.inputs.values();
  for(var o = it.next(); !o.done; o = it.next()){
    inputs.push(o.value);
  }

  for(var i = 0; i < inputs.length; i++){
    inputs[i].onmidimessage = onMIDIEvent;
    const deviceName = inputs[i].name;

    inputs[i].onmidimessage = (e) => {
      console.log(e, 'event');
      console.log(deviceName, 'channel');
    };
  }
}

function onMIDIEvent(e){
  console.log(e, 'event fired');
}

function onMIDIFailure(msg){
  console.log('error called...', msg);
}
