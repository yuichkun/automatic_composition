//Read Files
var fs = require('fs');
const csvPath = '../Data/timeline.csv';
const opmoPath = '../Opusmodus/melody.opmo';
//Parse Data from csv to Opusmodus
var csvParse = require('csv-parse');
var parseOptions = {delimiter: ','};

//Console
var consoleLine = "-------------------------------------------------------------";
console.log(consoleLine);
console.log("MUSIC-XML-CONVERTER STARTED.");
console.log(consoleLine);

//Read the csv file and pass it to Opmo Generator
fs.createReadStream(csvPath).pipe(
  csvParse(parseOptions, function(err, data){
    console.log('READING CSV FILE FROM ' + csvPath);
    console.log(consoleLine);
    genOpmo(data);
  })
);

//Opmo Generator
function genOpmo(data){
  console.log('GENERATING OPMO FILE...');
  console.log(consoleLine);
  var bars = data[0];
  var instCount = Object.keys(data).length;
  //loop through instruments
  for(var i = 2; i < instCount; i++){
    // console.log(data[i]);
  }

  var sine =
`(setf sine (gen-white-noise 100))
`;

  var melo =
`(setf melo (tonality-map '(${data[1][1]}) (vector-to-pitch '(c3 c5) sine)))
`;

  var omn =
`(setf omn (make-omn :pitch melo :length (span melo \'(s))))
`;

  var score =
`(def-score test
           (:key-signature 'atonal
            :time-signature '(4 4)
            :tempo 120)
(piano :omn omn)
)`;

  var opmo = "";
  opmo += sine;
  opmo += melo;
  opmo += omn;
  opmo += score;
  fs.writeFile(opmoPath, opmo);
  console.log("EXPORTED FILE TO " + opmoPath);
  console.log(consoleLine);
}
