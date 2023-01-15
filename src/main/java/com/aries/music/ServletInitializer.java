package com.aries.music;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Author: ljk
 * Date: 2023/1/2 18:01
 * Project: players
 * Version: 1.0
 * description:
 */
public class ServletInitializer extends SpringBootServletInitializer {
    public ServletInitializer() {
        System.out.println("初始化ServletInitializer");
    }
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(MusicApplication.class);
    }
}
