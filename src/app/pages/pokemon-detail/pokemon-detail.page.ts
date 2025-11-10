import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true, // ✅ standalone também
  imports: [IonicModule, CommonModule],
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  pokemon: any;
  loading = true;
  favorites: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService // 👈 injeta o serviço
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.pokemonService.getPokemon(id).subscribe({
        next: async (data) => {

          console.log('====================================');
          console.log(data);
          console.log('====================================');

          this.pokemon = data;
          this.favorites = (await this.favoritesService.getFavorites()).map((f: any) => f.id);
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar Pokémon:', err);
          this.loading = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  /** ⭐ Marca / desmarca como favorito */
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
}
