var convert = function(logger,data){
  var obj = {};
  //time-signature
  obj.time = data[0];
  //scale
  obj.scale = data[1];
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
  logger.convertToJSON(obj);
  return obj;
}

module.exports = convert;
