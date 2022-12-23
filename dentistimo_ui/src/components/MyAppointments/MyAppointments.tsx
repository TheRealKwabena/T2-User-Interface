import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsCalendar2Check,BsClock, BsFillGeoAltFill,BsPersonFill,BsPencil,BsFillTrashFill} from "react-icons/bs";
import UpcomingAppointments from './UpcomingAppointments'
import {connectMQTT, publish, sub} from '../../Infrastructure/PMQTTController';


function MyAppointments(){
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

   const [dat, setData]=useState([]);
   const [dentistId, setDentistId] = useState(null);
   const [Date, setDate] = useState(null);
   const [userId, setUserId] = useState(null);

    useEffect(() => {
        try {
            connectMQTT();
            getMyAppointments('12')
        } catch (e) {
            console.log(e); }  
    }, []);

    //get all appointments of a user
    const getMyAppointments=(userId:String)=>{
        try {
            sub('get/appointments/response', 1);
            publish('get/appointments/request', `{"dentistId": "${userId}"}`);
            setData(appointments);
            console.log(appointments)
        } catch (e) {
            console.log('Some error detected.');
            return [];
        }
    }
    //delete an appointment
    const deleteAppointment=(requestId)=>{
        try{
            publish('delete/appointment/request',requestId)
            console.log('Delete successful'+(requestId)) 
        }catch (e) {
            console.log('delete unsuccessful');    
    }
    }
    //update an appointment
  const updateAppointment=({requestId, newDate, newDentistId, newUserId})=>{
    try{
    let newAppointment = {
         'userId': newUserId,
         'dentistId': newDentistId,
         'date': newDate,
         'requestId':requestId,
         }
        publish('edit/request',JSON.stringify(newAppointment)) 
        console.log('Edit successful'+(newAppointment));
        onCancel();
    }catch (e){
        console.log('Edit unsuccessful')
  }
  }

    

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });
//on Edit Mode
    const onEdit = ({ requestId, currentDentistId, currentDate, currentUserId }) => {
        setInEditMode({
            status: true,
            rowKey: requestId
        })
        setDentistId(currentDentistId);
        setDate(currentDate);
        setUserId(currentUserId);
       
    }
     
    const onSave = ({ requestId, newDentistId, newDate, newUserId }) => {
        updateAppointment({requestId,newDentistId,newDate,newUserId})
      
     
    }

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null
        })
        setUserId(null);
        setDentistId(null);
        setDate(null)
    }


    return (
        <div className="container">
            <div>
                <UpcomingAppointments></UpcomingAppointments>
            </div>
            <br></br>
            <h1 className="d-flex justify-content-center">All of your appointments</h1>
            <Table>
                <thead>
                    <tr>
                        <th><BsFillGeoAltFill></BsFillGeoAltFill></th>
                        <th><BsCalendar2Check></BsCalendar2Check> <BsClock></BsClock></th>
                        <th><BsPersonFill></BsPersonFill></th>
                       
                    </tr>
                </thead>
                <tbody>{
                     data.map((value) => (
                        <tr key={value.requestId}>
                            <td>{inEditMode.status && inEditMode.rowKey === value.requestId ? (
                                <input value={dentistId}
                                    onChange={(event) => setDentistId(event.target.value)}
                                />
                            ) : (value.dentistId  )}
                            </td>
                            <td> { inEditMode.status && inEditMode.rowKey === value.requestId ? (
                                        <input type="datetime-local" value={Date}
                                            onChange={(event) => setDate(event.target.value)} />
                                            
                                    ) : (value.Date)}
                            </td>
                            <td>  {inEditMode.status && inEditMode.rowKey === value.requestId ? (
                                        <input  value={userId}
                                            onChange={(event) => setUserId(event.target.value)} />
                                    ) : ( value.userId)}
                            </td>
                            <td>{  inEditMode.status && inEditMode.rowKey === value.requestId ? (
                                        <React.Fragment>
                                            <button className={"btn-success"}
                                             onClick={() => onSave({
                                                    requestId: value.requestId, newUserId: userId,
                                                    newDentistId: dentistId, newDate: Date })}
                                            >Save</button>
                                            <button className={"btn-secondary"} style={{ marginLeft: 8 }}
                                                onClick={() => onCancel()}
                                                 >Cancel
                                             </button>
                                        </React.Fragment>
                                    ) : (
                                        <div>
                                            <button className={"btn btn-default btn-sm"}
                                                onClick={() => onEdit({
                                                    requestId: value.requestId, currentUserId: value.userId,
                                                    currentDentistId: value.dentistId, currentDate: value.Date
                                                })}>
                                                <span><BsPencil></BsPencil></span>
                                            </button>
                                            <button className={"btn btn-default btn-sm"}
                                            onClick={() => deleteAppointment({requestId:value.requestId})}>
                                                <span><BsFillTrashFill></BsFillTrashFill></span>
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