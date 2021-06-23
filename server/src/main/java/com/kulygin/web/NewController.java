package com.kulygin.web;

import com.kulygin.dto.NewDto;
import com.kulygin.dto.list.NewListDto;
import com.kulygin.sevice.NewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class NewController {

    private final NewService newService;

    @GetMapping("api/new")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(NewListDto.builder()
                .news(newService.getAll())
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("api/new/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") String id) {
        newService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("api/new")
    public ResponseEntity<?> save(@RequestBody NewDto userNew) {
        return new ResponseEntity<>(newService.create(userNew), HttpStatus.OK);
    }

}
