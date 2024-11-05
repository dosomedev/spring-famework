import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { addSong } from "../data/api/ApiAccess";

interface AddSongProps {
    onCloseAddSongMask: () => void;
}

interface AddSongState {
    txtArtist: string,
    txtSong: string,
    txtPath: string,
}

export default class AddSong extends React.Component<AddSongProps, AddSongState> {
    state: AddSongState = {
        txtArtist: "",
        txtSong: "",
        txtPath: "",
    }

    handleAdd() {
        addSong(this.state.txtArtist, this.state.txtSong, this.state.txtPath);
        this.props.onCloseAddSongMask();
    }

    handleCancel() {
        this.props.onCloseAddSongMask();
    }

    render() {
        return <>
            <Stack direction="column" spacing={2} sx={{ justifyContent: "center" }}>
                <TextField
                    label="Artist"
                    variant="outlined"
                    sx={{ backgroundColor: '#FFFFFF' }}
                    slotProps={{ htmlInput: { maxLength: 255 } }}
                    value={this.state.txtArtist}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({txtArtist: event.target.value})}
                />
                <TextField
                    label="Song"
                    variant="outlined"
                    sx={{ backgroundColor: '#FFFFFF' }}
                    slotProps={{ htmlInput: { maxLength: 255 } }}
                    value={this.state.txtSong}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({txtSong: event.target.value})}
                />
                <TextField
                    label="Path"
                    variant="outlined"
                    sx={{ backgroundColor: '#FFFFFF' }}
                    slotProps={{ htmlInput: { maxLength: 255 } }}
                    value={this.state.txtPath}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({txtPath: event.target.value})}
                />
                <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                    <Button variant="contained" color="success" onClick={() => this.handleAdd()}>Add</Button>
                    <Button variant="outlined" color="error" onClick={() => this.handleCancel()}>Cancel</Button>
                </Stack>
            </Stack>
        </>;
    }
}
