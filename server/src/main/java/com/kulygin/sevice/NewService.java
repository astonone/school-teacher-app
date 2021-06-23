package com.kulygin.sevice;

import com.kulygin.dto.NewDto;

import java.util.List;

public interface NewService {

    List<NewDto> getAll();

    NewDto create(NewDto userNew);

    void deleteById(String id);

}
