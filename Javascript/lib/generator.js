var fs = require('fs');
var logger = require('./logger.js');
var MainOpmo = require('./mainOpmo.js');
var Snippet = require('./snippet.js');
const opmoPath = '../Opusmodus';

class Generator{
  constructor(fs, logger,data){
    logger.start();
    this.data = data;
    this.insts = [];
  }
  genMainFile(){
    var mainfile = new MainOpmo(this.insts);
    mainfile.generate();
  }
  genSnippetFiles(){
    var insts = this.data.insts;
    var instKeys = Object.keys(insts);
    for(var i = 0; i < instKeys.length; i++){
      var inst = {};
      inst.name = instKeys[i];
      inst.content = inst[instKeys[i]];
      var snippet = new Snippet(this,inst);
      snippet.genOpmo();
    }
  }
  getTimeSignature(){
    var time = this.data.time;
    var ret = '\'(';
    for(var i = 0; i < time.length; i++){
      var _this = String(time[i]);
      ret += `(${_this})`;
    }
    ret += ')';
    this.timeSignature = ret;
  }
}

module.exports = Generator;
