import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() Product: any;

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}