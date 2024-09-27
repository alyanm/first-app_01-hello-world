import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housinglocation";
import {
  EmailValidator,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import { first, last } from "rxjs";

/** set attribute to value <form [formGroup]="applyForm"
 * then set event handler for submit to function  (submit)="submitApplication()"
 * Use parentheses around the event name to define events in template code
 * the code on the right hand is the function to call when the event is triggered
 */
@Component({
  selector: "app-details",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ["details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocationId = -1;
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params["id"]);
    this.loadHousingLocation();
  }

  async loadHousingLocation() {
    this.housingLocation = await this.housingService.getHousingLocationById(
      this.housingLocationId
    );
  }

  /** Use nullish coalescing operator to default to string if value is null ?? */
  submitApplication(): void {
    const firstName = this.applyForm.get("firstName")?.value ?? "";
    const lastName = this.applyForm.get("lastName")?.value ?? "";
    const email = this.applyForm.get("email")?.value ?? "";

    this.housingService.submitApplication(firstName, lastName, email);
  }
}
