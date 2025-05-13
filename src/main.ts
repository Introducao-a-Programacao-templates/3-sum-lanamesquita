import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let soma = 0;
let i = 1;

rl.on('line', (input) => {
    const numero = Number(input);
    soma = soma + numero;
    //console.log(`Soma: ${soma}`);
    if (i === 3) {
        rl.close();
        console.log(soma);
    } else i++;
});
