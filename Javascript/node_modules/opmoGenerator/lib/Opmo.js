var fs = require('fs');
var Logger = require('./Logger.js');
const opmoPath = '../Opusmodus';

class Opmo{
  constructor(data){
    this.name = data.name;
    this.content = data.content;
  }

  exportFile(opmo){
    var fileName = this.name;
    var path = opmoPath + '/' + fileName + '.opmo';
    fs.writeFile(path, opmo);
    Logger.showOpmo(opmo, fileName);
    Logger.export(this.name, path);
  }
}


module.exports = Opmo;
