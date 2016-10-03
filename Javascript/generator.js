var fs = require('fs');

var text = "hello";
text += " world";

fs.writeFile("testFile.txt", text);

