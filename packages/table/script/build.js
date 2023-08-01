const shell = require('shelljs');

shell.exec(
  'npx gulp build && npx tsc --emitDeclarationOnly --outDir lib && npx tsc --emitDeclarationOnly --outDir es',
  function (code, stdout, stderr) {
    if (code === 0) {
      console.log('build success');
      return;
    }
    console.log('Exit code:', code);
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
  },
);
