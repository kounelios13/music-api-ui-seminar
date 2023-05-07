import { Pipe, PipeTransform } from '@angular/core';
import { GenreService } from '../services/genre.service';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  constructor(private genreService: GenreService){}
  transform(value: number): unknown {
    const genre = this.genreService.getGenreById(value);
    return genre ? genre.genreName : 'Unknown Genre';
  }

}
