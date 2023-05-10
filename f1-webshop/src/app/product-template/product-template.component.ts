import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  @Input() Product = '';
  private products: Product[] = [
    {
      id: 1,
      name: 'Red Bull Racing Team Hoodie',
      description: 'Stay warm with the official Red Bull Racing team hoodie.',
      price: 59.99,
      imageUrl: 'https://example.com/red-bull-hoodie.jpg'
    },
    {
      id: 2,
      name: 'Mercedes-AMG Petronas Team Cap',
      description: 'Support the Mercedes-AMG Petronas team with this official team cap.',
      price: 29.99,
      imageUrl: 'https://example.com/mercedes-cap.jpg'
    },
    {
      id: 3,
      name: 'Ferrari F1 Team T-Shirt',
      description: 'Show your love for Ferrari with this official team t-shirt.',
      price: 24.99,
      imageUrl: 'https://example.com/ferrari-tshirt.jpg'
    },
    {
      id: 4,
      name: 'McLaren F1 Team Water Bottle',
      description: 'Stay hydrated with the official McLaren F1 team water bottle.',
      price: 14.99,
      imageUrl: 'https://example.com/mclaren-water-bottle.jpg'
    }
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}