import React, { useState,useEffect } from 'react';
import './MyAppointments.css'
import Table from 'react-bootstrap/Table';
import {getAppointments} from '../../Infrastructure/PMQTTController';
import {BsCalendar2Check,BsClock, BsFillGeoAltFill} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';

function ListOfAppointments() {
  const id = '2';   //needs to be changed to a userId that is checked by AUTH controller
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    fetchApps(id);
  }, []);

  //gets all appointments
  const fetchApps = async (dentistId: string) => {
    await getAppointments(dentistId)
        .then(response => {
          setData(response);
          console.log('appointments fetched');
        }).catch ((e) => {
          console.log(e);
        });
  }

  //sort the appointments
  data.sort((a, b) => {
      if (a.date < b.date) {
        return -1;  
      } else if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
  });
  
  //gets current date and day
  var currentDate = new Date();

  //maps into the table
  const tableRows = data.map((value) => {
    var dateonly = value.date.substring(0,10);
    var timeonly = value.date.substring(11,16);

    return (
      new Date(value.date) > currentDate ? 
        (<tr key={value._id}>
          <td>{dateonly}</td>
          <td>{timeonly}</td>
          <td>{value.dentistId}</td>      
        </tr>) : (<></>)
    );
  })

  return (
    <div className='upcoming-table'>
      <br/>
      <Table hover className='table-up'>
        <thead>
          <button type="submit" onClick={() => fetchApps(id)}>Refresh</button>
          <br></br>
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
