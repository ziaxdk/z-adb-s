//"C:\Program Files (x86)\ImageMagick-6.8.6-Q16"

var async = require('async'),
  childProcess = require('child_process'),
  //Builder = require( './node-spritesheet' ).Builder,

  //sprite = require('node-sprite'),
  i = 1,
  deg = 1,
  jobs = [];


var rotate = function (callback) {
  console.log("Processing: " + deg);
  // "C:\Program Files (x86)\ImageMagick-6.8.6-Q16\convert.exe" plane_c.png -rotate 45 +repage -gravity center -crop 200x200+0+0 img/final.png

  var p = childProcess.exec('"C:\\Program Files (x86)\\ImageMagick-6.8.6-Q16\\convert.exe" plane_c.png -background transparent -rotate ' + deg + ' +repage -gravity center -crop 200x200+0+0 img/plane_' + deg + '.png', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
    }
    //console.log(stdout);
  });

  p.on('exit', function (code) {
    callback(null, ++deg);
  });
};


var sprite = function (callback) {
  var p = childProcess.exec('"C:\\Program Files (x86)\\ImageMagick-6.8.6-Q16\\convert.exe" img/plane*.png -append img/result/all.png', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: ' + error.code);
      console.log('Signal received: ' + error.signal);
    }
    //console.log(stdout);
  });

  p.on('exit', function (code) {
    callback(null, {});
  });

};

for (i = 1; i <= 360; i++) {
  jobs.push(rotate);
}
jobs.push(sprite);

async.series(jobs);

//builder.build( function() {
//    console.log( "Built from " + builder.images.length + " images" );
//});
