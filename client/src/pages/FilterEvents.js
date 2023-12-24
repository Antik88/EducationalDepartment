import React, { useContext, useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { fatchAllEventsParams } from "../http/eventApi";
import { Context } from "..";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function FilterEvents() {
    const { dataStore } = useContext(Context);
    const [events, setEvents] = useState(null);
    const [subdiv, setSubdiv] = useState([]);

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const columns = [
        {
            field: "name",
            headerName: "Название",
            width: 230,
            editable: false,
        },
        {
            field: "planned_result",
            headerName: "Планируемый результат",
            width: 230,
            editable: false,
        },
        {
            field: "completion_status",
            headerName: "Статус",
            width: 100,
            editable: false,
        },
        {
            field: "note",
            headerName: "Примечание",
            width: 230,
            editable: false,
        },
        {
            field: "id",
            headerName: "Подробнее",
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
        fatchAllEventsParams(dataStore.selectedSubdivision).then((data) => {
            setEvents(data);
            const uniqueSubdivisions = [
                ...new Set(data.map((event) => event.subdivision.name)),
            ];
            setSubdiv(uniqueSubdivisions);
        });
    }, [dataStore.selectedSubdivision]);

    const handleExportPDF = () => {
        if (events) {
            const docDefinition = {
                content: [
                    { text: "Мероприятия по структурным подразделениям", style: "header" },
                    { text: "\n" },
                    { text: subdiv.join(", ") },
                    { text: "\n" },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ["*", "*", "*", "*"],
                            body: [
                                ["Название", "Планируемый результат", "Статус", "Примечание"],
                                ...events.map((event) => [
                                    event.name,
                                    event.planned_result,
                                    event.completion_status,
                                    event.note,
                                ]),
                            ],
                        }
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment: "center",
                    },
                    tableHeader: {
                        bold: true,
                    },
                },
            };

            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            pdfDocGenerator.download("events.pdf");
        }
    };

    return (
        <Container>
            <Typography>Мероприятия по структурным подразделениям:</Typography>
            {events ? (
                <>
                    {subdiv.map((e) => (
                        <Typography key={e}>{e}</Typography>
                    ))}
                    <Button variant="contained" onClick={handleExportPDF}>
                        Экспорт в PDF
                    </Button>
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
                </>
            ) : (
                <Typography>Загрузка...</Typography>
            )}
        </Container>
    );
}

export default FilterEvents;