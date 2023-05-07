import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { settings } from 'src/environment/environment';
import { Genre } from '../models/genre';
import { firstValueFrom, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genres: Genre[] = [];
  private readonly baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = settings.baseUrl;
  }

  getGenres(): Promise<Genre[]> {
    if (this.genres.length > 0){
      return Promise.resolve(this.genres);
    }
    const req$ = this.http.get<Genre[]>(this.baseUrl + '/Genres')
      .pipe(tap(value => {
        this.genres = value;
      }))
    return firstValueFrom(req$)
  }

  getGenreById(id: number): Genre | undefined {
    return this.genres.find(e => e.id == id);
  }

  createGenre(genre: Partial<Genre>) {
    const url = `${this.baseUrl}/Genres`;
    const req$ = this.http.post<Genre[]>(url, genre).pipe(
      tap(data => {
        if (data) {
          this.genres = data;
        }
      })
    )
    return firstValueFrom(req$);
  }

  editGenre(id: number, genre: Genre) {
    const url = `${this.baseUrl}/Genres/${id}`;
    const req$ = this.http.put<Genre[]>(url, genre).pipe(
      tap(data => {
        if (data) {
          this.genres = data;
        }
      })
    )
    return firstValueFrom(req$);
  }

  deleteGenre(id: number) {
    const url = `${this.baseUrl}/Genres/${id}`;
    const req$ = this.http.delete<Genre[]>(url).pipe(
      tap(data => {
        if (data) {
          this.genres = data;
        }
      })
    )
    return firstValueFrom(req$);
  }
}
