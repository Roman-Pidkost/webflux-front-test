import { Injectable } from '@angular/core';
import {CoreModule} from './core.module';
import {Observable} from 'rxjs';
import {Brand} from './brand.model';

@Injectable({
  providedIn: CoreModule
})
export class BrandService {

  url = 'http://localhost:8080/';

  brands: Brand[] = [];

  getBrands(): Observable<Brand[]> {
    return new Observable(subscriber => {

      const eventSource = new EventSource(this.url);
      eventSource.onmessage = (event) => {
        this.brands.push(JSON.parse(event.data));
        // console.log(this.brands.length)
        subscriber.next(this.brands);
      };
      eventSource.onerror = (error) => {
        if (eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          console.log(this.brands)
          subscriber.complete();
        } else {
          subscriber.error('EventSource error: ' + error);
        }
      };
    });
  }
}
