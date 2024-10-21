package com.dosomedev.catalog.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dosomedev.catalog.model.Product;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @GetMapping("/greeting")
    public ResponseEntity<String> getGreeting() {
        return ResponseEntity
            .ok()
            .body("Welcome to the Catalog Microservice!");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        Product headphones = new Product(1, "Headphones", 4, 34.99);
        Product smartwatch = new Product(2, "Smartwatch", 5, 149.99);
        Product laptop = new Product(3, "Laptop", 6, 1699.99);

        List<Product> products = new ArrayList<>();
        products.add(headphones);
        products.add(smartwatch);
        products.add(laptop);

        return ResponseEntity
            .ok()
            .body(products);
    }
}
