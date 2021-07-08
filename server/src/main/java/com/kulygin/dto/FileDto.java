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
public class FileDto implements Serializable {

    private String id;
    private String filepath;
    private String filename;
    private byte[] file;
    private String fileExtension;

}
