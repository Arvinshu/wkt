// 文件位置：src/main/java/org/ls/config/CacheConfig.java

package org.ls.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.http.CacheControl;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 禁用 /components/** 路径下所有资源的缓存
        registry.addResourceHandler("/components/**")
                .addResourceLocations("classpath:/static/components/")
                .setCacheControl(CacheControl.noStore()); // 彻底禁用缓存

        // 可选：其他静态资源配置（如 CSS/JS）
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.maxAge(7, TimeUnit.DAYS));
    }
}