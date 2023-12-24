import { Box, Container } from "@mui/joy";
import React from "react";
import Logo from '../assets/BruLogo.png'
import { Button, Typography } from "@mui/material";
import { ADDEVENT_ROUTE, EVENTPAGE_ROUTE, OFFENSIVE_ROUTE } from "../utils/consts";

function MainPage() {
    return (
        <Container>
            <Typography variant="h6">Добро пожаловать на главную страницу</Typography>
            <Box sx={{ mt: 2 }}>
                <img data-testid="img-1" alt="logo" src={Logo}></img>
            </Box>
            <a href={ADDEVENT_ROUTE} data-testid='add-btn'>
                <Button variant="primary">
                    Добавить мероприятие
                </Button>
            </a>
            <a href={OFFENSIVE_ROUTE} data-testid='off-btn'>
                <Button variant="primary">
                    Перейти к правонарушениям
                </Button>
            </a>
            <a data-testid='report-btn' href={EVENTPAGE_ROUTE}>
                <Button variant="primary">
                    Перейти к отчетам
                </Button>
            </a>
        </Container>
    )
}

export default MainPage