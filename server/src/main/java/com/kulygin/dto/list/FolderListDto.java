package com.kulygin.dto.list;

import com.kulygin.dto.FolderWithoutFilesDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FolderListDto {

    private List<FolderWithoutFilesDto> folders;

}
