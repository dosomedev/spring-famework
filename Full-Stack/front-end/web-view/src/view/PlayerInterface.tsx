import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";

interface PlayerInterfaceProps {
    controls: JSX.Element;
    playlist: JSX.Element;
}

export default class PlayerInterface extends React.Component<PlayerInterfaceProps, {}> {
    render() {
        return <Card sx={{ width: 400 }}>
            <CardMedia
                sx={{ height: 200 }}
                image="/player-logo.png"
                title="Music Player"
            />
            <CardContent
                sx={{ backgroundColor: '#eeeeee' }}
            >
                <Typography gutterBottom variant="h5" component="div">
                    Music Player
                </Typography>
                <Stack direction="column" spacing={2}>
                    {this.props.controls}
                    {this.props.playlist}
                </Stack>
            </CardContent>
        </Card>;
    }
}
