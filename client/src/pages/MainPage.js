import { Box, Container } from "@mui/joy";
import React from "react";
import Logo from '../assets/BruLogo.png'
import { Button, Stack, Typography } from "@mui/material";
import { ADDEVENT_ROUTE, EVENTPAGE_ROUTE, OFFENSIVE_ROUTE, REPORTS_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h6">Добро пожаловать на главную страницу</Typography>
            <Box sx={{ mt: 2 }}>
                <img data-testid="img-1" alt="logo" src={Logo}></img>
            </Box>
            <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={() => navigate(ADDEVENT_ROUTE)}>
                    Добавить мероприятие
                </Button>
                <Button variant="outlined" onClick={() => navigate(OFFENSIVE_ROUTE)}>
                    Перейти к правонарушениям
                </Button>
                <Button variant="outlined" onClick={() => navigate(REPORTS_ROUTE)}>
                    Перейти к отчетам
                </Button>
            </Stack>
        </Container>
    )
}

export default MainPage