package com.dosomedev.order.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.dosomedev.order.model.Product;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
public class OrderController {
    @GetMapping("/greeting")
    public ResponseEntity<String> getGreeting() {
        return ResponseEntity
            .ok()
            .body("Welcome to the Order Microservice!");
    }

    @PostMapping
    public ResponseEntity<String> orderProducts(@RequestBody List<Product> orderRequest) {
        String response = "Ordering the products: ";
        for (int i=0; i<orderRequest.size(); i++) {
            Product product = orderRequest.get(i);
            String productName = product.getProductName();
            int quantity = product.getQuantity();
            
            // Add comma to separate products.
            if (i > 0) {
                response += ",";
            }
            // Add product.
            response += " " + productName + " (" + quantity + ")";
            // Add point after last entry.
            if (i == orderRequest.size() - 1) {
                response += ".";
            }
        }

        return ResponseEntity
            .ok()
            .body(response);
    }
}
