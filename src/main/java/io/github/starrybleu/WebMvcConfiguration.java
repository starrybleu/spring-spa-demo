package io.github.starrybleu;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
    private static final String FORWARD_TO_INDEX = "forward:/";

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        WebMvcConfigurer.super.addViewControllers(registry);
        registry.addViewController("/{path:[\\w\\-]+}")
                .setViewName(FORWARD_TO_INDEX);
        registry.addViewController("/**/{path:[\\w\\-]+}")
                .setViewName(FORWARD_TO_INDEX);
    }

}
