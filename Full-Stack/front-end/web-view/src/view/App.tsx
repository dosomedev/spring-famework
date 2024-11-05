import dsdLogo from "/dsd-logo-symbol-v1.svg";
import './App.css'
import PlaylistTable from './PlaylistTable';
import PlayerControls from './PlayerControls';
import PlayerInterface from './PlayerInterface';
import { Box } from "@mui/material";
import React from "react";
import AddSong from "./AddSong";

interface AppState {
    addSongMask: boolean;
}

export default class App extends React.Component<{}, AppState> {
    state: AppState = {
        addSongMask: false,
    }

    onSetAddSongMaskVisible(setVisible: boolean) {
        this.setState({
            addSongMask: setVisible,
        });
    }

    render() {
        return (
            <>
                <a href="https://dosomedev.com" target="_blank">
                    <img src={dsdLogo} className="logo" alt="Do Some Dev logo" />
                </a>
                <h1>Do Some Dev - Full Stack Example</h1>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <PlayerInterface
                        controls={<PlayerControls onAddSong={() => this.onSetAddSongMaskVisible(true)}/>}
                        playlist={this.state.addSongMask ? <AddSong onCloseAddSongMask={() => this.onSetAddSongMaskVisible(false)}/> : <PlaylistTable/>}
                    />
                </Box>
            </>
        )
    }
}
