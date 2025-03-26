import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Movie } from "../../api/models/movie.model";

@Component({
  selector: "app-movie",
  imports: [],
  templateUrl: "./movie.component.html",
  styleUrl: "./movie.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements Movie {
  @Input({ required: true }) title = "";
  @Input({ required: true }) cast: string[] = [];
}
