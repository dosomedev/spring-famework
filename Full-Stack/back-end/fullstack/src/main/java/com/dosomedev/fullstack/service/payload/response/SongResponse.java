package com.dosomedev.fullstack.service.payload.response;

import com.dosomedev.fullstack.data.model.Song;

public class SongResponse {
    private Long id;
    private String artistName;
    private String songName;
    private String mrl;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getArtistName() {
        return artistName;
    }
    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public String getSongName() {
        return songName;
    }
    public void setSongName(String songName) {
        this.songName = songName;
    }
    
    public String getMrl() {
        return mrl;
    }
    public void setMrl(String mrl) {
        this.mrl = mrl;
    }

    public static SongResponse parse(Song song) {
        SongResponse songResponse = new SongResponse();
        songResponse.setId(song.getId());
        songResponse.setArtistName(song.getArtistName());
        songResponse.setSongName(song.getSongName());
        songResponse.setMrl(song.getMrl());

        return songResponse;
    }
}
