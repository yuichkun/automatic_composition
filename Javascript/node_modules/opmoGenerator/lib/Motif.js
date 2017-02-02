var motifList = require('./motifList');
var motifManipulation = require('./motifManipulation');
var evalMotif = motifManipulation.evalMotif;
var genVelocity = motifManipulation.genVelocity;


class Motif {

  constructor(omnIndex, timeSig, funcName, args, velocity){
    this.omnIndex = omnIndex;
    this.timeSig = timeSig;
    this.args = args;
    this.omn = "";
    this.funcName = funcName;
    this.velocity = velocity;
    this.tonality = '\'chromatic';
    // if(this.omnIndex < 19){
    //   this.tonality = '\'chromatic';
    // } else {
    //   // this.tonality = '\'tonality' + this.omnIndex;
    //   this.tonality = '\'minor-pentatonic';
    // }
  }

  generateOMN(){

    if(this.funcName == ''){
      this.genBlank();
    } else {
      var motif = motifList[this.funcName];
      this.handleMotif(motif);
      this.makeOMN();
    }
    return this.omn;
  }

  handleMotif(motif){
    // console.log("this is ", this);
    // console.log("handling this motif", motif);

    var paramList = ['pitch', 'length', 'articulation'];
    paramList.forEach(
      (param)=>{
        if(motif.hasOwnProperty(param)){
          var value = evalMotif(motif[param], this);
          this.genParam(param, value);
        } else {
          this.genParam(param, 'nil');
        }
      }
    );
    if(motif.swallow){
      // console.log("SWALLLOOOOOW");
      this.genParam("pitch", this.genSwallow());
    }

    this.genParam("velocity", genVelocity(this.velocity));

    // this.genParam("articulation", "nil");

  }

  genParam(param, value){
    this.omn += `(setf ${param} ${value})\n`;
  }

  genSwallow(){
    return `(setf pitch (gen-swallow length pitch))\n`;
  }

  genBlank(index){
    this.omn += `(setf omn${this.omnIndex} '(-${this.timeSig}))\n`
  }

  makeOMN(){
    this.omn += `(setf omn${this.omnIndex} (make-omn :pitch pitch :length length :velocity velocity :articulation articulation))\n`;
  }

}

module.exports = Motif;
