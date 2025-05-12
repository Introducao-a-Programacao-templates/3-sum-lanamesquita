import prompt from 'prompt-sync';
const entrada: any = prompt();

/* Dicas:
1. Use o comando console.log() para imprimir mensagens no console.
2. Use o comando entrada() para ler entradas do usuário.
    let number = entrada();
3. Use o comando Number() para converter uma string em número.
4. Rode com o comando: npm run dev
*/

console.log('Digite os 3 números');
let str1 = entrada();
let num1 = Number(str1);
let str2 = entrada();
let num2 = Number(str2);
let str3 = entrada();
let num3 = Number(str3);
let soma = num1 + num2 + num3;

console.log(soma);
