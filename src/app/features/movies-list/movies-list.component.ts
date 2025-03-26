import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
} from "rxjs";

import { ApiService } from "~api/api.service";
import { Movie } from "~api/models/movie.model";
import { MovieComponent } from "~features/movie/movie.component";
import { PathToActorService } from "~shared/services/path-to-actor.service";

@Component({
  selector: "app-movies-list",
  imports: [CommonModule, FormsModule, MovieComponent, NgbTypeahead],
  templateUrl: "./movies-list.component.html",
  styleUrl: "./movies-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent implements OnInit {
  actors: string[] = [];
  movies: Movie[] = [];

  typeahead = "";
  moviesByActor: Movie[] = [];

  pathToTomCruise = "No connection";

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>,
  ) =>
    text$.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      map((term) =>
        term.length < 1
          ? []
          : this.actors
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10),
      ),
    );

  constructor(
    private readonly api: ApiService,
    private readonly cdr: ChangeDetectorRef,
    private readonly service: PathToActorService,
  ) {}

  ngOnInit(): void {
    this.loadActors();
    this.loadMovies();
  }

  filterMoviesByActor(actor: string): void {
    const result: Movie[] = [];

    this.movies.forEach((movie) => {
      if (movie.cast.findIndex((castMember) => castMember == actor) !== -1) {
        result.push(movie);
      }
    });

    if (result.length > 0) {
      this.moviesByActor = result;
    } else {
      this.moviesByActor = this.movies;
    }

    this.pathToTomCruise = this.service.findShortestPathToActor(
      this.movies,
      "Tom Cruise",
      actor,
    );

    this.cdr.detectChanges();
  }

  private loadActors(): void {
    this.api.getActors().subscribe((resp) => {
      this.actors = resp.actors;
      this.cdr.detectChanges();
    });
  }

  private loadMovies(): void {
    this.api.getMovies().subscribe((resp) => {
      this.movies = resp.movies;
      this.moviesByActor = this.movies;
      this.cdr.detectChanges();
    });
  }
}
