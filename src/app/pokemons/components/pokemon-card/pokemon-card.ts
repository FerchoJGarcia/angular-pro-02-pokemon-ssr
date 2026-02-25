import { Component, computed, effect, input, signal } from '@angular/core';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`,
  );

  // logEffect = effect(() => {
  //   console.log('PokemonCard: ', this.pokemon());
  // });
}
