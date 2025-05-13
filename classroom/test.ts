import { spawnSync } from 'child_process';
import * as fs from 'fs';

const tests = [
    { input: '2\n3\n4\n', expected: '9' },
    { input: '12\n17\n24', expected: '53' },
    { input: '-10\n-4\n23', expected: '9' },
];

let passed = 0;
let total = 3;

console.log(
    '\n\n---------------------------\n\n🔍 Iniciando verificação da atividade...\n'
);

// Teste 1: se o resultado está correto
tests.forEach((test, index) => {
    console.log('Testando: ' + test.input);

    const result = spawnSync('tsx', ['src/main.ts'], {
        input: test.input,
        encoding: 'utf-8',
    });

    const output = result.stdout.trim().split(/\r?\n/).pop(); // pega a última linha da saída
    const success = output === test.expected;

    if (success) {
        console.log(
            `✅ Teste ${index + 1}/${total}: saída correta (${output})`
        );
        passed++;
    } else {
        console.log(
            `❌ Teste ${index + 1}/${total}: esperado "${
                test.expected
            }", mas recebeu "${output}"`
        );
    }
});

console.log(`\n🎯 Resultado: ${passed}/${total} testes passaram.`);
console.log('\n---------------------------\n');

process.exit(passed === total ? 0 : 1);
