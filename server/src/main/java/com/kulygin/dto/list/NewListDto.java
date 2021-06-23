package com.kulygin.dto.list;

import com.kulygin.dto.NewDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewListDto {

    private List<NewDto> news;
    
}
