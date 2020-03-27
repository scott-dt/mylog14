import { Injectable } from '@angular/core';
import { Plugins, GeolocationOptions, CallbackID, GeolocationPosition } from '@capacitor/core';
import { Observable, bindCallback } from 'rxjs';
import { map } from 'rxjs/operators';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() { }

  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    console.log('Current', position);
    return position;
  }

  watchPosition(geolocationOptions?: GeolocationOptions): Observable<any> {
    geolocationOptions = (geolocationOptions) ? geolocationOptions : {};
    const watch = bindCallback(Geolocation.watchPosition);
    return watch(geolocationOptions);
  }

}
