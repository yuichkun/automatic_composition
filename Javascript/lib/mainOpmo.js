var fs = require('fs');
var logger = require('./logger.js');
const opmoPath = '../Opusmodus';

class MainOpmo{
  constructor(insts){
    this.insts = insts;
  }
  generate(){
    var content = "";
    content += this.genLoader();
    content += this.mergeSnippets();
    content += this.showMusicXML();
    var mainPath = opmoPath + '/main.opmo';
    fs.writeFile(mainPath, content);
    logger.showOpmo(content,"Main");
    logger.export("a loader file to ", mainPath);
  }
  genLoader(){
    var instList = this.getInstList("string");
    var loader =
`(let ((files '(${instList})))
  (loop for file in files do
    (load (merge-pathnames file *load-truename*))
  )
)
`;
    return loader;
  }
  mergeSnippets(){
    var instList = this.getInstList("symbol");
    var mergedSnippets =
`(compile-score '(${instList}))
`;
    return mergedSnippets;
  }
  showMusicXML(){
    var musicXML =
`(display-musicxml *last-score*)
`;
    return musicXML;
  }
  getInstList(type){
    var ret = "";
    switch (type){
      case "string":
        for(var i = 0; i < this.insts.length; i++){
          var _this = `\"${this.insts[i]}\"`
          if(i != this.insts.length - 1){
            _this += " ";
          }
          ret += _this;
        }
        break;
      case "symbol":
        for(var i = 0; i < this.insts.length; i++){
          var _this = this.insts[i];
          if(i < this.insts.length-1){
            _this += " ";
          }
          ret += _this;
        }
        break;
      default:
        ret = "";
    }
    return ret;
  }
}

module.exports = MainOpmo;
