import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpcomingAppointments from './UpcomingAppointments'
import {MQTTController} from '../../Infrastructure/MQTTController'


function MyAppointments(){

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

    const fetchInventory = () => {

    }

    useEffect(() => {
        fetchInventory();
    }, []);


    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });
    const [Dentistry, setDentistry] = useState(null);
    const [Date, setDate] = useState(null);
    const [Time, setTime] = useState(null);



    const onEdit = ({ id, currentDentistry, currentDate }) => {
        setInEditMode({
            status: true,
            rowKey: id
        })

        setDentistry(currentDentistry);
        setDate(currentDate);
    }

    const updateAppointment = ({ id, newDentistry, newDate }) => {
    }

   
     
    const onSave = ({ id, newDentistry, newDate }) => {
        updateAppointment({ id, newDentistry, newDate });
    }

    const onCancel = () => {
        
        setInEditMode({
            status: false,
            rowKey: null
        })
       
        setTime(null);
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
                                            <input type="date" value={Date}
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
                                                        id: appointments.id, newTime: Time,
                                                        newDentistry: Dentistry, newDate: Date
                                                    })}
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    className={"btn-secondary"}
                                                    style={{ marginLeft: 8 }}
                                                    onClick={() => onCancel()}
                                                >
                                                    Cancel
                                                </button>
                                            </React.Fragment>
                                        ) : (
                                            <div>


                                                <button
                                                    className={"btn btn-default btn-sm"}
                                                    onClick={() => onEdit({
                                                        id: appointments.id, currentTime: appointments.Time,
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