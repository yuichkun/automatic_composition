module.exports = {
  line : function(){
    console.log("-------------------------------------------------------------");
  },
  start : function(){
    console.log("STARTED: musicXMLConverter");
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
  genOpmo : function(inst){
    console.log('GENERATING: an opmo file for ' + inst.name);
    this.line();
  },
  showOpmo : function(opmo,name){
    console.log(`GENERATED: ${name}\n\n` + opmo);
    this.line();
  },
  export : function(content,path){
    console.log(`EXPORTED: ${content} ` + path);
    this.line();
  },
  exit : function(){
    console.log("EXIT: musicXMLConverter");
    this.line();
  }
}
