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
    limit = 20;
    offset = 0;

    constructor(
        private pokemonService: PokemonService,
        private router: Router
    ) { }

    ngOnInit() {
        this.pokemonService.getPokemonsWithDetails(20, 0).subscribe({
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

    // loadPokemons(event?: any) {
    //     this.loading = true;
    //     this.ps.getPokemonsWithDetails(this.limit, this.offset).subscribe({
    //         next: (items) => {
    //             this.pokemons = [...this.pokemons, ...items];
    //             this.offset += this.limit;
    //             this.loading = false;
    //             if (event) event.target.complete();
    //         },
    //         error: (err) => {
    //             console.error(err);
    //             this.loading = false;
    //             if (event) event.target.complete();
    //         },
    //     });
    // }

    // doRefresh(event: any) {
    //     this.offset = 0;
    //     this.pokemons = [];
    //     this.loadPokemons(event);
    // }
}
