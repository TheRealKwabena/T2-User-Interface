import React, { useState } from 'react';
import './UpcomingAppointments.css'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function ListOfAppointments() {
  
 

  const data = [
    {
      "Name": "Dentistimo Fernandez",
      "Date": "12/08/23",
      "Time": "12:00",
      "Dentistry": "Lindholm Klinik"
    }, {
      "Name": "Dentistimo Fernandez",
      "Date": "12/08/23",
      "Time": "11:00",
      "Dentistry": "Olofshöjd Klinik"
    },
    {
      "Name": "Dentistimo Fernandez",
      "Date": "12/08/23",
      "Time": "12:00",
      "Dentistry": "Lindholm Klinik"
    }
    
    
  
  ]
  const tableRows = data.map(
    (appointments) => {
      return (
        <tr>
          <td>{appointments.Date}</td>
          <td>{appointments.Time}</td>
          <td>{appointments.Dentistry}</td>
        </tr>

      )
    }
  )
  return (
    <div className='upcoming-table'>

      <Table hover>
        <thead>
          <tr>
            <th> <span className="glyphicon glyphicon-calendar"></span> </th>
            <th> <span className="glyphicon glyphicon-dashboard"></span></th>
            <th><span className="glyphicon glyphicon-map-marker"></span></th>
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
      <Container className='contain'>
        <div className="UpcomingAppointments">
          <div>
            <h1>Dentistimo</h1>
            <h3>Your upcoming appointmnets</h3>

            <br></br>
            <ListOfAppointments />

          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default UpcomingAppointments;