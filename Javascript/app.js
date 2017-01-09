// function temp(){
//   console.log("sdlkfj");
// }
// var func = "temp" + "()";
// eval(func);
var fs = require('fs');
var csvParse = require('csv-parse');
//Object
var opmoGenerator = require('opmoGenerator');
//Function
var jsonConverter = opmoGenerator.jsonConverter;
//Class
var Generator = opmoGenerator.generator;
const csvPath = '../Excel/timeline.csv';
var parseOptions = {delimiter: ','};

// //Read the csv file and pass it to Opmo Generator
fs.createReadStream(csvPath).pipe(
  csvParse(parseOptions, function(err, data){
    var json = jsonConverter(csvPath, data);
    main(json);
  })
);

function main(data){
  var gen = new Generator(data);

  //Generate Global File
  gen.genGlobalFile();

  //Generate SnippetFiles
  gen.genSnippetFiles();

  //Generate the Main Opmo file that loads all the belonging files
  gen.genMainFile();

  //Exit
  gen.exit();
}
