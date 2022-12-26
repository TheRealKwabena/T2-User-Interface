import React, { useState,useEffect } from 'react';
import './Appointments.css'
import Table from 'react-bootstrap/Table';
import * as _ from "lodash"
import {getAppointments} from '../../Infrastructure/PMQTTController';
import {BsCalendar2Check,BsClock, BsFillGeoAltFill} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';

function ListOfAppointments(){
 
 

  const id='1';
  const [data, setData]=useState([]);
  

    useEffect(() => {
   
      fetchApps(id)
  }, []);

//gets all appointments
  const fetchApps = async (id: string) => {
    try {
      await getAppointments(id)
        .then(response => setData(response))
      console.log('Upcoming appointments fetched');
    } catch (e) {
      console.log(e);
    }
  }
//sort the appointments
   data.sort((a, b) => {
      if (a.date < b.date) {
        return -1;  }
    });
  
//gets current date and day
var currentdate = new Date();
var todayDate = currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear();


//maps into the table
  const tableRows = data.map((value) => {
    if ((value.date.substring(0, 10)) > (todayDate)) {
      var dateonly = value.date.substring(0, 10);
      var timeonly = value.date.substring(11, 17);
      return (
        <tr key={value._id}>
          <td>{dateonly}</td>
          <td>{timeonly}</td>
          <td>{value.dentistId}</td>
        </tr>
      )
     } else {
       console.log('No uppcoming appointments exist')

    }
  })

  return (
    <div className='upcoming-table'>

      <Table hover className='table-up'>
        <thead>
          <tr>
            <th><BsCalendar2Check></BsCalendar2Check></th>
            <th><BsClock></BsClock></th>
            <th><span>Dentist ID</span></th>
       
            
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
          <div className='child'>
          <br></br>
            <h4>Upcoming appointments</h4>
            <ListOfAppointments/>

          </div>
        </div>
    </React.Fragment>
  );
}

export default UpcomingAppointments;