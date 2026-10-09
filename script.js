const formBusca = document.querySelector("#formBusca");
const campoPokemon = document.querySelector("#campoPokemon");
const resultado = document.querySelector("#resultado");

formBusca.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 1. Validação do campo (não vazio e convertido para minúsculo)
  const nomePokemon = campoPokemon.value.trim().toLowerCase();

  if (nomePokemon === "") {
    resultado.innerHTML = `<p class="erro">Por favor, digite o nome de um Pokémon.</p>`;
    return;
  }

  // ESTADO 1: Carregando
  resultado.innerHTML = `<p class="carregando">Buscando Pokémon...</p>`;

  try {
    // 2. Consumo da API com fetch + async/await
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);

    // Tratamento de erro HTTP (ex: 404)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Pokémon não encontrado.");
      }
      throw new Error("Erro ao buscar dados do Pokémon.");
    }

    const pokemon = await response.json();

    // ESTADO 2: Sucesso (exibição de nome, imagem e tipos)
    exibirPokemon(pokemon);

  } catch (erro) {
    // ESTADO 3: Erro (exibe mensagem de erro customizada)
    resultado.innerHTML = `<p class="erro">${erro.message}</p>`;
  }
});

// Função para renderizar os dados do Pokémon na tela
function exibirPokemon(pokemon) {
  // Extrai os nomes dos tipos (ex: ["electric"], ["fire", "flying"])
  const tipos = pokemon.types.map(t => t.type.name).join(", ");

  resultado.innerHTML = `
    <div class="card">
      <h2 style="text-transform: capitalize;">${pokemon.name}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p><strong>Tipo(s):</strong> ${tipos}</p>
    </div>
  `;
}
