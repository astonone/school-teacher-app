package com.kulygin.sevice.impl;

import com.kulygin.exception.FileWritingException;
import com.kulygin.sevice.StorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class StorageServiceImpl implements StorageService {

    private final String storageDir;

    public StorageServiceImpl(@Value("${app.file.storage.path}") String storageDir) {
        this.storageDir = storageDir;
    }

    @Override
    public void writeFile(String storagePath, MultipartFile file) throws FileWritingException {
        createStorageDir();
        File cv = new File(storagePath);
        try (FileOutputStream fos = new FileOutputStream(cv)) {
            fos.write(file.getBytes());
            fos.flush();
        } catch (IOException e) {
            throw new FileWritingException();
        }
    }

    private void createStorageDir() {
        File directory = new File(storageDir);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }

    @Override
    public void deleteFile(String pathToFile) {
        if (pathToFile != null) {
            File file = new File(pathToFile);
            file.delete();
        }
    }
}
