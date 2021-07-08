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
public class FeedbackDto implements Serializable {

    private String id;
    private String userName;
    private String contactData;
    private String text;

}
