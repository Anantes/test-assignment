import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { MoviesResponse } from "./models/movies.model";
import { ActorsResponse } from "./models/actors.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private readonly configUrl = "/data";

  constructor(private readonly http: HttpClient) {}

  getMovies(): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${this.configUrl}/movies.json`);
  }

  getActors(): Observable<ActorsResponse> {
    return this.http.get<ActorsResponse>(`${this.configUrl}/actors.json`);
  }
}
