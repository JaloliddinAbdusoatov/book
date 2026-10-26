package uz.bookstore.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.bookstore.dto.CreateOrderRequest;
import uz.bookstore.dto.OrderResponse;
import uz.bookstore.service.OrderService;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        OrderResponse order = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping("/track/{reference}")
    public ResponseEntity<OrderResponse> trackOrder(@PathVariable String reference) {
        return ResponseEntity.ok(orderService.getOrderByReference(reference));
    }
}
