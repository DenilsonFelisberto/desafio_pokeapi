import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

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
  // name = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.pokemonService.getPokemon(id).subscribe({
        next: (data) => {
          this.pokemon = data;
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
}
