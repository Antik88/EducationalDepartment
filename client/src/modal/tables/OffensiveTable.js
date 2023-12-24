import React, { useEffect, useState } from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Modal } from "@mui/material";
import { fatchAllViolations } from "../../http/offensivsApi";
import { observer } from "mobx-react-lite";

function OffensiveTable({ show = false, hide }) {
    const [violatios, setViolations] = useState()

    const columns = [
        {
            field: 'student',
            headerName: 'Полное имя',
            width: 250,
            editable: true,
            valueGetter: (params) => params.row.student.full_name,
        },
        {
            field: 'article',
            headerName: 'Организация',
            width: 230,
            editable: true,
        },
        {
            field: 'penalty',
            headerName: 'Решение суда',
            width: 230,
            editable: true,
        },
        {
            field: 'date_committed',
            headerName: 'Дата совершения',
            width: 230,
            editable: true,
            valueGetter: (params) => {
                const date = new Date(params.row.date_committed);
                return date.toLocaleDateString('ru-RU');
            },
        },
        {
            field: 'court_decision',
            headerName: 'Описание',
            width: 230,
            editable: true,
        }
    ];

    useEffect(() => {
        fatchAllViolations().then(data => setViolations(data))
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
                            rows={violatios}
                            columns={columns}
                            disableSelectionOnClick
                            autoPageSize={true}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                            disableColumnFilter
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default observer(OffensiveTable)