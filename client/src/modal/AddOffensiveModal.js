import { Box, Button, TextField, Modal, Typography, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Textarea } from "@mui/joy";
import { createStudent } from "../http/studentApi";
import { createWStudent } from "../http/offensivsApi";

function AddOffensiveModal({ show = false, hide }) {
    const [filde, setFilde] = useState(false)
    const [firstName, setFirstName] = useState()
    const [secondName, setsecondName] = useState()
    const [surename, setSurename] = useState()
    const [group, setGroup] = useState()
    const [article, setArticle] = useState()
    const [review, setReview] = useState()
    const [date, setDate] = useState()
    const [description, setDescription] = useState()

    const addStudent = () => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        if (!article || !formattedDate || !description || !review || !firstName || !secondName || !surename || !group) {
            setFilde(true)
        } else {
            createWStudent({
                article: article,
                date_committed: formattedDate,
                court_decision: description,
                penalty: review,
                full_name: firstName + " " + secondName + " " + surename,
                group_name: group
            }).then(() => {
                hide();
            });
        }
    };

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setFilde(false);
	};

    return (
        <>
            <Modal
                open={show}
                onClose={hide}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 900,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        id="add-invitee-modal-title"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >
                        Добавить правонарушение
                    </Typography>
                    <Box
                        display={"flex"}
                        flexDirection={"row"}
                    >
                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            width={400}
                            sx={{ mr: 2 }}
                        >
                            <TextField
                                sx={{ mt: 2 }}
                                label="Фамилия"
                                value={secondName}
                                onChange={e => setsecondName(e.target.value)}
                            />
                            <TextField
                                sx={{ mt: 2 }}
                                label="Имя"
                                value={firstName}
                                onChangeCapture={e => setFirstName(e.target.value)}
                            />
                            <TextField
                                sx={{ mt: 2 }}
                                label="Отчество"
                                value={surename}
                                onChangeCapture={e => setSurename(e.target.value)}
                            />
                            <TextField
                                sx={{ mt: 2 }}
                                label="Группа"
                                value={group}
                                onChange={e => setGroup(e.target.value)}
                            />
                        </Box>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            width={500}
                        >
                            <TextField
                                sx={{ mt: 2 }}
                                label="Статья"
                                value={article}
                                onChange={(e) => setArticle(e.target.value)}
                            />
                            <Textarea
                                size="lg"
                                placeholder="Решение суда"
                                sx={{ mt: 2 }}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                            <Textarea
                                size="lg"
                                placeholder="Описание"
                                sx={{ mt: 2 }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{ mt: 2 }}
                                    label="Дата совершения"
                                    value={date}
                                    onChange={(e) => setDate(e)}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                    >
                        <Button
                            sx={{ mt: 2 }}
                            variant="outlined"
                            color="success"
                            onClick={addStudent}
                        >
                            Добавить
                        </Button>
                        <Button
                            sx={{ mt: 2 }}
                            variant="outlined"
                            color="error"
                            onClick={hide}
                        >
                            Отмена
                        </Button>
                    </Box>
                </Box>
            </Modal>
			<Snackbar open={filde} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					Заполните все поля
				</Alert>
			</Snackbar>
        </>
    )
}

export default AddOffensiveModal