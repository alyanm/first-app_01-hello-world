import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocation } from "../housinglocation";

/** Interpolation -- put {{ housingLocation.name }} in the markup to interpolate the data into the template  */
@Component({
  selector: "app-housing-location",
  standalone: true,
  imports: [],
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
    </section>
  `,
  styleUrls: ["housing-location.component.css"],
})
export class HousingLocationComponent {
  /** non-null assertion, the '!' tells Angular that this value will not be null or undefined */
  /** @Input passes input parameter through. */
  @Input() housingLocation!: HousingLocation;
}
