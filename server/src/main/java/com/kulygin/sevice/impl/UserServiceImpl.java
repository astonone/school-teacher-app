package com.kulygin.sevice.impl;

import com.kulygin.domain.User;
import com.kulygin.dto.UserDto;
import com.kulygin.exception.*;
import com.kulygin.repository.UserRepository;
import com.kulygin.sevice.StorageService;
import com.kulygin.sevice.UserService;
import com.kulygin.sevice.impl.util.MappingService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Optional;

import static com.kulygin.sevice.impl.util.MappingService.DOT;

@Service
public class UserServiceImpl implements UserService {

    private static final String ROLE_USER = "ROLE_USER";
    private final UserRepository userRepository;
    private final MappingService mappingService;
    private final PasswordEncoder passwordEncoder;
    private final StorageService storageService;
    private final String secretKey;
    private final String storagePath;

    public UserServiceImpl(UserRepository userRepository, MappingService mappingService, PasswordEncoder passwordEncoder,
                           StorageService storageService, @Value("${app.secret-key}") String secretKey,
                           @Value("${app.file.storage.path}") String storagePath) {
        this.userRepository = userRepository;
        this.mappingService = mappingService;
        this.passwordEncoder = passwordEncoder;
        this.storageService = storageService;
        this.storagePath = storagePath;
        this.secretKey = secretKey;
    }

    @Override
    public UserDto save(UserDto userDto, MultipartFile uploadedFile) throws FileWritingException {
        Optional<User> userById = userDto.getId() != null ? userRepository.findById(userDto.getId()) : Optional.empty();
        if (isAllowedUpdate(userDto, userById)) {
            if (userDto.getId() == null && userRepository.existsByUsername(userDto.getUsername())) {
                throw new UsernameAlreadyExistException();
            }
            User forSave = User.builder().build();
            if (userDto.getId() != null) {
                if (userById.isEmpty()) {
                    throw new UserDoesNotExistException();
                }
            }
            forSave.setId(userById.map(User::getId).orElse(null));
            forSave.setUsername(userDto.getUsername());
            if (userDto.getPassword() != null) {
                forSave.setPassword(passwordEncoder.encode(userDto.getPassword()));
            } else {
                forSave.setPassword(userById.map(User::getPassword).orElseThrow(UserDoesNotExistException::new));
            }
            forSave.setFirstName(userDto.getFirstName());
            forSave.setLastName(userDto.getLastName());
            forSave.setAccountNonExpired(true);
            forSave.setAccountNonLocked(true);
            forSave.setCredentialsNonExpired(true);
            forSave.setEnabled(true);
            forSave.setRole(ROLE_USER);
            if (uploadedFile != null) {
                String filePath = getFinalPath(uploadedFile);
                validateFileFormat(filePath);
                if (userDto.getId() != null) {
                    deletePreviousFileIfExists(userDto.getId());
                }
                storageService.writeFile(filePath, uploadedFile);
                forSave.setPathToPhotoLink(filePath);
            } else {
                forSave.setPathToPhotoLink(userById.map(User::getPathToPhotoLink).orElse(null));
            }
            return mappingService.map(userRepository.save(forSave), UserDto.class);
        } else {
            throw new SecretKeyException();
        }
    }

    private void validateFileFormat(String filePath) {
        final String fileExtension = getFileExtension(filePath);
        switch (fileExtension) {
            case "jpg":
            case "jpeg":
            case "png":
            case "svg":
                return;
            default:
                throw new InvalidPhotoFileFormatException();
        }
    }


    private String getFileExtension(String filePathWithName) {
        return filePathWithName.substring(filePathWithName.lastIndexOf(DOT) + 1);
    }

    private boolean isAllowedUpdate(UserDto userDto, Optional<User> userById) {
        return (userById.isPresent() && userDto.getSecretKey() == null) || userDto.getSecretKey() != null && passwordEncoder.matches(userDto.getSecretKey(), this.secretKey);
    }

    private void deletePreviousFileIfExists(String id) {
        userRepository.findById(id).ifPresent(user -> storageService.deleteFile(user.getPathToPhotoLink()));
    }

    private String getFinalPath(MultipartFile multipartFile) {
        return storagePath + multipartFile.getOriginalFilename();
    }

    @Override
    public UserDto getById(String id) {
        return userRepository.findById(id).map(user -> mappingService.map(user, UserDto.class)).orElseThrow(UserDoesNotExistException::new);
    }

    @Override
    public void deleteById(String id) {
        if (!userRepository.existsById(id)) {
            throw new UserDoesNotExistException();
        }
        userRepository.deleteById(id);
    }

    @Override
    public boolean login(UserDto userDto) {
        User userByUsername = userRepository.findByUsername(userDto.getUsername());
        if (userByUsername != null) {
            return passwordEncoder.matches(userDto.getPassword(), userByUsername.getPassword());
        }
        return false;
    }

    @Override
    public UserDto getUserByUsername(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization").substring("Basic".length()).trim();
        String username = new String(Base64.getDecoder().decode(authToken)).split(":")[0];
        User userByUserName = userRepository.findByUsername(username);
        return mappingService.map(userByUserName, UserDto.class);
    }

}
