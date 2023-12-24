import React, { useEffect, useState } from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { observer } from "mobx-react-lite";
import { fatchAllEvents } from "../../http/eventApi";
import { Link, useNavigate } from "react-router-dom";
import { ADDEVENT_ROUTE } from "../../utils/consts";

function EventsTable({ show = false, hide }) {
    const [events, setEvents] = useState()
    const history = useNavigate()

    const columns = [
        {
            field: 'name',
            headerName: 'Название',
            width: 230,
            editable: false,
        },
        {
            field: 'planned_result',
            headerName: 'Планируемый резельтат',
            width: 230,
            editable: false,
        },
        {
            field: 'completion_status',
            headerName: 'Статус',
            width: 100,
            editable: false,
        },
        {
            field: 'note',
            headerName: 'Примечание',
            width: 230,
            editable: false,
        },
        {
            field: 'id',
            headerName: 'Подробнее',
            width: 120,
            renderCell: (params) => (
                <Button
                    component={Link}
                    to={`/event/${params.value}`}
                    variant="text"
                    color="primary"
                >
                   Подробнее 
                </Button>
            ),
        },
    ];

    useEffect(() => {
        fatchAllEvents().then((data) => setEvents(data))
    }, [])

    return (
        <>
            <Modal
                open={show}
                onClose={hide}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 1300, bgcolor: 'white' }}>
                    <Box sx={{ height: 600 }}>
                        <DataGrid
                            rows={events}
                            columns={columns}
                            pageSize={10}
                            getRowId={(row) => row.id}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                            disableColumnFilter
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                    <Box
                        display={"felx"}
                    >
                        <Button
                            sx={{ mr: 2 }}
                            variant="outlined"
                            color="success"
                            onClick={() => {
                                history(ADDEVENT_ROUTE)
                                hide()
                            }}
                        >
                            Добавить
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                hide()
                            }}
                        >
                            Назад
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default observer(EventsTable)