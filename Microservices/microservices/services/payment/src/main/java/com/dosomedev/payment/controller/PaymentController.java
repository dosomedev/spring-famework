package com.dosomedev.payment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.dosomedev.payment.model.Product;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @GetMapping("/greeting")
    public ResponseEntity<String> getGreeting() {
        return ResponseEntity
            .ok()
            .body("Welcome to the Payment Microservice!");
    }

    @PostMapping
    public ResponseEntity<String> payProducts(@RequestBody List<Product> payRequest) {
        String response = "Payment of the products: ";

        double endPrice = 0.0;

        for (int i=0; i<payRequest.size(); i++) {
            Product product = payRequest.get(i);
            String productName = product.getProductName();
            int quantity = product.getQuantity();
            double price = product.getPrice();
            
            // Add comma to separate products.
            if (i > 0) {
                response += ",";
            }
            // Add product.
            response += " " + productName + " (" + quantity + " at $" + price + ")";
            endPrice += price * quantity;
            // Add point after last entry.
            if (i == payRequest.size() - 1) {
                response += ".";
            }
        }

        response += " The end price is $" + String.format("%.2f", endPrice) + ".";

        return ResponseEntity
            .ok()
            .body(response);
    }
}
