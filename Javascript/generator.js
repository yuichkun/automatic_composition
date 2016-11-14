var fs = require('fs');
var logger = require('./logger.js');
var jsonConverter = require('./jsonConverter.js');
var csvParse = require('csv-parse');
var parseOptions = {delimiter: ','};
const csvPath = '../Data/timeline.csv';
const opmoPath = '../Opusmodus';

//Start
logger.start();
//Read the csv file and pass it to Opmo Generator
fs.createReadStream(csvPath).pipe(
  csvParse(parseOptions, function(err, data){
    logger.readCSV(csvPath);
    var json = jsonConverter(logger,data);
    main(json);
  })
);

//Opmo Generator
function main(data){
  //Generate Snippets
  genOpmo(data);
  //Generate Loader
  genLoader();
  //EXIT
  logger.exit();
}

function genOpmo(data){
  logger.genOpmo();
  //returning value
  var opmo = "";
  function genSnippet(code){
    opmo += code;
  }
  var code = [
`(setf sine (gen-white-noise 100))
`,
`(setf melo (tonality-map '(${data.scale[1]}) (vector-to-pitch '(c3 c5) sine)))
`,
`(setf omn (make-omn :pitch melo :length (span melo \'(s))))
`
];
  code.push(genFooter());

  for(var i = 0; i < code.length; i++){
    genSnippet(code[i]);
  }
  logger.showOpmo(opmo);

  //EXPORT
  var melodyPath = opmoPath+'/melody.opmo';
  fs.writeFile(melodyPath, opmo);
  logger.export("a snippet file to ", melodyPath);

  function genFooter(){
      var footer =
`(def-score test
           (:key-signature 'atonal
            :time-signature '(4 4)
            :tempo 120)
(piano :omn omn)
)`;
    return footer;
  }
}

function genLoader(){
  var loader =
`(let ((files '("score" "melody")))
  (loop for file in files do
    (load (merge-pathnames file *load-truename*))
  )
)`;
  var mainPath = opmoPath + '/main.opmo';
  fs.writeFile(mainPath, loader);
  logger.export("a loader file to ", mainPath);
}
