import Song from "../model/Song";
import AddSongRequest from "../request/AddSongRequest";
import LoadSongRequest from "../request/LoadSongRequest";
import RemoveSongRequest from "../request/RemoveSongRequest";

export const getBaseUrl = (): string => {
    return "http://localhost:8080";
};

export const callApiGET = async (url: string) => {
    let objects: any = "";

    try {
        // Query.
        await fetch(getBaseUrl() + "/api" + url);
    } catch (error) {
        console.error("Error calling API. Message: " + error);
    }

    return objects;
};

export const fetchApiGET = async (url: string) => {
    let objects: any = "";

    try {
        // Query.
        const response = await fetch(getBaseUrl() + "/api" + url);

        // Set.
        objects = await response.json();
    } catch (error) {
        console.error("Error fetching response from API. Message: " + error);
    }

    return objects;
};

const callApiPOST = async (url: string, body?: BodyInit) => {
    try {
        // Prepare.
        let init: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        };

        // Query.
        await fetch(getBaseUrl() + "/api" + url, init);
    } catch (error) {
        console.error("Error calling API. Message: " + error);
    }
};

export const fetchPlaylist = async (): Promise<Song[]> => {
    let playlist: Song[] = [];

    try {
        // Query.
        playlist = await fetchApiGET("/player/playlist");
    } catch (error) {
        console.error("Error fetching playlist: ", error);
    }

    // Set.
    return playlist;
};

export const addSong = async (artistName: string, songName: string, mrl: string) => {
    // Prepare.
    const request: AddSongRequest = {
        artistName,
        songName,
        mrl,
    };

    // Query.
    await callApiPOST("/player/playlist/add", JSON.stringify(request));
};

export const removeSong = async (songId: number) => {
    // Prepare.
    const request: RemoveSongRequest = {
        id: songId,
    };

    // Query.
    await callApiPOST("/player/playlist/remove", JSON.stringify(request));
};

export const loadSong = async (songId: number) => {
    // Prepare.
    const request: LoadSongRequest = {
        id: songId,
    };

    // Query.
    await callApiPOST("/player/playlist/load", JSON.stringify(request));
};

export const playSong = async () => {
    // Query.
    await callApiGET("/player/control/play");
};

export const pauseSong = async () => {
    // Query.
    await callApiGET("/player/control/pause");
};

export const stopSong = async () => {
    // Query.
    await callApiGET("/player/control/stop");
};
