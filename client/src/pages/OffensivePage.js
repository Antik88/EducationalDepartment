import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import AddOffensiveModal from "../modal/AddOffensiveModal";
import OffensiveTable from "../modal/tables/OffensiveTable";
import { observer } from "mobx-react-lite";

function OffensivePage() {
    const [addModel, setAddModel] = useState(false)
    const [tableModel, setTableModel] = useState(false)

    return (
        <>
            <Container>
                <Typography variant="h5" sx={{ mt: 2 }}>
                    Учет правонарушений
                </Typography>
                <Box
                    sx={{ display: "flex", flexDirection: "column", width: "400px" }}
                >
                    <Button
                        sx={{ mt: 2 }} variant="outlined"
                        onClick={() => setAddModel(true)}
                        data-testid="add-btn"
                    >
                        Добавить правонарушение
                    </Button>
                    <Button
                        sx={{ mt: 2 }} variant="outlined"
                        onClick={() => setTableModel(true)}
                    >
                        Список всех правонарушений
                    </Button>
                </Box>
            </Container>
            <AddOffensiveModal show={addModel} hide={() => {
                setAddModel(false)
                window.location.reload()
                }}/>
            <OffensiveTable show={tableModel} hide={() => setTableModel(false)} />
        </>
    )
}

export default observer(OffensivePage)