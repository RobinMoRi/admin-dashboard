import React, { useState } from 'react';
import '@fullcalendar/react/dist/vdom';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'
import { Box, List, ListItem, ListItemText, Typography, useTheme, Modal, TextField, Button } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header/Header';

const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currEvents, setCurrEvents] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [eventText, setEventText] = useState('');
    const [selection, setSelection] = useState();

    const handleDateClick = (selected) => {
        handleOpen();
        setSelection(selected);
    }

    const handleClose = () => setOpenModal(false)
    const handleOpen = () => {
        setEventText('')
        setOpenModal(true)
    };
    const onSubmitEvent = () => {
        const calendarApi = selection.view.calendar;
        calendarApi.unselect();
        handleClose();
        if(eventText) {
            calendarApi.addEvent({
                id: `${selection.dateStr}-${eventText}`,
                title: eventText,
                start: selection.startStr,
                end: selection.endStr,
                allDay: selection.allDay,
            })
        }
        setSelection(null);
    }

    const handleEventClick = (selected) => {
        if(
            window.confirm(
                `Are you sure you want to delete the event '${selected.event.title}'`
                
            )
        ){
            selected.event.remove();s
        }
    }


    return (
        <>
            <Box m="20px" >
                <Header title="CALENDAR" subtitle="Full Calendar Interactive Page"/>
                <Box display="flex" jusfifyContent="space-between">
                    <Box flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
                        <Typography variant="h5">Events</Typography>
                        <List>
                            {currEvents.map((event) => {
                                return <ListItem key={event.id} sx={{backgroundColor: colors.greenAccent[500], margin: '10px 0', borderRadius: '2px'}}>
                                    <ListItemText primary={event.title} secondary={
                                        <Typography>
                                            {
                                                formatDate(event.start, 
                                                {year: 'numeric', month: 'short', day: 'numeric'})
                                            }
                                        </Typography>} />
                                </ListItem>
                            })}
                        </List>
                    </Box>
                    <Box flex='1 1 100%' m="20px">
                        <FullCalendar
                            height='75vh'
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                listPlugin
                            ]}
                            headerToolbar={{
                                left: 'prev,next,today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                            }}
                            initialView='dayGridMonth'
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            select={handleDateClick}
                            eventClick={handleEventClick}
                            eventsSet={(events) => setCurrEvents(events)}
                        />
                    </Box> 
                </Box>
            </Box>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box padding="20px" position="absolute" top="50%" left="50%" width="400px" height="200px" borderRadius="10px" backgroundColor={colors.primary[400]}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter a title for your event
                    </Typography>
                    <TextField multiline rows={4} fullWidth onChange={(e) => setEventText(e.target.value)} />
                    <Button variant="text" color="secondary" onClick={onSubmitEvent}>
                        Ange
                    </Button>
                </Box>

            </Modal>
        </>
    );
}

export default Calendar;
