module.exports = {
  line : function(){
    console.log("-------------------------------------------------------------");
  },
  start : function(){
    this.line();
    console.log("STARTED: musicXMLConverter");
    this.line();
  },
  readCSV : function(csvPath){
    console.log('READING: CSV file from ' + csvPath);
    this.line();
  },
  convertToJSON : function(obj){
    console.log('CONVERTING: CSV file to JSON');
    console.log(obj);
    this.line();
  },
  genOpmo : function(){
    console.log('GENERATING: an opmo file');
    this.line();
  },
  showOpmo : function(opmo){
    console.log("GENERATED:\n\n" + opmo);
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
