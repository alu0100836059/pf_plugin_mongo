var exec = require('child_process').exec;
var deploy = function(iaasIP,pathiaas){
  function puts(error, stdout, stderr) { console.log(stdout) }
  exec("ssh usuario@" + iaasIP + " 'cd " + pathiaas + "; git pull'", puts);
}
module.exports = deploy;
