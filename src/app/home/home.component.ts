import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housinglocation";
import { HousingService } from "../housing.service";

/** data binding -- [housingLocation]="housingLocation"  binds the property as input to the component. */
/** use ngFor to iterate over a list */
/** Use template reference variable #filter to get access to the input element as its value */
/** Bind the click event on the button element to the filterResults function passing the value property of thefilter template variable */
@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city or state" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ["home.component.css"],
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService);

  filteredLocationList: HousingLocation[] = [];
  housingLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then(locations => {
      this.housingLocationList = locations;
      this.filteredLocationList = this.housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    /** Use String filter function to compare the value of text parameter against housingLocation.city property. */
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase()) ||
        housingLocation?.state.toLowerCase().includes(text.toLowerCase())
    );
  }
}
