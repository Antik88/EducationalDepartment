import { Container, Stack } from "@mui/joy";
import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import EventsTable from "../modal/tables/EventsTable";
import SelectSubdivisionModal from "../modal/SelectSubdivisionModal";

function ReportsPage() {
    const [eventModal, setEventModal] = useState()
    const [selectModal, setSelectModal] = useState()

    return (
        <>
            <Container>
                <Typography data-testid="report-header" sx={{ mt: 2 }}>
                    Отчеты
                </Typography>
                <Stack sx={{ mt: 2, width: 300 }}>
                    <Button id="show" sx={{mb: 2}} onClick={() => {setEventModal(true)}} variant="outlined">
                        Показать все мероприятия
                    </Button>
                    <Button onClick={() => {setSelectModal(true)}} variant="outlined">
                        Мероприятия по поразделениям
                    </Button>
                </Stack>
            </Container>
            <EventsTable show={eventModal} hide={() => setEventModal(false)} />
            <SelectSubdivisionModal show={selectModal} hide={() => setSelectModal(false)} />
        </>
    )
}

export default ReportsPage