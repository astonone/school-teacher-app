package com.kulygin.web;

import com.kulygin.dto.ErrorDto;
import com.kulygin.dto.UserDto;
import com.kulygin.exception.*;
import com.kulygin.sevice.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import static com.kulygin.enumeration.ApplicationErrorTypes.*;

@RestController
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/api/user/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        final boolean login = userService.login(userDto);
        if (login) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping("/api/user/authenticate")
    public ResponseEntity<?> authenticate(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getUserByUsername(request), HttpStatus.OK);
    }

    @GetMapping("/api/user/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        try {
            return new ResponseEntity<>(userService.getById(id), HttpStatus.OK);
        } catch (UserDoesNotExistException e) {
            return new ResponseEntity<>(new ErrorDto(USER_ID_NOT_FOUND.getCode(), USER_ID_NOT_FOUND.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/api/user")
    public ResponseEntity<?> save(@RequestPart("user") UserDto userDto,
                                  @RequestPart(name = "uploadedFile", required = false) MultipartFile uploadedFile) {
        try {
            return new ResponseEntity<>(userService.save(userDto, uploadedFile), HttpStatus.OK);
        } catch (UsernameAlreadyExistException e) {
            return new ResponseEntity<>(new ErrorDto(USER_HAS_EXISTS.getCode(), USER_HAS_EXISTS.getMessage()), HttpStatus.NOT_FOUND);
        } catch (UserDoesNotExistException e) {
            return new ResponseEntity<>(new ErrorDto(USER_ID_NOT_FOUND.getCode(), USER_ID_NOT_FOUND.getMessage()), HttpStatus.NOT_FOUND);
        } catch (SecretKeyException e) {
            return new ResponseEntity<>(new ErrorDto(SECRET_KEY_ERROR.getCode(), SECRET_KEY_ERROR.getMessage()), HttpStatus.NOT_FOUND);
        } catch (FileWritingException e) {
            return new ResponseEntity<>(new ErrorDto(IO_ERROR.getCode(), IO_ERROR.getMessage()), HttpStatus.NOT_FOUND);
        } catch (InvalidPhotoFileFormatException e) {
            return new ResponseEntity<>(new ErrorDto(INVALID_PHOTO_FILE_FORMAT.getCode(), INVALID_PHOTO_FILE_FORMAT.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/api/user/{id}")
    public ResponseEntity<?> deleteById(@PathVariable String id) {
        try {
            userService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (UserDoesNotExistException e) {
            return new ResponseEntity<>(new ErrorDto(USER_ID_NOT_FOUND.getCode(), USER_ID_NOT_FOUND.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

}
