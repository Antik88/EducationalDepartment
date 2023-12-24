import React, { useContext, useEffect, useState } from "react";
import { Box, Container, FormControl, FormGroup, Typography, Button, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Textarea } from "@mui/joy";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import SelectOrganiz from "../modal/SelectOrganiz";
import InvitePersonsTable from "../modal/tables/InvitePersonsTable";
import { Context } from "..";
import { fatchAllSubdivisions } from "../http/subdivisionApi";
import { observer } from "mobx-react-lite";
import { fatchAllCategories, fatchAllFacultis } from "../http/facultyApi";
import { createEvent } from "../http/eventApi";
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getOneInvite } from "../http/invitesApi";
import PromiseRenderer from "../components/PromiseRenderer";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddEvent() {
	const { eventStore } = useContext(Context)
	const { dataStore } = useContext(Context)

	const [dischipl, setDischipl] = useState("");
	const [faculty, setFaculty] = useState("");
	const [subdivision, setSubdivision] = useState("");
	const [eventName, setEventName] = useState("");
	const [eventGoal, setEventGoal] = useState("");
	const [note, setNote] = useState()
	const [inviteItem, setInviteItem] = useState()

	const [invitesTable, setInvitesTavle] = useState(false);
	const [organizeModal, setOrganizeModal] = useState(false);
	const [dateLine, setDateLine] = useState(null);

	const [open, setOpen] = React.useState(false);
	const [filde, setFilde] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		setFilde(false);
	};

	const decanat = 2

	useEffect(() => {
		fatchAllSubdivisions().then(data => eventStore.setSubdivisions(data));
		fatchAllFacultis().then(data => eventStore.setFacultis(data))
		fatchAllCategories().then(data => eventStore.setCategories(data))
	}, [eventStore]);

	const addEvent = () => {
		const event = {
			name: eventName,
			subdivision_id: subdivision,
			category_id: dischipl,
			deadline: dateLine,
			planned_result: eventGoal,
			completion_status: false,
			note: note,
			invited: dataStore.selectedInvites,
			organize: {
				employeers: dataStore.selectedEmployers,
				student: dataStore.selectedStudents
			}
		};

		if (!eventName || !subdivision || !dischipl || !dateLine || !eventGoal || !note
			|| !dataStore.selectedEmployers) {
				setFilde(true)
		} else {
			createEvent(event).then((data) => console.log(data))
			handleClick()
		}
	}

	const handleDateChange = (date) => {
		setDateLine(date);
	};

	return (
		<Container sx={{ display: "flex" }}>
			<Box sx={{ mt: 2 }}>
				<Typography variant="h6">Добавить мероприятие</Typography>
				<Grid container spacing={2}>
					<Grid item>
						<FormControl sx={{ width: 500, mt: 2 }}>
							<InputLabel id="subdivision-label">Подразделение</InputLabel>
							<Select
								labelId="subdivision-label"
								id="subdivision-select"
								value={subdivision}
								label="Подразделение"
								onChange={(event) => setSubdivision(event.target.value)}
							>
								{eventStore.subdivisions.map((subdivision) => (
									<MenuItem
										key={subdivision.id}
										value={subdivision.id}>
										{subdivision.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					{subdivision === decanat && (
						<Grid item >
							<FormControl sx={{ mt: 2, width: 300 }}>
								<InputLabel id="additional-select-label">Факультет</InputLabel>
								<Select
									labelId="additional-select-label"
									id="additional-select"
									value={faculty}
									label="Факультет"
									onChange={(event) => setFaculty(event.target.value)}
								>
									{eventStore.facultis.map((faculty) => (
										<MenuItem
											key={faculty.id}
											value={faculty.id}
										>
											{faculty.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					)}
					{dataStore.selectedInvites.length !== 0 ? (
						<Grid item>
							<Typography>Приглашенные:</Typography>
							{dataStore.selectedInvites.map((id) => (
								<PromiseRenderer key={id} promise={getOneInvite(id)} />
							))}
						</Grid>
					) : (
						<></>
					)}
				</Grid>
				<Grid container spacing={2}>
					<Grid item>
						<FormControl sx={{ width: 500, mt: 2 }}>
							<InputLabel id="subdivision-label">
								Направление подготовки
							</InputLabel>
							<Select
								labelId="subdivision-label"
								id="subdivision-select"
								value={dischipl}
								label="Направление подготовки"
								onChange={(event) => setDischipl(event.target.value)}
							>
								{eventStore.categories.map((category) => (
									<MenuItem
										key={category.id}
										value={category.id}
									>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<FormGroup sx={{ width: 500 }}>
					<Textarea
						sx={{ mt: 2 }}
						placeholder="Название мероприятия"
						id="event_name"
						value={eventName}
						onChange={(event) => setEventName(event.target.value)}
						size="lg"
					/>
					<Textarea
						sx={{ mt: 2 }}
						placeholder="Цель мероприятия"
						id="event_goal"
						value={eventGoal}
						size="lg"
						onChange={(e) => setEventGoal(e.target.value)}
					/>
					<Textarea
						sx={{ mt: 2 }}
						placeholder="Примечание"
						id="event_goal"
						value={note}
						size="lg"
						onChange={(e) => setNote(e.target.value)}
					/>
					<Button
						sx={{ mt: 2 }}
						variant="outlined"
						onClick={() => setOrganizeModal(true)}
					>
						Добавить организаторов
					</Button>
					<Button
						sx={{ mt: 2 }}
						variant="outlined"
						onClick={() => setInvitesTavle(true)}
					>
						Добавить приглашенных
					</Button>
					<LocalizationProvider dateAdapter={AdapterDayjs} locale="ru">
						<DatePicker
							data-testid='date-input'
							sx={{ mt: 2 }}
							value={dateLine ? dayjs(dateLine).format('DD-MM-YYYY') : ''}
							onChange={(newValue) => handleDateChange(newValue)}
							label="Дата проведения"
						/>
					</LocalizationProvider>
					<Button sx={{ mt: 2 }} onClick={() => addEvent()} variant="outlined">
						Добавить мероприятие
					</Button>
				</FormGroup>
			</Box>
			<SelectOrganiz show={organizeModal} hide={() => setOrganizeModal(false)} />
			<InvitePersonsTable show={invitesTable} hide={() => setInvitesTavle(false)} />
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					Мероприятие добавлено
				</Alert>
			</Snackbar>
			<Snackbar open={filde} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					Заполните все поля
				</Alert>
			</Snackbar>
		</Container >
	);
}

export default observer(AddEvent);