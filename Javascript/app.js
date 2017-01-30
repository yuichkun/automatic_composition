var fs = require('fs');
var csvParse = require('csv-parse');
var opmoGenerator = require('opmoGenerator');
var jsonConverter = opmoGenerator.jsonConverter;
var Generator = opmoGenerator.generator;
// const csvPath = '../Excel/test.csv';
// const csvPath = '../Excel/timelineI.csv';
const csvPath = '../Excel/timelineII.csv';
const parseOptions = {delimiter: ','};

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
