import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MovieComponent } from "./movie.component";

@Component({
  selector: "app-parent-component",
  imports: [MovieComponent],
  template: `<app-movie [title]="title" [cast]="cast"></app-movie>`,
})
export class ParentComponent {
  title = "Test title";
  cast = ["Test Cast"];
}

describe("MovieComponent", () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<ParentComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.debugElement.children[0].componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should receive title and cast", () => {
    expect(component.title).toBe("Test title");
    expect(component.cast[0]).toBe("Test Cast");
  });

  it("should display title and cast", () => {
    const title = compiled.querySelector("h4");
    const cast = compiled.querySelector("p");

    expect(title?.innerHTML).toContain("Test title")
    expect(cast?.innerHTML).toContain("Test Cast")
  });
});
