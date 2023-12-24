import React, { useContext, useEffect, useState } from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { observer } from "mobx-react-lite";
import {fatchAllEmployeers} from '../../http/employeeApi'
import { Context } from "../..";

function EmployeesTable({ show = false, hide }) {
    const {dataStore} = useContext(Context)

    const [employee, setEmployee] = useState()

    const columns = [
        {
            field: 'id',
            headerName: 'id',
            width: 10,
            editable: true,
        },
        {
            field: 'full_name',
            headerName: 'Полное имя',
            width: 250,
            editable: true,
        },
        {
            field: 'group_number',
            headerName: 'Куратор группы',
            width: 230,
            editable: true,
        },
    ];

    useEffect(() => {
        fatchAllEmployeers().then(data => setEmployee(data))
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
                            rows={employee}
                            columns={columns}
                            pageSize={10}
                            getRowId={(row) => row.id}
                            checkboxSelection
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={(data) => {
                                dataStore.setSelectedEmployeers(data)
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
                                console.log(dataStore.selectedEmployers) 
                                hide()
                            }}
                        >
                            Добавить
                        </Button>
                        <Button
                            variant="outlined"
                            color="warning"
                            onClick={() => {
                                hide()
                            }}
                        >
                            Отмена
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default observer(EmployeesTable)