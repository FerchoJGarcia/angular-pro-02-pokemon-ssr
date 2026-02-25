const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;

(async () => {
  const fs = require('fs');

  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  let fileContent = pokemonIds.map((id) => `/pokemons/${id}`).join('\n');

  for (let index = 1; index <= TOTAL_PAGES; index++) {
    fileContent += `\n/pokemons/page/${index}`;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`);
    if (!response.ok) throw new Error(`PokeAPI request failed: ${response.status}`);

    const pokemonNameList = await response.json();

    fileContent += '\n';
    fileContent += pokemonNameList.results.map((pokemon) => `/pokemons/${pokemon.name}`).join('\n');
  } catch (error) {
    console.warn('[prerender-routes] Could not fetch pokemon names from PokeAPI. Skipping.', error);
  }

  fs.writeFileSync('routes.txt', fileContent);
})();
