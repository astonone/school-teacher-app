package com.kulygin.sevice.impl;

import com.kulygin.domain.File;
import com.kulygin.domain.Folder;
import com.kulygin.dto.FileDto;
import com.kulygin.dto.FolderDto;
import com.kulygin.dto.FolderWithoutFilesDto;
import com.kulygin.exception.FileAlreadyExists;
import com.kulygin.exception.FileDoesNotExistException;
import com.kulygin.exception.FileWritingException;
import com.kulygin.exception.FolderDoesNotExistException;
import com.kulygin.repository.FileRepository;
import com.kulygin.repository.FolderRepository;
import com.kulygin.sevice.FolderService;
import com.kulygin.sevice.StorageService;
import com.kulygin.sevice.impl.util.MappingService;
import lombok.val;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FolderServiceImpl implements FolderService {

    private final FolderRepository folderRepository;
    private final FileRepository fileRepository;
    private final StorageService storageService;
    private final MappingService mappingService;
    private final String storagePath;

    public FolderServiceImpl(FolderRepository folderRepository, StorageService storageService,
                             MappingService mappingService, FileRepository fileRepository,
                             @Value("${app.file.storage.path}") String storagePath) {
        this.folderRepository = folderRepository;
        this.fileRepository = fileRepository;
        this.storageService = storageService;
        this.mappingService = mappingService;
        this.storagePath = storagePath;
    }

    @Override
    public FolderDto getById(String folderId) {
        return folderRepository.findById(folderId)
                .map(folder -> mappingService.map(folder, FolderDto.class))
                .orElseThrow(FolderDoesNotExistException::new);
    }

    @Override
    public List<FolderWithoutFilesDto> getAll() {
        return mappingService.mapAsList(folderRepository.findAll(), FolderWithoutFilesDto.class);
    }

    @Override
    public FolderDto save(FolderWithoutFilesDto folderDto) {
        Folder forSave = Folder.builder().build();
        Optional<Folder> folderById = Optional.empty();
        if (folderDto.getId() != null) {
            folderById = folderRepository.findById(folderDto.getId());
            if (folderById.isEmpty()) {
                throw new FolderDoesNotExistException();
            }
        }
        forSave.setId(folderById.map(Folder::getId).orElse(null));
        forSave.setName(folderDto.getName());
        return mappingService.map(folderRepository.save(forSave), FolderDto.class);
    }

    @Override
    public void deleteById(String folderId) {
        val folder = folderRepository.findById(folderId);
        if (folder.isPresent()) {
            folder.get().getFiles().forEach(file -> {
                deleteFileIfExists(file.getFilepath());
                fileRepository.delete(file);
            });
            folderRepository.deleteById(folderId);
        }
    }

    @Override
    public FolderDto addFileToFolder(FolderWithoutFilesDto folder, FileDto file, MultipartFile uploadedFile) throws FileWritingException {
        var existedFolder = folderRepository.findById(folder.getId());
        if (existedFolder.isEmpty()) {
            throw new FolderDoesNotExistException();
        }
        String filePath = getFinalPath(uploadedFile);
        if (existedFolder.get().getFiles() != null && existedFolder.get().getFiles().stream()
                .anyMatch(f -> f.getFilepath().equals(filePath))) {
            throw new FileAlreadyExists();
        }
        storageService.writeFile(filePath, uploadedFile);
        file.setFilepath(filePath);
        final File saved = fileRepository.save(mappingService.map(file, File.class));
        file.setId(saved.getId());
        if (existedFolder.get().getFiles() == null) {
            existedFolder.get().setFiles(new ArrayList<>());
        }
        existedFolder.get().getFiles().add(mappingService.map(file, File.class));
        return mappingService.map(folderRepository.save(existedFolder.get()), FolderDto.class);
    }

    private void deleteFileIfExists(String filepath) {
        storageService.deleteFile(filepath);
    }

    private String getFinalPath(MultipartFile multipartFile) {
        return storagePath + multipartFile.getOriginalFilename();
    }

    @Override
    public FolderDto deleteFileFromFolder(FolderWithoutFilesDto folder, String fileId) {
        var existedFolder = folderRepository.findById(folder.getId());
        if (existedFolder.isEmpty()) {
            throw new FolderDoesNotExistException();
        }
        if (existedFolder.get().getFiles().stream().noneMatch(f -> f.getId().equals(fileId))) {
            throw new FileDoesNotExistException();
        }
        final Optional<File> fileForDeleting = existedFolder.get().getFiles().stream()
                .filter(f -> f.getId().equals(fileId))
                .findFirst();
        if (fileForDeleting.isPresent()) {
            deleteFileIfExists(fileForDeleting.get().getFilepath());
            existedFolder.get().getFiles().removeIf(file -> file.getId().equals(fileForDeleting.get().getId()));
            fileRepository.delete(fileForDeleting.get());
            return mappingService.map(folderRepository.save(existedFolder.get()), FolderDto.class);
        } else {
            throw new FileDoesNotExistException();
        }
    }

}
