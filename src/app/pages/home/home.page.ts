import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

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

    constructor(
        private pokemonService: PokemonService,
        private router: Router
    ) { }

    ngOnInit() {
        this.pokemonService.getPokemonsWithDetails(40, 0).subscribe({
            next: (data) => {
                this.pokemons = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Erro ao carregar Pokémons:', err);
                this.loading = false;
            }
        });
    }

    openDetail(pokemon: any) {
        this.router.navigate(['/pokemon', pokemon.id]);
    }
}
