import { Injectable } from "@angular/core";
import { HousingLocation } from "./housinglocation";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  readonly baseUrl = "https://angular.dev/assets/images/tutorials/common";
  /** endpoint for my json-server --watch db.json */
  url = "http://localhost:3000/locations";

  constructor() {}

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? [];
  }

  submitApplication(firstName: string, lastName: string, email: string): void {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}`
    );
  }
}
