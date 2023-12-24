import React, { useState } from "react"
import { Box, Button, Modal } from "@mui/material";
import EmployeesTable from "./tables/EmployeesTable";
import StudentTable from "./tables/StudentTable";

function SelectOrgaiz({ show = false, hide }) {
    const [employeesModel, setEmployeesModal] = useState(false)
    const [studentModel, setStudentModel] = useState(false)

    return (
        <>
            <Modal
                open={show}
                onClose={hide}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 500, bgcolor: 'white' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                        <Button onClick={() => setStudentModel(true)} sx={{ width: "300px", mt: 2 }}
                            variant="outlined">
                            Студенты организаторы
                        </Button >
                        <Button onClick={() => setEmployeesModal(true)} sx={{ width: "300px", mt: 2 }} variant="outlined">
                            Преподаватели организаторы
                        </Button>
                        <Button sx={{ width: "150px", mt: 2, mb: 2 }} variant="outlined" 
                            onClick={() => hide()}
                            color="success">
                           Добавить 
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <EmployeesTable show={employeesModel} hide={() => setEmployeesModal(false)} />
            <StudentTable show={studentModel} hide={() => setStudentModel(false)} />
        </>
    )

}

export default SelectOrgaiz