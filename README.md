### ⚡ Diferença de Performance: `Promise.all` vs. `await` Sequencial

A principal diferença entre usar múltiplos `await` em sequência e utilizar `Promise.all()` está na forma como o tempo de rede é aproveitado e na **execução concorrente** das requisições.

#### 1. `await` Sequencial (Execução em Série)
Quando você coloca um `await` em cada linha, o JavaScript **pausa a execução** da função e espera a Promise atual ser resolvida antes de sequer iniciar a próxima requisição.

```javascript
// Ocorre em série: Requisição 2 só inicia APÓS a Requisição 1 terminar
const pokemon1 = await fetch("[https://pokeapi.co/api/v2/pokemon/pikachu](https://pokeapi.co/api/v2/pokemon/pikachu)"); // Leva ~300ms
const pokemon2 = await fetch("[https://pokeapi.co/api/v2/pokemon/charmander](https://pokeapi.co/api/v2/pokemon/charmander)"); // Leva ~300ms
const pokemon3 = await fetch("[https://pokeapi.co/api/v2/pokemon/squirtle](https://pokeapi.co/api/v2/pokemon/squirtle)"); // Leva ~300ms

// Tempo total aproximado: 300ms + 300ms + 300ms = ~900ms

2. Promise.all() (Execução Concorrente/Paralela)
O Promise.all() recebe um array de Promises e dispara todas as requisições ao mesmo tempo. O await é aplicado uma única vez para aguardar até que todas sejam resolvidas.

// Dispara todas as requisições simultaneamente no tempo de rede
const promessas = [
  fetch("[https://pokeapi.co/api/v2/pokemon/pikachu](https://pokeapi.co/api/v2/pokemon/pikachu)"),
  fetch("[https://pokeapi.co/api/v2/pokemon/charmander](https://pokeapi.co/api/v2/pokemon/charmander)"),
  fetch("[https://pokeapi.co/api/v2/pokemon/squirtle](https://pokeapi.co/api/v2/pokemon/squirtle)")
];

// Espera todas as requisições terminarem juntas
const respostas = await Promise.all(promessas);

// Tempo total aproximado: ~300ms (o tempo da requisição mais demorada)
