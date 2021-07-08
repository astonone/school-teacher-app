package com.kulygin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {

    private String id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String pathToPhotoLink;
    private byte[] photoFile;
    private String photoFileExtension;
    private boolean enabled;
    private boolean credentialsNonExpired;
    private boolean accountNonLocked;
    private boolean accountNonExpired;
    private String role;
    private String secretKey;

}
