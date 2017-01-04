var black   = '\u001b[30m';
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var yellow  = '\u001b[33m';
var blue    = '\u001b[34m';
var magenta = '\u001b[35m';
var cyan    = '\u001b[36m';
var white   = '\u001b[37m';
var reset   = '\u001b[0m';

var startEndCl = magenta;
var lineCl = green;
var fileNameCl = blue;

module.exports = {
  line : function(){
    console.log(lineCl + "-------------------------------------------------------------" + reset);
  },
  start : function(){
    console.log(startEndCl + "STARTED: musicXMLConverter" + reset);
    console.time("TIME");
    this.line();
  },
  readCSV : function(csvPath,data){
    console.log('READING: CSV file from ' + csvPath + "\n");
    console.log('Raw Data: \n' + data);
    this.line();
  },
  convertToJSON : function(obj){
    console.log('CONVERTING: CSV file into JSON\n');
    console.log('JSON Data:');
    console.log(obj);
    this.line();
  },
  genSnippet : function(fileName){
    console.log('GENERATING: an opmo file for ' + fileNameCl + fileName + reset);
    this.line();
  },
  showOpmo : function(opmo,name){
    console.log("GENERATED: " + fileNameCl + name + reset + "\n");
    console.log(cyan + opmo + reset);
    this.line();
  },
  export : function(content,path){
    console.log("EXPORTED: " + "a " + fileNameCl + content + reset + " file to " + path);
    this.line();
  },
  exit : function(){
    console.log(startEndCl + "EXIT: musicXMLConverter" + reset);
    console.timeEnd("TIME")
    this.line();
  }
}
