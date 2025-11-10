import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private base = 'https://pokeapi.co/api/v2';

  getPokemons(limit = 40, offset = 0): Observable<{ results: any[] }> {
    return this.http.get<{ results: any[] }>(`${this.base}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemon(nameOrId: string | number): Observable<{ results: any[] }> {
    return this.http.get<{ results: any[] }>(`${this.base}/pokemon/${nameOrId}`);
  }

  getPokemonsWithDetails(limit = 40, offset = 0): Observable<any[]> {
    return this.getPokemons(limit, offset).pipe(
      switchMap((result: { results: any[] }) => {
        const calls = result.results.map((p: any) => this.getPokemon(p.name));
        return forkJoin(calls);
      })
    );
  }

  getPokemonsCount(): Observable<number> {
    return this.http
      .get<{ count: number }>(`${this.base}/pokemon?limit=1`)
      .pipe(map((response: { count: number }) => response.count));
  }

}
