package com.kulygin.sevice;

import com.kulygin.exception.FileWritingException;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    void writeFile(String storagePath, MultipartFile file) throws FileWritingException;

    void deleteFile(String pathToFile);

}
