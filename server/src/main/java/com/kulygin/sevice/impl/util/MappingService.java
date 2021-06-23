package com.kulygin.sevice.impl.util;

import com.kulygin.domain.File;
import com.kulygin.domain.User;
import com.kulygin.dto.FileDto;
import com.kulygin.dto.UserDto;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class MappingService extends ConfigurableMapper {

    public static final String DOT = ".";
    public static final String STORAGE_NAME_END = "/";

    private MapperFactory factory;

    @Override
    public void configure(MapperFactory factory) {
        this.factory = factory;
    }

    private void registerCustomMappers(MapperFactory factory) {
        factory.classMap(User.class, UserDto.class)
                .customize(new CustomMapper<>() {
                    @Override
                    public void mapAtoB(User obj, UserDto dto, MappingContext context) {
                        super.mapAtoB(obj, dto, context);

                        if (obj != null && obj.getPathToPhotoLink() != null) {
                            InputStream in;
                            byte[] bytes = new byte[0];
                            try {
                                in = new FileInputStream(obj.getPathToPhotoLink());
                                bytes = IOUtils.toByteArray(in);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                            dto.setPhotoFile(bytes);
                            dto.setPhotoFileExtension(getFileExtension(obj.getPathToPhotoLink()));
                        }
                    }
                })
                .byDefault()
                .register();

        factory.classMap(File.class, FileDto.class)
                .customize(new CustomMapper<>() {
                    @Override
                    public void mapAtoB(File obj, FileDto dto, MappingContext context) {
                        super.mapAtoB(obj, dto, context);

                        if (obj != null && obj.getFilepath() != null) {
                            InputStream in;
                            byte[] bytes = new byte[0];
                            try {
                                in = new FileInputStream(obj.getFilepath());
                                bytes = IOUtils.toByteArray(in);
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                            dto.setFile(bytes);
                            dto.setFileExtension(getFileExtension(obj.getFilepath()));
                            dto.setFilename(getFileName(obj.getFilepath()));
                        }
                    }
                })
                .byDefault()
                .register();
    }

    private String getFileName(String filepath) {
        return filepath.substring(filepath.lastIndexOf(STORAGE_NAME_END) + 1);
    }

    private String getFileExtension(String filePathWithName) {
        return filePathWithName.substring(filePathWithName.lastIndexOf(DOT) + 1);
    }

    @PostConstruct
    public void registerStuff() {
        registerCustomMappers(factory);
    }

}
