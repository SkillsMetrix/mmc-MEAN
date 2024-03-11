import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EmptyError } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
import { DataService } from 'src/app/Service/data.service';
import {
  getMovies,
  getMoviesSuccess,
  addMovies,
  addMoviesSuccess,
} from '../Actions/movie.action';

@Injectable()
export class MovieEffects {
  loadMovie$ = createEffect(() =>
    this.action$.pipe(
      ofType(getMovies),
      exhaustMap(() =>
        this.dataService.getMovies().pipe(
          map((movies) => getMoviesSuccess(movies)),
          catchError(() => EmptyError)
        )
      )
    )
  );

  addMovie$ = createEffect(() =>
    this.action$.pipe(
      ofType(addMovies),
      tap((movie) => console.log(movie)),
      concatMap(({ movie }) =>
        this.dataService.addMovies(movie).pipe(
          map((newMovie) => addMoviesSuccess(newMovie)),
          catchError(() => EmptyError)
        )
      )
    )
  );

  constructor(private action$: Actions, private dataService: DataService) {}
}


----


  import { createAction, props } from '@ngrx/store';
import { Movie } from '../../Models/movie';

export const getMovies = createAction('[Movie] Get movie');
export const getMoviesSuccess = createAction(
  '[Movie] Get movie success',
  (movies: ReadonlyArray<Movie>) => ({ movies })
  // props<{ movies: ReadonlyArray<Movie> }>()
);
export const addMovies = createAction(
  '[Movie] Add movie',
  (movie: Movie) => ({ movie })
  // props<{ movie: Movie }>()
);
export const addMoviesSuccess = createAction(
  '[Movie] Add movie success',
  // props<{ movie: Movie }>(),
  (movie: Movie) => ({ movie })
);


---
  import { createReducer, on } from '@ngrx/store';
import { Movie } from 'src/app/Models/movie';
import {
  addMovies,
  addMoviesSuccess,
  getMoviesSuccess,
} from '../Actions/movie.action';

export interface MovieState {
  movies: ReadonlyArray<Movie>;
}

const initialState: ReadonlyArray<Movie> = [];

export const movieReducer = createReducer(
  initialState,
  on(getMoviesSuccess, (state, { movies }) => [...movies]),
  on(addMoviesSuccess, (state, { movie }) => [...state, movie])
);
