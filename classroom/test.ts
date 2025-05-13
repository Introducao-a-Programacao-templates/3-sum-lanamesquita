import { spawnSync, execSync } from 'child_process';
import * as fs from 'fs';

type TestCase = {
    input: string;
    expected: number;
};

const tests: TestCase[] = [
    { input: '2\n3\n4', expected: 9 },
    { input: '12\n17\n24', expected: 53 },
    { input: '-10\n-4\n23', expected: 9 },
];

let passed = 0;
let total = 4;

console.log(
    '\n\n---------------------------\n\n🔍 Iniciando verificação da atividade...\n'
);

// Teste 1: Verifica se o projeto compila com npm run build
try {
    if (fs.existsSync('package.json')) {
        execSync('npm install', { stdio: 'ignore' });
        execSync('npm run build', { stdio: 'ignore' });
        console.log(
            `✅ Teste 1/${total}: Projeto compilou com sucesso (npm run build).\n\n`
        );
        passed++;
    } else {
        console.log(
            `❌ Teste 1/${total}: Arquivo package.json não encontrado.\n\n`
        );
    }
} catch (e) {
    if (e instanceof Error) {
        console.log(
            `❌ Teste 1/${total}: Erro ao rodar npm run build: ` +
                e.message +
                '\n\n'
        );
    }
}

// Teste 2-4: se o resultado está correto
tests.forEach((test, index) => {
    const result = spawnSync('tsx', ['src/main.ts'], {
        input: test.input,
        encoding: 'utf-8',
    });

    const output = result.stdout.trim().split(/\r?\n/).pop(); // pega a última linha da saída
    console.log(typeof output);
    console.log(output);
    console.log(typeof test.expected);
    console.log(test.expected);
    console.log(Number(output) === test.expected);
    const success = Number(output) === test.expected;

    if (success) {
        console.log(
            `✅ Teste ${index + 2}/${total}: ` +
                '\n>> ENTRADAS\n' +
                test.input +
                '\n>> SAÍDA\n' +
                output +
                '\n\n'
        );
        passed++;
    } else {
        console.log(
            `❌ Teste ${index + 2}/${total}: esperado "${
                test.expected
            }", mas recebeu "${output}"\n\n`
        );
    }
});

console.log(`\n🎯 Resultado: ${passed}/${total} testes passaram.`);
console.log('\n---------------------------\n');

process.exit(passed === total ? 0 : 1);
