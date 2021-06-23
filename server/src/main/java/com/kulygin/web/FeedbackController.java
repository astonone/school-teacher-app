package com.kulygin.web;

import com.kulygin.dto.FeedbackDto;
import com.kulygin.dto.list.FeedbackListDto;
import com.kulygin.sevice.FeedbackService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @GetMapping("api/feedback")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(FeedbackListDto.builder()
                .feedbacks(feedbackService.getAll())
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("api/feedback/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") String id) {
        feedbackService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("api/feedback")
    public ResponseEntity<?> save(@RequestBody FeedbackDto feedbackDto) {
        return new ResponseEntity<>(feedbackService.create(feedbackDto), HttpStatus.OK);
    }

}
