import { Component, OnInit } from '@angular/core';
import { Product } from '../core/model/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers: [ProductService]
})
export class ProductFormComponent implements OnInit {
  product: Product = new Product();
  products: Product[] = [];
  val!: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response.resultat;
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  addProduct() {
    this.productService.addProduct(this.product).subscribe(
      () => {
        this.getProducts();

      },
      error => {
        console.error('Error adding product', error);
      }
    );
  }

  updateProduct(id: string) {
    this.productService.getProductById(id).subscribe(
      (product: Product) => {
        this.product = { ...product }; // Populate the form with current product details
        this.val = 'Modifier'; // Change button text to 'Update'
      },
      error => {
        console.error('Error fetching product details', error);
      }
    );
  }

  

 
}
