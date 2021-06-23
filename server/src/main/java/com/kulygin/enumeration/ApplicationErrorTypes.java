package com.kulygin.enumeration;

public enum ApplicationErrorTypes {

    USER_ID_NOT_FOUND(1, "User with this id has not found"),
    USER_HAS_EXISTS(2, "This user already exists"),
    IO_ERROR(3, "IO error via file writing"),
    SECRET_KEY_ERROR(4, "Incorrect secret key"),
    FOLDER_ID_NOT_FOUND(5, "Folder with this id has not found"),
    FILE_ALREADY_EXISTS(6, "This file already exists in folder"),
    FILE_ID_NOT_FOUND(7, "File with this id has not found"),
    INVALID_PHOTO_FILE_FORMAT(8, "Invalid photo file format");

    private final int code;
    private final String message;

    ApplicationErrorTypes(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public int getCode() {
        return code;
    }

}
