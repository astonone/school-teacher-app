package com.kulygin.config;

import com.kulygin.dto.FolderDto;
import com.kulygin.dto.UserDto;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.config.units.MemoryUnit;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.SimpleKey;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.cache.CacheManager;
import javax.cache.Caching;
import javax.cache.spi.CachingProvider;
import java.util.List;

@Configuration
@EnableCaching
public class CachingConfig {

    @Bean
    public javax.cache.CacheManager ehCacheManager() {
        CachingProvider provider = Caching.getCachingProvider();
        CacheManager cacheManager = provider.getCacheManager();

        CacheConfigurationBuilder<String, UserDto> userDtoCacheConfiguration =
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                        String.class, UserDto.class,
                        ResourcePoolsBuilder
                                .newResourcePoolsBuilder().offheap(10, MemoryUnit.MB));
        javax.cache.configuration.Configuration<String, UserDto> userConfiguration =
                Eh107Configuration.fromEhcacheCacheConfiguration(userDtoCacheConfiguration);

        CacheConfigurationBuilder<SimpleKey, List> newsCacheConfiguration =
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                        SimpleKey.class, List.class,
                        ResourcePoolsBuilder
                                .newResourcePoolsBuilder().offheap(10, MemoryUnit.MB));
        javax.cache.configuration.Configuration<SimpleKey, List> newsConfiguration =
                Eh107Configuration.fromEhcacheCacheConfiguration(newsCacheConfiguration);

        CacheConfigurationBuilder<String, FolderDto> foldersCacheConfiguration =
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                        String.class, FolderDto.class,
                        ResourcePoolsBuilder
                                .newResourcePoolsBuilder().offheap(10, MemoryUnit.MB));
        javax.cache.configuration.Configuration<String, FolderDto> foldersConfiguration =
                Eh107Configuration.fromEhcacheCacheConfiguration(foldersCacheConfiguration);

        CacheConfigurationBuilder<SimpleKey, List> folderListCacheConfiguration =
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                        SimpleKey.class, List.class,
                        ResourcePoolsBuilder
                                .newResourcePoolsBuilder().offheap(100, MemoryUnit.MB));
        javax.cache.configuration.Configuration<SimpleKey, List> folderListConfiguration =
                Eh107Configuration.fromEhcacheCacheConfiguration(folderListCacheConfiguration);

        CacheConfigurationBuilder<SimpleKey, List> feedbacksCacheConfiguration =
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                        SimpleKey.class, List.class,
                        ResourcePoolsBuilder
                                .newResourcePoolsBuilder().offheap(10, MemoryUnit.MB));
        javax.cache.configuration.Configuration<SimpleKey, List> feedbacksConfiguration =
                Eh107Configuration.fromEhcacheCacheConfiguration(feedbacksCacheConfiguration);


        cacheManager.createCache("users", userConfiguration);
        cacheManager.createCache("news", newsConfiguration);
        cacheManager.createCache("folder-list", folderListConfiguration);
        cacheManager.createCache("folders", foldersConfiguration);
        cacheManager.createCache("feedbacks", feedbacksConfiguration);
        return cacheManager;
    }
}
