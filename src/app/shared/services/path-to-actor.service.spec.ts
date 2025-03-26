import { TestBed } from "@angular/core/testing";

import { PathToActorService } from "./path-to-actor.service";
import { MOVIES } from "~api/mocks/movies.mock";

describe("ApiService", () => {
  let service: PathToActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathToActorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should find path to actor (case 1)", () => {
    const pathToActor = service.findShortestPathToActor(
      MOVIES,
      "Tom Cruise",
      "Tom Cruise",
    );

    expect(pathToActor).toBe("Tom Cruise");
  });

  it("should find path to actor (case 2)", () => {
    const pathToActor = service.findShortestPathToActor(
      MOVIES,
      "Tom Cruise",
      "Benjamin Mouton",
    );

    expect(pathToActor).toBe("Benjamin Mouton => Flatliners => Tom Cruise");
  });

  it("should find path to actor (case 3)", () => {
    const pathToActor = service.findShortestPathToActor(
      MOVIES,
      "Tom Cruise",
      "Billy Crudup",
    );

    expect(pathToActor).toBe("Billy Crudup => Eat Pray Love => Julia Roberts => Flatliners => Tom Cruise");
  });

  it("should show default string if path was not found", () => {
    const pathToActor = service.findShortestPathToActor(
      MOVIES,
      "Tom Cruise",
      "Tom Hanks",
    );

    expect(pathToActor).toBe("No connection");
  });
});
