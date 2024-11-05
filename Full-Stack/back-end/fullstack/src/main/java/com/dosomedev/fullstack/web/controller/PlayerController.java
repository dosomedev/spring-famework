package com.dosomedev.fullstack.web.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dosomedev.fullstack.service.logic.PlayerService;
import com.dosomedev.fullstack.service.payload.request.AddSongRequest;
import com.dosomedev.fullstack.service.payload.request.LoadSongRequest;
import com.dosomedev.fullstack.service.payload.request.RemoveSongRequest;
import com.dosomedev.fullstack.service.payload.response.SongResponse;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/player")
public class PlayerController {
    private final PlayerService playerService;

    public PlayerController(
        PlayerService playerService
    ) {
        this.playerService = playerService;
    }

    @GetMapping("/playlist")
    public ResponseEntity<List<SongResponse>> listPlaylist() {
        // Get playlist.
        List<SongResponse> playlist = this.playerService.list();

        // Respond with playlist.
        return ResponseEntity
            .ok()
            .body(playlist);
    }

    @PostMapping("/playlist/add")
    public void addToPlaylist(@RequestBody AddSongRequest request) {
        // Add song to playlist.
        this.playerService.add(request);
    }

    @PostMapping("/playlist/remove")
    public void removeFromPlaylist(@RequestBody RemoveSongRequest request) {
        // Remove song from playlist.
        this.playerService.remove(request);
    }

    @PostMapping("/playlist/load")
    public ResponseEntity<Void> load(@RequestBody LoadSongRequest request) {
        // Load song.
        boolean isLoaded = this.playerService.load(request);

        if (isLoaded) {
            // Return success.
            return ResponseEntity
                .ok()
                .build();
        } else {
            // Return fail.
            return ResponseEntity
                .notFound()
                .build();
        }
    }

    @GetMapping("/control/play")
    public void play() {
        // Play loaded song.
        this.playerService.play();
    }

    @GetMapping("/control/pause")
    public void pause() {
        // Pause loaded song.
        this.playerService.pause();
    }

    @GetMapping("/control/stop")
    public void stop() {
        // Stop loaded song.
        this.playerService.stop();
    }
}
