import { Injectable } from "@angular/core";
import { Movie } from "~api/models/movie.model";

interface QueueItem {
  actor: string;
  path: string[];
}

@Injectable({
  providedIn: "root",
})
export class PathToActorService {
  findShortestPathToActor(
    movies: Movie[],
    targetActor: string,
    start: string,
  ): string {
    if (start === targetActor) {
      return targetActor;
    }

    const visitedActors = new Set<string>();
    const queue: QueueItem[] = [{ actor: start, path: [] }];

    while (queue.length > 0) {
      const currentItem = queue.shift()!;

      if (visitedActors.has(currentItem.actor)) continue;

      visitedActors.add(currentItem.actor);

      const actorFilms = this.findFilmsWithActor(movies, currentItem.actor);

      for (const movie of actorFilms) {
        if (this.isTargetPresent(movie, targetActor)) {
          return [
            ...currentItem.path,
            currentItem.actor,
            movie.title,
            targetActor,
          ].join(" => ");
        }

        this.addUncheckedActorsToQueue(
          movie,
          currentItem,
          visitedActors,
          queue,
        );
      }
    }

    return "No connection";
  }

  private isTargetPresent(movie: Movie, target: string): boolean {
    return movie.cast.includes(target);
  }

  private findFilmsWithActor(movies: Movie[], actor: string): Movie[] {
    return movies.filter((movie) => movie.cast.includes(actor));
  }

  private getOtherActorsInMovie(movie: Movie, excludeActor: string): string[] {
    return movie.cast.filter((actor) => actor !== excludeActor);
  }

  private addUncheckedActorsToQueue(
    movie: Movie,
    currentItem: QueueItem,
    visitedActors: Set<string>,
    queue: QueueItem[],
  ): void {
    const otherActors = this.getOtherActorsInMovie(movie, currentItem.actor);

    for (const nextActor of otherActors) {
      if (!visitedActors.has(nextActor)) {
        queue.push({
          actor: nextActor,
          path: [...currentItem.path, currentItem.actor, movie.title],
        });
      }
    }
  }
}
