import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Song from "../data/model/Song";
import React from "react";
import { fetchPlaylist, loadSong, removeSong, stopSong } from "../data/api/ApiAccess";
import DeleteIcon from "@mui/icons-material/Delete";

interface PlaylistTableState {
    songs: Song[];
    selectedSongId: number;
}

export default class PlaylistTable extends React.Component<{}, PlaylistTableState> {
    state: PlaylistTableState = {
        songs: [],
        selectedSongId: 0,
    }

    componentDidMount(): void {
        this.initPlaylist();
    }

    initPlaylist() {
        console.log("PlaylistTable.initPlaylist()");
        fetchPlaylist().then((playlist: Song[]) => {
            console.log(playlist);
            this.setState({songs: playlist});
            this.onSelectSong(playlist.length > 0 ? playlist[0].id : 0);
        });
    }

    onSelectSong(songId: number) {
        this.setState({
            selectedSongId: songId,
        });

        loadSong(songId);
    }

    async onRemoveSong(songId: number) {
        await stopSong();
        await removeSong(songId);
        this.initPlaylist();
    }

    render() {
        return <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#64e0ea' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#555555' }}>Artist</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#555555' }}>Song</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.songs.map((song) => (
                        <TableRow
                            hover
                            key={song.id}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 }
                            }}
                            onClick={() => this.onSelectSong(song.id)}
                            selected={song.id === this.state.selectedSongId}
                        >
                            <TableCell component="th" scope="row" sx={{ color: '#555555' }}>
                                {song.artistName}
                            </TableCell>
                            <TableCell align="left" sx={{ color: '#555555' }}>
                                {song.songName}
                            </TableCell>
                            <TableCell align="left" sx={{ color: '#555555' }}>
                            <Fab size="small" aria-label="remove" onClick={() => this.onRemoveSong(song.id)}>
                                <DeleteIcon />
                            </Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>;
    }
}
