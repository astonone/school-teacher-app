package com.kulygin.sevice.impl;

import com.kulygin.domain.New;
import com.kulygin.dto.NewDto;
import com.kulygin.repository.NewRepository;
import com.kulygin.sevice.NewService;
import com.kulygin.sevice.impl.util.MappingService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class NewServiceImpl implements NewService {

    private final NewRepository newRepository;
    private final MappingService mappingService;

    @Override
    public List<NewDto> getAll() {
        return mappingService.mapAsList(newRepository.findAll(), NewDto.class);
    }

    @Override
    public NewDto create(NewDto userNew) {
        return mappingService.map(newRepository.save(New.builder()
                .user(userNew.getUser())
                .title(userNew.getTitle())
                .text(userNew.getText())
                .created(LocalDateTime.now())
                .build()), NewDto.class);
    }

    @Override
    public void deleteById(String id) {
        if (newRepository.existsById(id)) {
            newRepository.deleteById(id);
        }
    }

}
