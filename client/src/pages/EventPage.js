import React, { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchOneEvent } from "../http/eventApi";
import { Box } from "@mui/material";

function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchOneEvent(id)
                .then((data) => {
                    setEvent(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Ошибка при получении события:", error);
                    setLoading(false);
                });
        } else {
            console.log("eventId не определен");
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h6">
                Название: {event ? event.name : "Loading..."}
                {console.log(event)}
            </Typography>
            <Typography>Структурное подразделение: {event.subdivision.name}</Typography>
            <Typography>Направление подготовки: {event.category.name}</Typography>
            <Typography>Выполнено: {event.completion_status.name ? "Да" : "Нет"}</Typography>
            <Typography>Планируемый резельтат: {event.planned_result}</Typography>
            <Typography>Примечание: {event.note}</Typography>
            <Typography>Приглашенные:</Typography>
            <ul>
                {event.Invitees.map((person) => {
                    return (
                        <li style={{ marginBottom: "10px" }} key={person.id}>
                            <Typography>
                                Имя: {person.full_name}
                            </Typography>
                            <Typography>
                                Должность: {person.position}
                            </Typography>
                            <Typography>
                                Организация: {person.organization}
                            </Typography>
                        </li>
                    );
                })}
            </ul>
            <Typography>Организаторы: </Typography>
            <ul style={{ marginTop: "10px" }}>
                <Typography >Преподаватели: </Typography>
                {event.Organizers.map((organizer) => {
                    if (organizer.Employee) {
                        return (
                            <li style={{ marginBottom: "10px", marginLeft: "25px"}} key={organizer.id}>
                                <Box>
                                    <Typography>
                                        Имя: {organizer.Employee.full_name}
                                    </Typography>
                                    {organizer.Employee.group_number && (
                                        <Typography>
                                            Куратор: {organizer.Employee.group_number}
                                        </Typography>
                                    )}
                                </Box>
                            </li>
                        );
                    } else {
                        return null
                    }
                })}
                <Typography >Студенты: </Typography>
                {event.Organizers.map((organizer) => {
                    if (organizer.Employee) {
                        return null;
                    } else {
                        return (
                            <li style={{marginLeft: "25px"}} key={organizer.id}>
                                <Box>
                                    <Typography>
                                        Имя: {organizer.Student.full_name}
                                    </Typography>
                                    <Typography>
                                        Группа: {organizer.Student.group_name}
                                    </Typography>
                                </Box>
                            </li>
                        );
                    }
                })}
            </ul>
        </Container>
    );
}

export default EventPage;