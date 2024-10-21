package com.dosomedev.shipping.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.dosomedev.shipping.model.Product;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/shipping")
public class ShippingController {
    @GetMapping("/greeting")
    public ResponseEntity<String> getGreeting() {
        return ResponseEntity
            .ok()
            .body("Welcome to the Shipping Microservice!");
    }

    @PostMapping
    public ResponseEntity<String> shipProducts(@RequestBody List<Product> shipRequest) {
        String response = "Shipping the products: ";
        int totalQuantity = 0;

        for (int i=0; i<shipRequest.size(); i++) {
            Product product = shipRequest.get(i);
            String productName = product.getProductName();
            int quantity = product.getQuantity();
            
            // Add comma to separate products.
            if (i > 0) {
                response += ",";
            }
            // Add product.
            response += " " + productName + " (" + quantity + ")";
            totalQuantity += quantity;
            // Add point after last entry.
            if (i == shipRequest.size() - 1) {
                response += ".";
            }
        }

        response += " Total items to ship: " + totalQuantity;

        return ResponseEntity
            .ok()
            .body(response);
    }
}
