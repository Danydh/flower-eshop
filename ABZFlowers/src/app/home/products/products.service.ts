import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = []; //we dont want anyone accessing this variable from outside
  private productsUpdated = new Subject<{
    products: Product[];
    productCount: number;
  }>(); //we had to use Subject because in the beggining we were pulling a empty array so nothign showed up

  constructor(private http: HttpClient, private router: Router) {}

  getProducts(productsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`; //this is a template expression
    this.http
      .get<{ message: string; products: any; maxProducts: number }>(
        'http://localhost:3000/api/products' + queryParams
      ) //you can be more clear about the type
      .pipe(
        map((productData) => {
          return {
            products: productData.products.map((product) => {
              return {
                id: product._id,
                title: product.title,
                content: product.content,
                imagePath: product.imagePath,
                quantity: product.quantity,
                price: product.price,
                currency: product.currency,
              };
            }),
            maxProducts: productData.maxProducts,
          };
        })
      ) //allows operators (?)
      .subscribe((transformedProductData) => {
        this.products = transformedProductData.products;
        this.productsUpdated.next({
          products: [...this.products],
          productCount: transformedProductData.maxProducts,
        });
      });

    //return [...this.products]; //Good Practice! This is a ts/new js feature that copies an array, not only its reference
  }
  getProductUpdateListener() {
    return this.productsUpdated.asObservable(); //returns an object that can listen but not emit
  }

  getProduct(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      quantity: string;
      price: string;
      currency: string;
    }>('http://localhost:3000/api/products/' + id);
  }

  addProduct(
    title: string,
    content: string,
    image: File,
    quantity: string,
    price: string,
    currency: string
  ) {
    const productData = new FormData(); //data format allows us to combine text values and blobs (files)_
    productData.append('title', title);
    productData.append('content', content);
    productData.append('image', image, title);
    productData.append('quantity', quantity);
    productData.append('price', price);
    productData.append('currency', currency);
    this.http
      .post<{ message: string; product: Product }>(
        'http://localhost:3000/api/products',
        productData
      )
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
    // added to subscribe method
    // this.products.push(product);
    // this.productsUpdated.next([...this.products]);
  }

  updateProduct(
    id: string,
    title: string,
    content: string,
    image: File | string,
    quantity: string,
    price: string,
    currency: string
  ) {
    let productData: Product | FormData;

    if (typeof image === 'object') {
      productData = new FormData();
      productData.append('id', id);
      productData.append('title', title);
      productData.append('content', content);
      productData.append('image', image, title);
      productData.append('quantity', quantity);
      productData.append('price', price);
      productData.append('currency', currency);
      console.log('error1');
    } else {
      productData = {
        id: id,
        title: title,
        content: content,
        imagePath: image as string,
        quantity: quantity,
        price: price,
        currency: currency,
      };
    }
    this.http
      .put('http://localhost:3000/api/products/' + id, productData)
      .subscribe((response) => {
        this.router.navigate(['/']);
      });
  }
  deleteProduct(productId: string) {
    return this.http.delete('http://localhost:3000/api/products/' + productId);
  }
}
