import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Stack } from "@mui/material";
import { pauseSong, playSong, stopSong } from "../data/api/ApiAccess";
import React from "react";

interface PlayerControlProps {
    onAddSong: () => void;
}

export default class PlayerControls extends React.Component<PlayerControlProps, {}> {
    render() {
        return <>
            <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                <Fab aria-label="play" sx={{ backgroundColor: '#07d100' }} onClick={() => playSong()}>
                    <PlayArrowIcon/>
                </Fab>
                <Fab aria-label="pause" sx={{ backgroundColor: '#f6a100' }} onClick={() => pauseSong()}>
                    <PauseIcon/>
                </Fab>
                <Fab aria-label="stop" sx={{ backgroundColor: '#d62d00' }} onClick={() => stopSong()}>
                    <StopIcon/>
                </Fab>
                <Fab aria-label="add" sx={{ backgroundColor: '#3f5cff' }} onClick={() => this.props.onAddSong()}>
                    <AddIcon/>
                </Fab>
            </Stack>
        </>;
    }
}
