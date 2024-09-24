import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { Product } from '../core/model/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-list-Product',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  providers: [ProductService]
})
export class ListProductComponent implements OnInit {
  product!: Product;
  products: Product[] = [];
  val!: string;
  formhidden:boolean=true;

  constructor(private productService:ProductService) {}

  ngOnInit() {
    this.getProducts();
    this.product = new Product();
    this.val = 'Ajouter';
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response;
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
      () => this.getProducts(),
      error => {
        console.error('Error deleting product', error);
      }
    );
  }

  addProduct(e: Product) {
    if (this.val === 'Ajouter') {
      this.productService.addProduct(e).subscribe(
        () => this.productService.getProducts(),
        error => {
          console.error('Error adding product', error);
        }
      );
    }
  }
  
  updateProduct() {
    this.val = 'Modifier';
    this.formhidden=false;
    this.productService.updateProduct(this.product).subscribe(
      () => this.getProducts(),
      error => {
        console.error('Error updating product', error);
      }
    );
  }

  showform() {
    this.formhidden=false;
  }
  saveProduct() {
    if (this.val == 'Modifier') {
      this.updateProduct();
    } else {
      this.addProduct(this.product);
    }
  }
}
