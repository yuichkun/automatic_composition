var fs = require('fs');
var logger = require('./lib/logger.js');
var jsonConverter = require('./lib/jsonConverter.js');
var Generator = require('./lib/generator.js');
var csvParse = require('csv-parse');
const csvPath = '../Data/timeline.csv';
var parseOptions = {delimiter: ','};

// //Read the csv file and pass it to Opmo Generator
fs.createReadStream(csvPath).pipe(
  csvParse(parseOptions, function(err, data){
    logger.line();
    logger.readCSV(csvPath,data);
    var json = jsonConverter(logger,data);
    main(json);
  })
);

function main(data){
  var gen = new Generator(fs,logger,data);
  //Calculate the time signature
  gen.getTimeSignature();
  //Generate SnippetFiles
  gen.genSnippetFiles();
  //Generate the Main Opmo file that loads all the belonging files
  gen.genMainFile();
  //EXIT
  logger.exit();
}
