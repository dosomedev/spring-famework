package com.dosomedev.fullstack.service.payload.request;

public class AddSongRequest {
    private String artistName;
    private String songName;
    private String mrl;

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
}
