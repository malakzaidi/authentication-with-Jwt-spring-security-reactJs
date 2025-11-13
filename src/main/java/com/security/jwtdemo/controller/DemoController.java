package com.security.jwtdemo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DemoController {

    @GetMapping("/user/hello")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<String> sayHelloUser() {
        return ResponseEntity.ok("Hello User!");
    }

    @GetMapping("/admin/hello")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> sayHelloAdmin() {
        return ResponseEntity.ok("Hello Admin!");
    }

    @GetMapping("/public/hello")
    public ResponseEntity<String> sayHelloPublic() {
        return ResponseEntity.ok("Hello Public!");
    }
}