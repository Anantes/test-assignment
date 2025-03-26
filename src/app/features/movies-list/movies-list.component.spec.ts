import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MoviesListComponent } from "./movies-list.component";
import { ApiService } from "~api/api.service";
import { MOVIES } from "~api/mocks/movies.mock";
import { MoviesResponse } from "~api/models/movies.model";
import { ActorsResponse } from "~api/models/actors.model";
import { ACTORS } from "~api/mocks/actors.mock";
import { PathToActorService } from "~shared/services/path-to-actor.service";

describe("MoviesListComponent", () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, NgbTypeahead, MoviesListComponent],
      providers: [
        PathToActorService,
        ChangeDetectorRef,
        {
          provide: ApiService,
          useValue: {
            getMovies(): Observable<MoviesResponse> {
              return of({ movies: MOVIES });
            },
            getActors(): Observable<ActorsResponse> {
              return of({ actors: ACTORS });
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load actors and movies lists", () => {
    expect(component.actors).toEqual(ACTORS);
    expect(component.movies).toEqual(MOVIES);
  });

  it("should show movies by actor name", () => {
    component.filterMoviesByActor("Dianne Wiest");

    expect(component.moviesByActor.length).toEqual(1);
    expect(component.moviesByActor[0].title).toEqual("Footloose");
    expect(component.moviesByActor[0].cast[0]).toEqual("Tom Cruise");
  });

  it("should show the shortest path to Tom Cruise", async () => {
    const connection = compiled.querySelector("#pathToActor");
    component.filterMoviesByActor("Dianne Wiest");

    expect(connection?.innerHTML).toContain(
      "Dianne Wiest =&gt; Footloose =&gt; Tom Cruise",
    );
  });

  it("should show no connection by default", () => {
    const connection = compiled.querySelector("#pathToActor");

    expect(connection?.innerHTML).toContain("No connection");
  });
});
