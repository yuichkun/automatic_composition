var Logger = require('./Logger.js');

var convert = function(csvPath,data){
  Logger.line();
  Logger.readCSV(csvPath,data);
  var obj = {};
  //time-signature
  obj.time = extractData(data[0]);
  //scale
  obj.scale = extractData(data[1]);
  //get count of insts.(starts from 2)
  var numOfKeys = Object.keys(data).length;
  obj.instCount = numOfKeys-2;
  obj.insts = {};
  //loop through instruments
  for(var i = 2; i < numOfKeys; i++){
    obj.insts[data[i][0]] = [];
    for(var j = 1; j < data[i].length; j++){
      obj.insts[data[i][0]].push(data[i][j]);
    }
  }
  Logger.convertToJSON(obj);
  return obj;
}

function extractData(data){
  var ret = [];
  for(var i = 0; i < data.length; i++){
    if(i != 0){
      ret.push(data[i]);
    }
  }
  return ret;
}


module.exports = convert;
