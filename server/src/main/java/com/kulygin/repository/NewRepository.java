package com.kulygin.repository;

import com.kulygin.domain.New;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NewRepository extends MongoRepository<New, String> {
}
