package com.kulygin.sevice.impl;

import com.kulygin.domain.Feedback;
import com.kulygin.dto.FeedbackDto;
import com.kulygin.repository.FeedbackRepository;
import com.kulygin.sevice.FeedbackService;
import com.kulygin.sevice.impl.util.MappingService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final MappingService mappingService;

    @Override
    @Cacheable("feedbacks")
    public List<FeedbackDto> getAll() {
        return mappingService.mapAsList(feedbackRepository.findAll(), FeedbackDto.class);
    }

    @Override
    @CacheEvict(value="feedbacks", allEntries=true)
    public FeedbackDto create(FeedbackDto feedbackDto) {
        return mappingService.map(feedbackRepository.save(Feedback.builder()
                .userName(feedbackDto.getUserName())
                .text(feedbackDto.getText())
                .contactData(feedbackDto.getContactData())
                .build()), FeedbackDto.class);
    }

    @Override
    @CacheEvict(value="feedbacks", allEntries=true)
    public void deleteById(String id) {
        if (feedbackRepository.existsById(id)) {
            feedbackRepository.deleteById(id);
        }
    }
}
