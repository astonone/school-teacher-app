package com.kulygin.web;

import com.kulygin.dto.ErrorDto;
import com.kulygin.dto.FileDto;
import com.kulygin.dto.FolderWithoutFilesDto;
import com.kulygin.dto.list.FolderListDto;
import com.kulygin.exception.FileAlreadyExists;
import com.kulygin.exception.FileDoesNotExistException;
import com.kulygin.exception.FileWritingException;
import com.kulygin.exception.FolderDoesNotExistException;
import com.kulygin.sevice.FolderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.kulygin.enumeration.ApplicationErrorTypes.*;

@RestController
@AllArgsConstructor
public class FolderController {

    private final FolderService folderService;

    @GetMapping("api/folder")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(FolderListDto.builder()
                .folders(folderService.getAll())
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("api/folder/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") String id) {
        folderService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("api/folder")
    public ResponseEntity<?> save(@RequestBody FolderWithoutFilesDto folderDto) {
        try {
            return new ResponseEntity<>(folderService.save(folderDto), HttpStatus.OK);
        } catch (FolderDoesNotExistException e) {
            return new ResponseEntity<>(new ErrorDto(FOLDER_ID_NOT_FOUND.getCode(), FOLDER_ID_NOT_FOUND.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("api/folder/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") String id) {
        try {
            return new ResponseEntity<>(folderService.getById(id), HttpStatus.OK);
        } catch (FolderDoesNotExistException e) {
            return new ResponseEntity<>(new ErrorDto(FOLDER_ID_NOT_FOUND.getCode(), FOLDER_ID_NOT_FOUND.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/api/folder/file")
    public ResponseEntity<?> save(@RequestPart("file") FileDto fileDto, @RequestPart("folder") FolderWithoutFilesDto folderDto,
                                  @RequestPart(name = "uploadedFile") MultipartFile uploadedFile) {
        try {
            return new ResponseEntity<>(folderService.addFileToFolder(folderDto, fileDto, uploadedFile), HttpStatus.OK);
        } catch (FileAlreadyExists e) {
            return new ResponseEntity<>(new ErrorDto(FILE_ALREADY_EXISTS.getCode(), FILE_ALREADY_EXISTS.getMessage()), HttpStatus.NOT_FOUND);
        } catch (FolderDoesNotExistException e) {
            return new ResponseEntity<>(new ErrorDto(FOLDER_ID_NOT_FOUND.getCode(), FOLDER_ID_NOT_FOUND.getMessage()), HttpStatus.NOT_FOUND);
        } catch (FileWritingException e) {
            return new ResponseEntity<>(new ErrorDto(IO_ERROR.getCode(), IO_ERROR.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/api/folder/file/{fileId}")
    public ResponseEntity<?> deleteFile(@RequestBody FolderWithoutFilesDto folderDto, @PathVariable String fileId) {
        try {
            return new ResponseEntity<>(folderService.deleteFileFromFolder(folderDto, fileId), HttpStatus.OK);
        } catch (FolderDoesNotExistException e) {
            return new ResponseEntity<>(new ErrorDto(FOLDER_ID_NOT_FOUND.getCode(), FOLDER_ID_NOT_FOUND.getMessage()), HttpStatus.NOT_FOUND);
        } catch (FileDoesNotExistException e) {
            return new ResponseEntity<>(new ErrorDto(FILE_ID_NOT_FOUND.getCode(), FILE_ID_NOT_FOUND.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

}
