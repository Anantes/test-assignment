import { Component, OnInit } from "@angular/core";
import { ApiService } from "./api/api.service";
import { MoviesListComponent } from "~features/movies-list/movies-list.component";

@Component({
  selector: "app-root",
  imports: [MoviesListComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "test-assignment";

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    console.log(this.api.getMovies().subscribe());
  }
}
