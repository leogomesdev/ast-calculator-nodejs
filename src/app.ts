import * as readline from 'readline';

const readlineTool = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startFromConsole() {
  readlineTool.question('Type your expression and press [ENTER]:\n', (expression) => {
    console.log(`The answer is: ${expression}\n`);
    startFromConsole();
  });
}

startFromConsole();
