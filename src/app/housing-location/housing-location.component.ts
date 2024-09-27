import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocation } from "../housinglocation";
import { RouterModule, RouterOutlet } from "@angular/router";

/** Interpolation -- put {{ housingLocation.name }} in the markup to interpolate the data into the template  */
/** Add router link for details with path and id */
@Component({
  selector: "app-housing-location",
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">
        {{ housingLocation.city }}, {{ housingLocation.state }}
      </p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>
  `,
  styleUrls: ["housing-location.component.css"],
})
export class HousingLocationComponent {
  /** non-null assertion, the '!' tells Angular that this value will not be null or undefined */
  /** @Input passes input parameter through. */
  @Input() housingLocation!: HousingLocation;
}
