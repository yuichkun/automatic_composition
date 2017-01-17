var Opmo = require('./Opmo');

class MainFile extends Opmo{
  constructor(data){
    super(data);
  }
  generate(){
    var content = "";
    content += '(init-seed 129)\n';
    content += this.genLoader();
    content += this.mergeSnippets();
    content += this.showMusicXML();
    content += this.showMidi();
    super.exportFile(content);
  }
  genLoader(){
    var instList = this.getInstList("string");
    var files = "\"global\"" + " " + instList;
    var loader =
`(let ((files '(${files})))
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
`
(setf path "~/Desktop/musicXMLGenerator/XML/output")
(compile-score '(${instList}) :output :musicxml :file path)
`;
    return mergedSnippets;
  }
  showMusicXML(){
    var musicXML =
`(display-musicxml *last-score*)
`;
    return musicXML;
  }
  showMidi(){
    var midi =
`;(display-midi *last-score*)
`;
    return midi;
  }
  getInstList(type){
    var ret = "";
    switch (type){
      case "string":
        for(var i = 0; i < this.content.length; i++){
          var _this = `\"${this.content[i]}\"`
          if(i != this.content.length - 1){
            _this += " ";
          }
          ret += _this;
        }
        break;
      case "symbol":
        for(var i = 0; i < this.content.length; i++){
          var _this = this.content[i];
          if(i < this.content.length-1){
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

module.exports = MainFile;
