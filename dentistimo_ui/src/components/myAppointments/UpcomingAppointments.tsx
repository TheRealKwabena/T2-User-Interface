import React, { useState,useEffect } from 'react';
import './Appointments.css'
import Table from 'react-bootstrap/Table';
import {connectMQTT, getAppointments, publish, sub} from '../../Infrastructure/PMQTTController';
import {BsCalendar2Check,BsClock, BsFillGeoAltFill} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';

function ListOfAppointments(){
  
    useEffect(() => {
      try {
      

      
      } catch (e) {
          console.log('connot connect');
      }
    }, []);

    var tableRows=[];
    const fetchApps=async(id:string)=>{
    await getAppointments(id)
    .then((val)=>{
      tableRows = val.map(
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
     ) });
          console.log(tableRows);
      }).catch((e) => {
          console.log('not able to fetch apps');
      })
      //console.log(list);
      return tableRows;
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