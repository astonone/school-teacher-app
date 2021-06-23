package com.kulygin.sevice;

import com.kulygin.dto.FeedbackDto;

import java.util.List;

public interface FeedbackService {

    List<FeedbackDto> getAll();

    FeedbackDto create(FeedbackDto feedbackDto);

    void deleteById(String id);

}
