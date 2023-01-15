package com.aries.music.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Author: ljk
 * Date: 2022/12/30 17:44
 * Project: players
 * Version: 1.0
 * description:
 */
@Controller
public class MainController {

    @GetMapping("!s&artist={artist}&album={album}")
    public String index(@PathVariable("artist") String artist,
                        @PathVariable("album") String album) {
        return "/album/album";
    }

    @GetMapping("?artist={artist}&album={album}&source={source}")
    public String main(@PathVariable("artist") String artist,
                       @PathVariable("album") String album,
                       @PathVariable("source") String source
    ) {
        return "index";
    }
}
