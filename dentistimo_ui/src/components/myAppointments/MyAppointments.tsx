import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpcomingAppointments from './UpcomingAppointments'
import * as pmqtt from '../../Infrastructure/PMQTTController'

export type AppointmentType = {
    userId: number,
    dentistId: number,
    time: Date,
    date: Date,
}

function MyAppointments(){

    pmqtt.connectMQTT(); 

    const data = [
        {
          "Name": "Dentistimo Fernandez",
          "id":"1",
          "Date": "12/08/23",
          "Time": "12:00",
          "Dentistry": "Lindholm Klinik"
        }, {
          "Name": "Dentistimo Fernandez",
          "id":"2",
          "Date": "12/08/23",
          "Time": "11:00",
          "Dentistry": "Olofshöjd Klinik"
        },
        {
          "Name": "Dentistimo Fernandez",
          "id":"3",
          "Date": "12/08/23",
          "Time": "12:00",
          "Dentistry": "Lindholm Klinik"
        }]

    useEffect(() => {
        pmqtt.fetchInventory('1'); 
    }, []);

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: 0
    });
    const [Dentistry, setDentistry] = useState(0);
    const [date, setDate] = useState(new Date());
    const [Time, setTime] = useState(new Date());

    
    const onEdit = (appointment: AppointmentType) => {
        setInEditMode({
            status: true,
            rowKey: appointment.userId
        })

        setDentistry(appointment.dentistId);
        setDate(appointment.date);
        setTime(appointment.time);
        //Must combine date and time before sending to backend as Date format
    }
     
    const onSave = (appointment: AppointmentType) => {
        pmqtt.updateAppointment(appointment.userId, appointment.dentistId, appointment.date);
        // Add popup of success or failure
    }

    const onCancel = (appointment: AppointmentType) => {

        pmqtt.deleteAppointment(appointment.userId, appointment.dentistId, appointment.date);
        // Add popup of success or failure
        
        setInEditMode({
            status: false,
            rowKey: 0
        })
       
        setTime(new Date());
    }

    return (
        <div className="container">
            <div>
                <UpcomingAppointments></UpcomingAppointments>
            </div>
            <h1></h1>
            <h1 className="d-flex justify-content-center">All of your appointments</h1>
            <Table>
                <thead>
                    <tr>
                        <th> <span className="glyphicon glyphicon-calendar"></span> </th>
                        <th><span className="glyphicon glyphicon-map-marker"></span></th>
                        <th> <span className="glyphicon glyphicon-dashboard"></span></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((appointments) => (
                            <tr key={appointments.id}>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === appointments.id ? (
                                            <input type="location" value={Dentistry}
                                                onChange={(event) => setDentistry(event.target.value)}
                                            />
                                        ) : (
                                            appointments.Dentistry
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === appointments.id ? (
                                            <input type="date" value={date as String}
                                                onChange={(event) => setDate(event.target.value)}
                                            />
                                        ) : (
                                            appointments.Date
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === appointments.id ? (
                                            <input type="time" value={Time}
                                                onChange={(event) => setTime(event.target.value)}
                                            />
                                        ) : (
                                            appointments.Time
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        inEditMode.status && inEditMode.rowKey === appointments.id ? (
                                            <React.Fragment>
                                                <button
                                                    className={"btn-success"}
                                                    onClick={() => onSave({
                                                        id: appointments.id, newDentistry: Dentistry, newTime: Time, newDate: Date
                                                    })}
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    className={"btn-secondary"}
                                                    style={{ marginLeft: 8 }}
                                                    onClick={() => onCancel({id: appointments.id, newDentistry: Dentistry, newTime: Time, newDate: Date})}
                                                >
                                                    Cancel
                                                </button>
                                            </React.Fragment>
                                        ) : (
                                            <div>


                                                <button
                                                    className={"btn btn-default btn-sm"}
                                                    onClick={() => onEdit({
                                                        id: appointments.userId, currentTime: appointments.Time,
                                                        currentDentistry: appointments.Dentistry, currentDate: appointments.Date
                                                    })}>
                                                    <span className="glyphicon glyphicon-pencil"></span>

                                                </button>
                                                <button className={"btn btn-default btn-sm"}>
                                                    <span className="glyphicon glyphicon-trash"></span>

                                                </button>
                                            </div>


                                        )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default MyAppointments;