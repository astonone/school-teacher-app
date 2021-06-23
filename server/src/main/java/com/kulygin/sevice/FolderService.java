package com.kulygin.sevice;

import com.kulygin.dto.FileDto;
import com.kulygin.dto.FolderDto;
import com.kulygin.dto.FolderWithoutFilesDto;
import com.kulygin.exception.FileWritingException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FolderService {

    FolderDto getById(String folderId);

    List<FolderWithoutFilesDto> getAll();

    FolderDto save(FolderWithoutFilesDto folderDto);

    void deleteById(String folderId);

    FolderDto addFileToFolder(FolderWithoutFilesDto folder, FileDto file, MultipartFile uploadedFile) throws FileWritingException;

    FolderDto deleteFileFromFolder(FolderWithoutFilesDto folder, String fileId);

}
