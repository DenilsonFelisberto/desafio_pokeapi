import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ página standalone
  imports: [IonicModule, CommonModule, RouterModule], // ✅ módulos necessários
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  loading = true;
  viewMode: 'list' | 'grid' = 'list'; // 👈 modo padrão: lista
  favorites: number[] = [];

  limit = 20;
  currentPage = 1;
  totalPages = 0;
  totalPokemons = 0;

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private router: Router
  ) { }

  async ngOnInit() {
    // 🔹 Primeiro busca o total de pokémons
    this.pokemonService.getPokemonsCount().subscribe({
      next: (count) => {
        this.totalPokemons = count;
        this.totalPages = Math.ceil(count / this.limit);
        this.loadPage(1);
      },
      error: (err) => console.error('Erro ao buscar total de pokémons:', err)
    });
  }

  async loadPage(page: number) {
    this.loading = true;
    const offset = (page - 1) * this.limit;

    this.pokemonService.getPokemonsWithDetails(this.limit, offset).subscribe({
      next: async (data) => {

        console.log('====================================');
        console.log(data);
        console.log('====================================');

        this.pokemons = data;
        await this.loadFavorites();
        this.currentPage = page;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar Pokémons:', err);
        this.loading = false;
      }
    });
  }

  /** ✅ Chamado sempre que a tela ganha foco */
  async ionViewWillEnter() {
    await this.loadFavorites();
  }

  /** 🔁 Recarrega favoritos */
  private async loadFavorites() {
    const favs = await this.favoritesService.getFavorites();
    this.favorites = favs.map((f: any) => f.id);
  }

  openDetail(pokemon: any) {
    this.router.navigate(['/pokemon', pokemon.id]);
  }

  changeView(mode: 'list' | 'grid') {
    this.viewMode = mode;
  }

  /** ⭐ Marca/desmarca como favorito */
  async toggleFavorite(pokemon: any) {
    const isFav = await this.favoritesService.isFavorite(pokemon.id);
    if (isFav) {
      await this.favoritesService.removeFavorite(pokemon.id);
      this.favorites = this.favorites.filter(id => id !== pokemon.id);
    } else {
      await this.favoritesService.addFavorite(pokemon);
      this.favorites.push(pokemon.id);
    }
  }

  // Verifica se item já está nos favoritos
  isFavorite(id: number): boolean {
    return this.favorites.includes(id);
  }

  // 🔹 Botão Próxima Página
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }

  // 🔹 Botão Página Anterior
  prevPage() {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }
}
