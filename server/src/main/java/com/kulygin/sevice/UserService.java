package com.kulygin.sevice;

import com.kulygin.dto.UserDto;
import com.kulygin.exception.FileWritingException;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;


public interface UserService {

    UserDto save(UserDto userDto, MultipartFile uploadedFile) throws FileWritingException;

    UserDto getById(String id);

    void deleteById(String id);

    boolean login(UserDto userDto);

    UserDto getUserByUsername(HttpServletRequest request);

}
