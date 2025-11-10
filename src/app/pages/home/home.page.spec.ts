import { TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    pokemonServiceSpy = jasmine.createSpyObj('PokemonService', ['getPokemonsWithDetails', 'getPokemonsCount']);
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'getFavorites', 'isFavorite', 'addFavorite', 'removeFavorite'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceSpy },
        { provide: FavoritesService, useValue: favoritesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar pokémons e favoritos', async () => {
    pokemonServiceSpy.getPokemonsCount.and.returnValue(of(100));
    pokemonServiceSpy.getPokemonsWithDetails.and.returnValue(of([{ id: 1, name: 'Pikachu' }]));
    favoritesServiceSpy.getFavorites.and.returnValue(Promise.resolve([{ id: 1 }]));

    await component.ngOnInit();

    expect(component.totalPages).toBe(5);
    expect(component.pokemons.length).toBe(1);
  });

  it('deve alternar favoritos corretamente', async () => {
    const pokemon = { id: 1, name: 'Bulbasaur' };

    favoritesServiceSpy.isFavorite.and.returnValue(Promise.resolve(false));
    favoritesServiceSpy.addFavorite.and.returnValue(Promise.resolve());

    await component.toggleFavorite(pokemon);

    expect(favoritesServiceSpy.addFavorite).toHaveBeenCalledWith(pokemon);
    expect(component.favorites).toContain(1);
  });
});
