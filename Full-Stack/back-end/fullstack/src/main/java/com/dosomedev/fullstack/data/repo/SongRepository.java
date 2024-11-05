package com.dosomedev.fullstack.data.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dosomedev.fullstack.data.model.Song;

public interface SongRepository extends JpaRepository<Song, Long> {
    
}
