import React, { useState,useEffect } from 'react';
import './MyAppointments.css'
import Table from 'react-bootstrap/Table';
import {deleteAppointment, getAppointments} from '../../Infrastructure/PMQTTController';
import {BsCalendar2Check,BsClock, BsFillGeoAltFill, BsFillTrashFill, BsPencilFill} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function UpcomingAppointments() {
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [changeConfirmed, setChangeConfirmed] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');
  const [filterUpcoming, setFilterUpcoming] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<any>({
    isOpen: false,
    id: '',
    date: '',
    time: ''
  });
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false);
  const id = '2';   //needs to be changed to a userId that is checked by AUTH controller
  
  useEffect(() => {
    setTimeout(() => fetchApps(id), 200);
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

  const editAppointment = async (slot: {userId: string, dentistId: string, issuance: string, date: string}, newDate: string) => {
    if (changeConfirmed) {
      //publish to mqtt
      //make an mqtt method in PMQTTController.js
    }
    setChangeConfirmed(false);
  }

  //gets current date and day
  var currentDate = new Date();

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

  //maps into the table
  const tableRows = data.map((value) => {
    var dateonly = value.date.substring(0,10);
    var timeonly = value.date.substring(11,16);

    return (
      <>
        <Modal show={updateModalOpen} onHide={() => setUpdateModalOpen(false)}>
            <form onSubmit={(e) => {
                        e.preventDefault()
                        console.log(changeConfirmed)
                        setChangeConfirmed(true)
                        //editAppointment(appointmentInfo)
                        setTimeout(() => {
                            setUpdateModalOpen(false);
                        }, 200);
                    }}>
            <Modal.Header closeButton>
                <Modal.Title>
                    You would like to rebook your appointment for ...
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                New Date: <input type="date" id='new-date' required value={newDate} onChange={(e) => {
                  setNewDate(e.target.value);
                }}/>
                <br/><br/>
                New Time: <input type="text" required pattern='^(2[0-3]|[01][0-9]):([03]?[0])$' id='new-time' value={newTime} onChange={(e) => {
                  setNewTime(e.target.value);
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
                          setTimeout(() => {
                            setDeleteModal({...deleteModal, isOpen: false, id: '', date: '', time: ''});
                            setDeleteConfirmed(false);
                            fetchApps(id);
                          }, 100);
                        }).catch(e => console.log(e));
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
                <td>{dateonly}</td>
                <td>{timeonly}</td>
                <td><BsFillTrashFill type="button" onClick={() => {
                  setDeleteModal({...deleteModal, isOpen: true, id: value.dentistId, date: dateonly, time: timeonly});
                }}/></td> 
                <td><BsPencilFill type="button" onClick={() => {
                  setUpdateModalOpen(true);
                  fetchApps(id);
                }}/></td>      
              </tr>) : (<></>)) 
              : 
              (<tr key={value._id}>
                <td>{dateonly}</td>
                <td>{timeonly}</td>
                <td><BsFillTrashFill type="button" onClick={async() => {
                  setDeleteModal({...deleteModal, isOpen: true, id: value.dentistId, date: dateonly, time: timeonly});
                  fetchApps(id);
                }}/></td> 
                <td><BsPencilFill type="button" onClick={() => {
                  setUpdateModalOpen(true);
                  fetchApps(id);
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
            <h1>{filterUpcoming ? 'Upcoming appointments' : 'All Appointments'}</h1>
            <div className='upcoming-table'>
              <br/>
              <Table hover className='table-up'>
                <thead>
                  <button type="submit" onClick={() => {
                      fetchApps(id);
                      setFilterUpcoming(!filterUpcoming);  
                    }
                  }>{filterUpcoming ? 'Show all appointments' : 'Filter Upcoming Appointments'}</button>
                  <br></br>
                  <tr>
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
