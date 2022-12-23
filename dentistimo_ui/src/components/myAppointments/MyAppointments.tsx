import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsCalendar2Check,BsClock, BsFillGeoAltFill,BsPersonFill,BsPencil,BsFillTrashFill} from "react-icons/bs";
import UpcomingAppointments from './UpcomingAppointments'
import { getAppointments, connectMQTT, publish, sub} from '../../Infrastructure/PMQTTController';


function MyAppointments() {
    const data = [
        {
            "userId": 12345,
            "requestId": 13,
            "dentistId": 1,
            "issuance": 1602406766314,
            "date": "2024-12-14 15:02:02"
        }
    ]    
var appointments=[];
   const [dat, setData]=useState([]);
   const [dentistId, setDentistId] = useState(null);
   const [date, setDate] = useState(null);
   const [userId, setUserId] = useState(null);

    useEffect(() => {
        try {
            connectMQTT();
        
            
        } catch (e) {
            console.log('Cannot be connected'); }  
    }, []);
   
    //get all appointments of a user
    const getMyAppointments=(Id:String)=>{
        try {
            sub('get/appointments/response', 1);
            publish('get/appointments/request', `{"dentistId": "${Id}"}`);
            setData(appointments);
            console.log(appointments)
        } catch (e) {
            console.log('Some error detected.');
            return [];
        }
    }
    //delete an appointment
    const deleteAppointment=({requestId,newUserId, newDentistId,newDate,issuance})=>{
        try{
            let newAppointment = {
                userId : newUserId,
                dentistId: newDentistId,
                date: newDate,
                requestId:requestId,
                issuance:issuance
                }
            publish('delete/appointment/request',JSON.stringify(newAppointment))
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
                                        <input type="datetime-local" value={date}
                                            onChange={(event) => setDate(event.target.value)} />
                                            
                                    ) : (value.date)}
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
                                                    newDentistId: dentistId, newDate: date })}
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
                                                    currentDentistId: value.dentistId, currentDate: value.date
                                                })}>
                                                <span><BsPencil></BsPencil></span>
                                            </button>
                                            <button className={"btn btn-default btn-sm"}
                                            onClick={() => deleteAppointment({ 
                                                requestId: value.requestId, newUserId: value.userId,
                                                newDentistId: value.dentistId, newDate: value.date,issuance:value.issuance})}>
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
