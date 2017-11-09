var navigator = require('web-midi-api');

navigator.requestMIDIAccess().then(onMIDISuccess,onMIDIFailure);

var midi = null;
var inputs = [];
var outputs = [];

function onMIDISuccess(m){
  console.log('成功')
  console.log(m, 'm?')
  midi = m;
  var it = midi.inputs.values();
  for(var o = it.next(); !o.done; o = it.next()){
    inputs.push(o.value);
  }
  var ot = midi.outputs.values();
  for(var o = ot.next(); !o.done; o = ot.next()){
    outputs.push(o.value);
  }

  for(var cnt=0;cnt < inputs.length;cnt++){
    inputs[cnt].onmidimessage = onMIDIEvent;
  }
}

function onMIDIFailure(msg){
  console.log("onMIDIFailure()呼ばれただと？:"+msg);
}

function onMIDIEvent(e){
  if(e.data[2] != 0){
    // なにかをうけとったときの処理
    console.log(e.data[2]);
  }
}

function sendMIDINoteOn(note){
  if(outputs.length > 0){
    outputs[0].send([0x90,note,0x7f]);
  }
}
