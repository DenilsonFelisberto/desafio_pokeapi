import { TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { PokemonDetailPage } from './pokemon-detail.page';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('PokemonDetailPage', () => {
  let component: PokemonDetailPage;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    // 🔹 Cria os spies dos serviços injetados
    pokemonServiceSpy = jasmine.createSpyObj('PokemonService', ['getPokemon']);
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'getFavorites', 'isFavorite', 'addFavorite', 'removeFavorite'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateRoot', 'back']);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), PokemonDetailPage],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: PokemonService, useValue: pokemonServiceSpy },
        { provide: FavoritesService, useValue: favoritesServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          // useValue: { snapshot: { paramMap: new Map([['id', '1']]) } }
          // paramMap: of(new Map([['id', '1']]))
          useValue: {
            snapshot: {
              paramMap: { get: (key: string) => '1' }
            }
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(PokemonDetailPage);
    component = fixture.componentInstance;
  });

  // ✅ Teste 1 — criação do componente
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Teste 2 — busca de Pokémon ao iniciar
  it('deve buscar detalhes do Pokémon ao iniciar', async () => {
    const mockPokemon = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }],
    };

    // O serviço deve retornar um Observable com o mock
    pokemonServiceSpy.getPokemon.and.returnValue(of(mockPokemon));
    favoritesServiceSpy.getFavorites.and.returnValue(Promise.resolve([]));

    await component.ngOnInit();

    expect(component.pokemon).toEqual(mockPokemon);
    expect(component.loading).toBeFalse();
  });

  // ✅ Teste 3 — marcar como favorito
  it('deve marcar como favorito', async () => {
    const mockPokemon = { id: 1, name: 'bulbasaur' };
    favoritesServiceSpy.isFavorite.and.returnValue(Promise.resolve(false));
    favoritesServiceSpy.addFavorite.and.returnValue(Promise.resolve());

    await component.toggleFavorite(mockPokemon);

    expect(favoritesServiceSpy.addFavorite).toHaveBeenCalledWith(mockPokemon);
  });

  // ✅ Teste 4 — remover dos favoritos
  it('deve remover dos favoritos', async () => {
    const mockPokemon = { id: 1, name: 'bulbasaur' };
    component.favorites = [1];
    favoritesServiceSpy.isFavorite.and.returnValue(Promise.resolve(true));
    favoritesServiceSpy.removeFavorite.and.returnValue(Promise.resolve());

    await component.toggleFavorite(mockPokemon);

    expect(favoritesServiceSpy.removeFavorite).toHaveBeenCalledWith(mockPokemon.id);
  });

  // ✅ Teste 5 — voltar à página inicial
  it('deve voltar à página inicial', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
