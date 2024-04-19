import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // ●   country name(e.g., Chad)
  // ●   country capital(e.g., N’Djamena)
  // ●   country region(e.g., Sub-Saharan Africa)
  // ●   income level(e.g., low income)
  // ●   two additional country properties of your choice
  fetchCountryData(country: string) {
    let url = `http://api.worldbank.org/v2/country/${country}?format=json`;
    return this.http.get(url);
  }

  setCountryData(country: string) {
    let subject = new Subject();
    this.fetchCountryData(country).subscribe((data: any) => {
      let dataCleansed = data[1][0];
      subject.next({
        countryName: dataCleansed.name,
        capital: dataCleansed.capitalCity,
        countryRegion: dataCleansed.region.value,
        incomeLevel: dataCleansed.incomeLevel.value,
        iso2Code: dataCleansed.iso2Code,
        lat: dataCleansed.latitude,
        lng: dataCleansed.longitude,
      })
    })
    return subject.asObservable();
  }

}
