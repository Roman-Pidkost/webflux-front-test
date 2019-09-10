import {Component, OnInit} from '@angular/core';
import {Brand} from './core/brand.model';
import {BrandService} from './core/brand.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  brands: Observable<Brand[]>;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brands = this.brandService.getBrands();
  }

}
