import React, { useContext, useEffect, useState } from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { Context } from "..";
import { fatchAllSubdivisions } from "../http/subdivisionApi";
import { useNavigate } from "react-router-dom";
import { FILTEREVENTPAGE_ROUTE } from "../utils/consts";

function SelectSubdivisionModal({ show = false, hide }) {
    const {dataStore} = useContext(Context)
    const [subdivisions, setSubdivisions] = useState()
    const history = useNavigate()

    const columns = [
        {
            field: 'id',
            headerName: 'id',
            width: 10,
            editable: true,
        },
        {
            field: 'name',
            headerName: 'Название',
            width: 250,
            editable: true,
        },
    ];

    useEffect(() => {
        fatchAllSubdivisions().then((data) => setSubdivisions(data))
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
                            rows={subdivisions}
                            columns={columns}
                            pageSize={10}
                            getRowId={(row) => row.id}
                            checkboxSelection
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={(data) => {
                                dataStore.setSelectedSubdivision(data)
                            }}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                            disableColumnFilter
                        />
                    </Box>
                    <Box
                        display={"felx"}
                    >
                        <Button
                            sx={{mr: 2}}
                            variant="outlined"
                            color="success"
                            onClick={() => {
                                history(FILTEREVENTPAGE_ROUTE)
                            }}
                        >
                            Ok 
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

export default SelectSubdivisionModal 