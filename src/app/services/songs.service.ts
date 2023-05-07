import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { settings } from 'src/environment/environment';
import { Song } from '../models/song';
@Injectable({
  providedIn: 'root'
})
export class SongsService {


  private readonly baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = settings.baseUrl;
  }

  getSongs() {
    const req$ = this.http.get<Song[]>(`${this.baseUrl}/Songs`);
    return firstValueFrom(req$);
  }

  deleteSong(id: number) {
    const req$ = this.http.delete<Song[]>(`${this.baseUrl}/Songs/${id}`);
    return firstValueFrom(req$);
  }

  createSong(song: Song) {
    const req$ = this.http.post<Song[]>(`${this.baseUrl}/Songs`, song);
    return firstValueFrom(req$);
  }

  editSong(id: number, song: Partial<Song>): Promise<Song[]> {
    const req$ = this.http.put<Song[]>(`${this.baseUrl}/Songs/${id}`, song);
    return firstValueFrom(req$);
  }
}
