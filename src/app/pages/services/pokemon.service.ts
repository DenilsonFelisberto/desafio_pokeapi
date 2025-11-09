import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService {
    private http = inject(HttpClient);
    private base = 'https://pokeapi.co/api/v2';

    getPokemons(limit = 20, offset = 0): Observable<any> {
        return this.http.get<any>(`${this.base}/pokemon?limit=${limit}&offset=${offset}`);
    }

    getPokemon(nameOrId: string | number): Observable<any> {
        return this.http.get<any>(`${this.base}/pokemon/${nameOrId}`);
    }

    getPokemonsWithDetails(limit = 20, offset = 0): Observable<any[]> {
        return this.getPokemons(limit, offset).pipe(
            switchMap(result => {
                const calls = result.results.map((p: any) => this.getPokemon(p.name));
                return forkJoin(calls);
            })
        );
    }
}
