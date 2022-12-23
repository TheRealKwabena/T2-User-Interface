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
import {getAppointments, connectMQTT, publish, sub} from '../../Infrastructure/PMQTTController';

interface IFetchedSlot {
    id?: string | undefined;
    title?: string;
    start: Date | string;
    end: Date | string;
    display: string;
    color: string;
}

interface IAppInfo {
    slot: DateSelectArg | undefined;
    id: string | undefined;
}

const Dentistries: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(true);
    const [appointmentInfo, setAppointmentInfo] = useState<IAppInfo>({slot: undefined, id: undefined});
    const [eventTitle, setEventTitle] = useState<string>('');
    const [id, setId] = useState<string>('');
    
    useEffect(() => {
        connectMQTT();
        console.log(Math.ceil(Math.random()*10000000));
    }, []);

    const createAppointment = (selectInfo: IAppInfo) => {
        if (selectInfo.slot !== undefined && selectInfo.id !== undefined) {
            const onSlotSelect = selectInfo.slot.view.calendar
            if (bookingConfirmed) {
                let desiredEvent = {
                    userId: '1274187', //authentication should add it in 
                    requestId: '10',   //to be replaced by guid
                    dentistId: selectInfo.id,    //to be replaced by fetching dentistry info
                    issuance: Math.floor((Math.random() * 100) + 1).toString(),
                    date: selectInfo.slot.startStr
                };
                onSlotSelect.addEvent(desiredEvent);
                publish('appointment/request', JSON.stringify(desiredEvent));
                onSlotSelect.refetchEvents();
            } else {
                console.log('Nothing selected.')
            }
        }
    }

    const fetchSlots = async (id: string) : Promise<any[]> => {
            let list : IFetchedSlot[] = [];
            await getAppointments(id)
            .then((val) => {
                list = val.map((value) => {
                    const startDate = new Date(value.date.toString());
                    const endDate = new Date(startDate.getTime() + 30*60000);
                    return {
                        title: 'Appointment',
                        start: startDate.toISOString(),
                        end: endDate.toISOString(),
                        display: 'background',
                        color: 'grey'
                    }
                });
                console.log(list);
            }).catch((e) => {
                console.log(e);
            })
            //console.log(list);
            return list;
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
                            <form onSubmit={(e) => {
                                        e.preventDefault()
                                        console.log(bookingConfirmed)
                                        setBookingConfirmed(true)
                                        createAppointment(appointmentInfo)
                                        setEventTitle('')
                                        setTimeout(() => {
                                            setModalOpen(false);
                                        }, 200);
                                    }}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Book Appointment
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {/*Please mention the times. 
                                (Need to add input boxes, one is disabled, that is 30mins + start).*/}
                                Name: <input type="text" name="Name" id="" required placeholder='Name' value={eventTitle} onChange={(e) => {
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
                                    <Button type='submit' variant='success' size='sm'>Confirm Appointment</Button>
                                </div>
                            </Modal.Footer>
                            </form>
                        </Modal>
                        {
                            dentistries.map((dentistry: any, index: number) => (
                                <Accordion id='accordion' TransitionProps={{ 
                                    unmountOnExit: true, 
                                }} onChange={() => setId(dentistry.id)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                    <p className='name'> Name: {dentistry.name}</p>
                                    <p className='address'> Address: {dentistry.address}</p>
                                    <p className='dentists'> Dentists: {dentistry.dentists}</p>
                                    <p className="id">ID: {dentistry.id}</p>
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
                                        initialEvents={[]}
                                        loading={(isLoading) => {
                                            if (isLoading) {
                                                console.log('Loading .........')
                                            } else {
                                                console.log('Done!');
                                            }
                                        }}
                                        initialView='timeGridDay'
                                        selectable={true}
                                        selectMirror={true}
                                        editable={true}
                                        dayMaxEvents={true}
                                        select={(info) => {
                                            setAppointmentInfo({...appointmentInfo, slot: info, id: dentistry.id})
                                            setModalOpen(true)
                                            info.view.calendar.refetchEvents();
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
                                        lazyFetching={false}
                                        events={async () => await fetchSlots(id)}
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