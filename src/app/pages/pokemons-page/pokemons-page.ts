import { ApplicationRef, Component, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { Pokemons } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
})
export default class PokemonsPage {
  private pokemonsService = inject(Pokemons);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  public loadOnPageChanged = effect(
    () => {
      // console.log('página cabio', this.currentPage);
      this.loadPokemons(this.currentPage());
    },
    {
      allowSignalWrites: true,
    },
  );

  public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe(isStable);

  // ngOnInit(): void {
  //   this.route.queryParamMap.subscribe(console.log);

  //   this.loadPokemons();

  // setTimeout(() => {
  //   this.isLoading.set(false);
  // }, 5000);
  // }

  public loadPokemons(page = 0) {
    // const pageToLoad = this.currentPage()! + page;

    this.pokemonsService
      .loadPage(page)
      .pipe(
        // tap(() =>
        //   this.router.navigate([], {
        //     queryParams: {
        //       page: pageToLoad,
        //     },
        //   }),
        // ),
        tap(() => this.title.setTitle(`Pokemons Page: ${page}`)),
      )

      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
        // console.log(pokemons);
      });
  }
}
