import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsCalendar2Check,BsClock, BsFillGeoAltFill,BsPersonFill,BsPencil,BsFillTrashFill} from "react-icons/bs";
import UpcomingAppointments from './UpcomingAppointments'
import { getAppointments, connectMQTT,deleteResponse, publish, sub} from '../../Infrastructure/PMQTTController';

function MyAppointments() {
  

   
   const [data, setData]=useState([]);  
   const [dentistId, setDentistId] = useState(null);
   const [date, setDate] = useState(null);
   const [userId, setUserId] = useState(null);

    useEffect(() => {
    fetchMyAppointments('1')
         
    }, []);
   
    //get all appointments of a user
    const fetchMyAppointments = async (id: string) => {
        try {
          await getAppointments(id)
            .then(response => setData(response))
          console.log('My appointments fetched');
        } catch (e) {
          console.log(e);
        }
      }
    //delete an appointment
    const deleteAppointment=async({Id,newUserId, newDentistId,newRequestId,issuance, newDate})=>{
       
        try{
            let newAppointment = {
                '_id':Id,
                'userId' : newUserId,
                'dentistId': newDentistId,
                'requestId':newRequestId,
                'issuance':issuance,
                'date': newDate
                }
            publish('delete/appointment/request',JSON.stringify(newAppointment))
            sub('delete/appointments/response',1);
            if (deleteResponse=='no'){
                console.log('The appointments was not deleted')

            }
            console.log('Delete successful: '+(newAppointment.date)) 
        }catch (e) {
            console.log('delete was unsuccessful');    
    
    }}

    //update an appointment
  const updateAppointment=({Id,newUserId, newDentistId,requestId, issuance, newDate})=>{
    try{
    let newAppointment = {
        '_id':Id,
         'userId': newUserId,
         'dentistId': newDentistId,
         'requestId':requestId,
         'issuance':issuance,
         'date': newDate,
         
        
         }
        publish('edit/request',JSON.stringify(newAppointment)) 
        console.log('Edit successful: '+(newAppointment));
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
    const onEdit = ({Id,currentUserId, currentDentistId, currentDate}) => {
        setInEditMode({
            status: true,
            rowKey:Id
        })
        setDentistId(currentDentistId);
        setDate(currentDate);
        setUserId(currentUserId);
       
    }
     
    const onSave = ({Id, newDentistId, newDate, newUserId,issuance,requestId }) => {
        updateAppointment({Id,newDentistId,newDate,newUserId,requestId,issuance})
      
     
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
        <div>
            <div>
                <UpcomingAppointments></UpcomingAppointments>
            </div>
            <h1 className="d-flex justify-content-center">All of your appointments</h1>
            <Table>
                <thead>
                    <tr>
                        <th><BsFillGeoAltFill></BsFillGeoAltFill></th>
                        <th><BsCalendar2Check></BsCalendar2Check>  <BsClock></BsClock></th>
                        <th><BsPersonFill></BsPersonFill></th>
                       
                    </tr>
                </thead>
                <tbody>{
                     data.map((value) => (
                        <tr key={value._id}>
                            <td>{inEditMode.status && inEditMode.rowKey === value._id ? (
                                <input type="text" value={dentistId}
                                    onChange={(event) => setDentistId(event.target.value)}
                                />
                            ) : (value.dentistId  )}
                            </td>
                            <td> { inEditMode.status && inEditMode.rowKey === value._id ? (
                                        <input type="text" value={date}
                                            onChange={(event) => setDate(event.target.value)} />
                                            
                                    ) : (value.date)}
                            </td>
                         
                            <td>  {inEditMode.status && inEditMode.rowKey === value._id ? (
                                        <input  type="text" value={userId}
                                            onChange={(event) => setUserId(event.target.value)} />
                                    ) : ( value.userId)}
                            </td>
                            <td>{  inEditMode.status && inEditMode.rowKey === value._id? (
                                        <React.Fragment>
                                            <button className={"btn-success"}
                                             onClick={() => onSave({
                                                    Id: value._id, newUserId: userId,
                                                    newDentistId: dentistId, newDate: date,
                                                    requestId:value.requestId,issuance:value.issuance
                                                 })}
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
                                                    Id: value._id, currentUserId: value.userId,
                                                    currentDentistId: value.dentistId, currentDate: value.date
                                                })}>
                                                <span><BsPencil></BsPencil></span>
                                            </button>
                                            <button className={"btn btn-default btn-sm"}
                                            onClick={() => deleteAppointment({Id:value._id,
                                                newUserId: value.userId,
                                                newDentistId: value.dentistId,newRequestId:value.requestId,
                                                issuance:value.issuance, newDate: value.date
                                                })}>
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
