import { Input, Component } from '@angular/core';


@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.component.html',
  styleUrls: ['./product-model.component.css']
})
export class ProductModelComponent {
  @Input() item = 'Product';
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

