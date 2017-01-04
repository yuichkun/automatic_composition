var fs = require('fs');
var logger = require('./logger.js');
const opmoPath = '../Opusmodus';

class Snippet{
  constructor(that,inst){
    this.parent = that;
    this.inst = inst;
  }

  genOpmo(){
    var data = this.parent.data;
    logger.genOpmo(this.inst);
    //returning value
    var opmo = "";
    var code = [
`(setf sine (gen-white-noise 100))
`,
`(setf t-sig (get-time-signature ${this.parent.timeSignature}))
`,
`(setf melo (tonality-map '(${data.scale[1]}) (vector-to-pitch '(c3 c5) sine)))
`,
`(setf omn (make-omn :pitch melo :length (span melo \'(s))))
`
  ];
    code.push(this.genFooter());

    function genSnippet(code){
      opmo += code;
    }
    for(var i = 0; i < code.length; i++){
      genSnippet(code[i]);
    }
    logger.showOpmo(opmo,this.inst.name);

    //EXPORT
    var instancePath = opmoPath + '/' + this.inst.name + '.opmo';
    fs.writeFile(instancePath, opmo);
    this.parent.insts.push(this.inst.name);
    logger.export("a snippet file to ", instancePath);
  }
  genFooter(){
    var name = this.inst.name;
    var footer =
`(def-score ${name}
         (:key-signature 'atonal
          :time-signature t-sig
          :tempo 120)
(${name} :omn omn)
)`;
    return footer;
  }
}

module.exports = Snippet;
