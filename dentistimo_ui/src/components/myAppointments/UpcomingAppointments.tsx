import React, { useState,useEffect } from 'react';
import './Appointments.css'
import Table from 'react-bootstrap/Table';
import {appointments, connectMQTT, publish, sub} from '../../Infrastructure/PMQTTController';
import {BsCalendar2Check,BsClock, BsFillGeoAltFill,BsPersonFill} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';

function ListOfAppointments(){
   const data = [
        {
          "requstId": "2",
          "Date": "12/08/23 12:00",
          "userId": "20",
          "dentistId": "Lindholm Klinik"
        }, {
          "requestId": "4",
          "Date": "12/08/23 12:00",
          "userId": "11",
          "dentistId": "Olofshöjd Klinik"
        },
        {
          "requestId": "Dentistimo Fernandez",
          "Date": "12/08/23 12:00",
          "userId": "99",
          "dentistId": "Lindholm Klinik"
        }
    ]    
useEffect(() => {
  try {
      connectMQTT();
      console.log('Upcoming apps connected')
      getUpcomingApps('11');
  
  } catch (e) {
      console.log(e);
  }
}, []);
var tableRows:[];
const getUpcomingApps=(userId:string)=>{
 try{
    sub('get/appointments/response',1);
    publish('get/appointments/request',`{"userId": "${userId}"}`);
    console.log('upcoming appointmnets recieved')
    //put the data into table
    
    const tableRows = data.map(
      (value) => {
        var now = new Date(value.Date)
        var date = now.toDateString();
        var time = now.toTimeString();
        console.log(date + ' ' + time)
        return (
          <tr>
            <td>{date}</td>
            <td>{time}</td>
            <td>{value.dentistId}</td>
          </tr>
          )})
          return tableRows
    
}catch (e) {
  console.log('Some error detected.');
  return [];}
}

  return (
    <div className='upcoming-table'>

      <Table hover>
        <thead>
          <tr>
            <th><BsCalendar2Check></BsCalendar2Check></th>
            <th><BsClock></BsClock></th>
            <th><BsFillGeoAltFill></BsFillGeoAltFill></th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </Table>

    </div>
  )
}
function UpcomingAppointments() {
  return (
    <React.Fragment>
        <div className="contain">
          <div>
          <br></br>
            <h3>Upcoming Appointments</h3>
            <ListOfAppointments />

          </div>
        </div>
    </React.Fragment>
  );
}

export default UpcomingAppointments;