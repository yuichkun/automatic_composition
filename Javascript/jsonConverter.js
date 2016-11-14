var convert = function(logger,data){
  var obj = {};
  //time-signature
  obj.time = data[0];
  //scale
  obj.scale = data[1];
  //get count of insts.(starts from 2)
  obj.instCount = Object.keys(data).length;
  //loop through instruments
  for(var i = 2; i < obj.instCount; i++){
    obj[data[i][0]] = [];
    for(var j = 1; j < data[i].length; j++){
      obj[data[i][0]].push(data[i][j]);
    }
  }
  logger.convertToJSON(obj);
  return obj;
}

module.exports = convert;
