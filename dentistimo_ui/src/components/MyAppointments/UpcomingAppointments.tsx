import React, { useState,useEffect } from 'react';
import './MyAppointments.css'
import Table from 'react-bootstrap/Table';
import {deleteAppointment, editAppointment, getAppointments, getUserAppointments, rawUserId} from '../../Infrastructure/PMQTTController';
import {BsCalendar2Check,BsClock, BsFillGeoAltFill, BsFillTrashFill, BsPencilFill} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { dentistries } from '../../data/dentistries';

function UpcomingAppointments() {
  const [updateModal, setUpdateModal] = useState<any>({
    isOpen: false,
    dentistId: '',
    requestId: '',
    issuance: '',
    oldDate: '',
    date: '',
    time: ''
  });
  const [data, setData] = useState<any[]>([]);
  const [filterUpcoming, setFilterUpcoming] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<any>({
    isOpen: false,
    id: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    setTimeout(() => fetchUserApps(rawUserId()), 1000);
  });

  //gets all appointments
  const fetchApps = async (dentistId: string) => {
    await getAppointments(dentistId)
        .then(response => {
          setData(response);
        }).catch ((e) => {
          console.log(e);
        });
  }

  const fetchUserApps = async (userId: string) => {
    await getUserAppointments(userId)
        .then(response => {
          setData(filterUpcoming ? 
            response.sort((a, b) => {         //sort the appointments
              if (a.date < b.date) {
                return -1;  
              } else if (a.date > b.date) {
                return 1;
              } else {
                return 0;
              }
            }) 
            : response);
        }).catch((e) => {
          console.log(e);
        });
  }

  //gets current date and day
  var currentDate = new Date();

  //maps into the table
  const tableRows = data.map((value) => {
    var dateonly = value.date.substring(0,10);
    var timeonly = value.date.substring(11,16);

    return (
      <>
        <Modal show={updateModal.isOpen} onHide={() => setUpdateModal({...updateModal, isOpen: false})}>
            <form onSubmit={async (e) => {
                        e.preventDefault()
                        if (new Date(`${updateModal.date} ${updateModal.time}`) > new Date()) {
                          await editAppointment({
                            userId: rawUserId().toString(), 
                            dentistId: updateModal.dentistId, 
                            requestId: updateModal.requestId, 
                            issuance: updateModal.issuance, 
                            date: updateModal.oldDate, 
                            editDate: `${updateModal.date} ${updateModal.time}`
                          }).then((res) => {
                            console.log('Edit successful.');
                            setUpdateModal({...updateModal, isOpen: false, dentistId: '', requestId: '', issuance: '', oldDate: '', date: '', time: ''});
                            return true;
                          }).catch((e) => {
                            console.log(e);
                            setUpdateModal({...updateModal, isOpen: false, dentistId: '', requestId: '', issuance: '', oldDate: '', date: '', time: ''});
                          })
                        } else {
                          return false;
                        }
                    }}>
            <Modal.Header closeButton>
                <Modal.Title>
                    You would like to rebook your appointment for ...
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Current Appointment: &nbsp;
                <strong>{updateModal.oldDate.substring(0, updateModal.oldDate.length - 3)}</strong><hr/>
                New Date: <input type="date" id='new-date' required min={`${new Date().toISOString()}`} value={updateModal.date} onChange={(e) => {
                  setUpdateModal({...updateModal, date: e.target.value});
                }}/>
                <br/><br/>
                New Time: <input type="text" required pattern='^(2[0-3]|[01][0-9]):([03]?[0])$' id='new-time' value={updateModal.time} onChange={(e) => {
                  setUpdateModal({...updateModal, time: e.target.value});
                }}/>
            </Modal.Body>
            <Modal.Footer>
                <div id="button" style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Button type='submit' variant='success' size='sm'>Confirm</Button>
                </div>
            </Modal.Footer>
            </form>
        </Modal>
        <Modal show={deleteModal.isOpen} backdrop={true} onHide={() => setDeleteModal({...deleteModal, isOpen: false})}>
            <form onSubmit={async(e) => {
                        e.preventDefault()
                        await deleteAppointment({userId: '1274187', dentistId: deleteModal.id, date: `${deleteModal.date} ${deleteModal.time}`}).then(() => {
                           console.log('Deletion successful.')
                        }).catch(e => {
                          console.log(e)
                          setDeleteModal({...deleteModal, isOpen: false, id: '', date: '', time: ''});
                        });
                        setTimeout(() => {
                          setDeleteModal({...deleteModal, isOpen: false, id: '', date: '', time: ''});
                          fetchUserApps(rawUserId().toString());
                        }, 100);
                    }}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Are you sure?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You are about to delete your made appointment for: <br/><br/>
                <strong>Date:</strong> {deleteModal.date} &nbsp; <strong>Time:</strong> {deleteModal.time}
            </Modal.Body>
            <Modal.Footer>
                <div id="button" style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Button type='submit' variant='success' size='sm'>Confirm</Button>
                </div>
            </Modal.Footer>
            </form>
        </Modal>
            {
              filterUpcoming ? (new Date(value.date) > currentDate ? 
              (<tr key={value._id}>
                <td>{dentistries.find(d => d.id == value.dentistId)!.name}</td>
                <td>{dateonly}</td>
                <td>{timeonly}</td>
                <td><BsFillTrashFill type="button" onClick={() => {
                  setDeleteModal({...deleteModal, isOpen: true, id: value.dentistId, date: dateonly, time: timeonly});
                }}/></td> 
                <td><BsPencilFill type="button" onClick={() => {
                  setUpdateModal({...updateModal, isOpen: true, dentistId: value.dentistId, requestId: value.requestId, issuance: value.issuance, oldDate: value.date.toString()});
                  fetchUserApps(rawUserId().toString());
                }}/></td>      
              </tr>) : (<></>)) 
              : 
              (<tr key={value._id}>
                <td>{dentistries.find(d => d.id == value.dentistId)!.name}</td>
                <td>{dateonly}</td>
                <td>{timeonly}</td>
                <td><BsFillTrashFill type="button" onClick={async () => {
                  setDeleteModal({...deleteModal, isOpen: true, id: value.dentistId, date: dateonly, time: timeonly});
                  fetchUserApps(rawUserId().toString());
                }}/></td> 
                <td><BsPencilFill type="button" onClick={() => {
                  setUpdateModal({...updateModal, isOpen: true, dentistId: value.dentistId, requestId: value.requestId, issuance: value.issuance, oldDate: value.date.toString()});
                  fetchUserApps(rawUserId().toString());
                }}/></td>      
                </tr>)
            }
      </>
  )});

  return (
    <React.Fragment>
        <div className="contain">
          <div className='child'>
          <br></br>
            <h1>{filterUpcoming ? 'Your Upcoming appointments' : 'All Booked Appointments'}</h1>
            <div className='upcoming-table'>
              <br/>
              <Table hover className='table-up'>
                <thead>
                  <button type="submit" style={{
                      marginBottom: '20px',
                      marginLeft: '90px',
                      marginTop: '0px',
                      height: '50px',
                      width: '100%'
                    }} 
                    onClick={() => {
                      fetchUserApps(rawUserId().toString());
                      setFilterUpcoming(!filterUpcoming);  
                    }
                  }>{filterUpcoming ? 'Show all appointments' : 'Filter Upcoming Appointments'}</button>
                  <br></br>
                  <tr>
                    <th>Dentistry</th>
                    <th><BsCalendar2Check></BsCalendar2Check><span style={{padding: '0px 10px 0px 10px'}}>Date</span></th>
                    <th><BsClock></BsClock><span style={{padding: '0px 10px 0px 10px'}}>Time</span></th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
    </React.Fragment>
  );
}

export default UpcomingAppointments;
