import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private _storage: Storage | null = null;
  private FAVORITES_KEY = 'favorite_pokemons';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /** 🔹 Adiciona um Pokémon aos favoritos */
  async addFavorite(pokemon: any) {
    const favorites = (await this._storage?.get(this.FAVORITES_KEY)) || [];
    favorites.push(pokemon);
    await this._storage?.set(this.FAVORITES_KEY, favorites);
  }

  /** 🔹 Remove um Pokémon dos favoritos */
  async removeFavorite(pokemonId: number) {
    const favorites = (await this._storage?.get(this.FAVORITES_KEY)) || [];
    const updated = favorites.filter((p: any) => p.id !== pokemonId);
    await this._storage?.set(this.FAVORITES_KEY, updated);
  }

  /** 🔹 Verifica se é favorito */
  async isFavorite(pokemonId: number): Promise<boolean> {
    const favorites = (await this._storage?.get(this.FAVORITES_KEY)) || [];
    return favorites.some((p: any) => p.id === pokemonId);
  }

  /** 🔹 Retorna todos os favoritos */
  async getFavorites() {
    return (await this._storage?.get(this.FAVORITES_KEY)) || [];
  }
}
