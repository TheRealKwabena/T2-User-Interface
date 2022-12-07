import React, {useCallback, useEffect, useState} from 'react';
import './Dentistries.css';
import Map from '../../components/GoogleMapsApi/Map';
import { dentistries } from '../../data/dentistries';
import SearchBar from '../../components/SearchBar/SearchBar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FullCalendar, { DateSelectArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';


const Dentistries: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(true);
    const [appointmentInfo, setAppointmentInfo] = useState<DateSelectArg | undefined>(undefined);
    const [eventTitle, setEventTitle] = useState<string>('');

    const createAppointment = async (selectInfo: DateSelectArg | undefined) => {
        console.log('creating appointment ...')
        
        if (selectInfo !== undefined) {
            console.log(`${bookingConfirmed} should be true`)
            const onSlotSelect = selectInfo.view.calendar
            if (bookingConfirmed) {
                onSlotSelect.addEvent({
                    id: Math.floor((Math.random() * 100) + 1).toString(),
                    title: eventTitle,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    allDay: selectInfo.allDay
                });
            } else {
                onSlotSelect.unselect()
            }
        }
    }
    
    return (
            <div className='card'>
                <div className='title'>
                    Our Dentistries
                </div>
                    <div className='search_bar_container'>
                        <SearchBar />
                    </div>
                    <Map />
                    <div className='dentistry_container'>
                        <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Book Appointment
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {/*Please mention the times. 
                                (Need to add input boxes, one is disabled, that is 30mins + start).*/}
                                Name: <input type="text" name="Name" id="" placeholder='Name' value={eventTitle} onChange={(e) => {
                                    setEventTitle(e.target.value)
                                }}/>
                                <br></br><br></br>
                                Start Time: <input type="time" name="StartTime" id='start-time' /*onChange={}*//>
                                End Time: <input type="time" name="EndTime" id='end-time' /*onChange={}*//>
                            </Modal.Body>
                            <Modal.Footer>
                                <div id="button" style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <Button variant='success' size='sm' onClick={() => {
                                        console.log(bookingConfirmed)
                                        setBookingConfirmed(true)
                                        createAppointment(appointmentInfo)
                                        setEventTitle('')
                                        setTimeout(() => setModalOpen(false), 200);
                                    }}>Confirm Appointment</Button>
                                </div>
                            </Modal.Footer>
                        </Modal>
                        {
                            dentistries.map((dentistry: any, index: number) => (
                                <Accordion id='accordion' TransitionProps={{ unmountOnExit: true }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                    <p className='name'> Name: {dentistry.name}</p>
                                    <p className='address'> Address: {dentistry.address}</p>
                                    <p className='dentists'> Dentists: {dentistry.dentists}</p>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Typography>
                                            
                                    <FullCalendar
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: 'timeGridWeek,timeGridDay'
                                        }}
                                        dateClick={() => createAppointment}
                                        initialView='timeGridDay'
                                        selectable={true}
                                        selectMirror={true}
                                        editable={false}
                                        dayMaxEvents={true}
                                        initialEvents={dentistry.appointments}
                                        select={(info) => {
                                            setAppointmentInfo(info)
                                            setModalOpen(true)
                                        }}
                                        selectConstraint={{
                                            end: '00:30:00'
                                        }}
                                        eventOverlap={false}
                                        allDaySlot={false}
                                        slotMinTime={'08:00:00'}
                                        slotMaxTime={'17:00:00'}
                                        weekends={false}
                                        defaultTimedEventDuration={'00:30'}
                                        selectAllow={(info) => {
                                            if (info.end.getTime() - info.start.getTime() <= (30 * 60 * 1000)) {
                                                return true
                                            } else {
                                                return false
                                            }
                                        }}
                                        forceEventDuration={true}
                                        eventSources={[
                                            {
                                                events: [{
                                                    id: 'lunch',           //to be adjusted later:
                                                    startTime: '11:00:00', //should be made flexible to the dentist's comfort
                                                    endTime: '12:00:00',
                                                    daysOfWeek: ['1', '2', '3', '4', '5'],
                                                    display: 'background'
                                                }],
                                                constraint: {
                                                    //need to somehow check if length of appointment is strictly
                                                    //30 minutes, no longer
                                                }
                                            }  
                                        ]}
                                        selectOverlap={(event) => {
                                            return event.display === 'inverse-background';
                                        }}
                                    /> 

                                    </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))} 
                    </div>
            </div>
    )

}



export default Dentistries;