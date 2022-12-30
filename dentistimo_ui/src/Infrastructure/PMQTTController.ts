import Paho from 'paho-mqtt';
import { decrypt, encrypt } from '../utils/encryptionUtils';
// Create a client instance
const client = new Paho.Client('cb9fe4f292fe4099ae5eeb9f230c8346.s2.eu.hivemq.cloud', Number(8884), `${Math.ceil(Math.random()*10000000)}`);

var appointments : any[];
var deleteRes : any;
var editRes : any;

var login_response = '';
var signout_response = '';
var error_response = '';

interface ApptToBeDeleted {
    userId: string;
    dentistId: string;
    date: string;   
}

interface ModifiedAppt {
    userId: string,
    dentistId: string,
    requestId: string,
    issuance: string,
    date: string,
    editDate: string
}

// called when the client connects
export function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log(`Connected successfully.`);
    client.subscribe("appointment/request");
    client.subscribe("appointment/response");
}

export function sub(topic: string, qos: any) {
    client.subscribe(topic, {qos: qos});
}

export function publish(topic: any, message: any) {
    const payload = new Paho.Message(message);
    payload.destinationName = topic;
    client.send(topic, message, 1);
}

export function getAppointments(id: string) : Promise<any[]> {
    return new Promise((resolve, reject) => {
        client.subscribe("get/appointments/response", {qos: 1});
        publish('get/appointments/request', `{"dentistId": "${id}"}`);
        setTimeout(() => {
            console.log(appointments);
            resolve(appointments);
        }, 400);
    })
}

export function deleteAppointment(slot: ApptToBeDeleted) : Promise<any> {
    return new Promise((resolve, reject) => {
        client.subscribe('delete/appointment/response');
        publish('delete/appointment/request', JSON.stringify(slot));
        setTimeout(() => {
            if (deleteRes.response === 'yes') {
                resolve(deleteRes);
            } else {
                reject('The deletion was unsuccessful.');
            }
        }, 300);
    })
}

export function editAppointment(slot: ModifiedAppt) : Promise<any> {
    return new Promise((resolve, reject) => {
        client.subscribe('edit/response');
        publish('edit/request', JSON.stringify(slot));
        setTimeout(() => {
            if (editRes.date !== 'none') {
                resolve(editRes.status);
            } else {
                reject('The edit was unsuccessful.');
            }
        }, 300);
    })
}

// called when the client loses its connection
export function onConnectionLost(responseObject: any) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection Lost: " + responseObject.errorMessage);
    }
}

// called when a message arrives
export function onMessageArrived(message: any) {

    const message_topic = message.destinationName;

    switch (message_topic) {
        case 'appointment/response':
            console.log("appointment/response " + message.payloadString);
            break;
        case 'appointment/request':
            console.log("appointment/request " + message.payloadString);
            break;
        case 'get/appointments/response':
            appointments = JSON.parse(message.payloadString);
            break;
        case 'delete/appointment/response':
            deleteRes = JSON.parse(message.payloadString);
            break;
        case 'edit/response':
            editRes = JSON.parse(message.payloadString);
            break;
        case 'authentication/signIn/response':
            login_response = message.payloadString;
            break;
        case 'authentication/signOut/response':
            signout_response = message.payloadString;
            break;
        case 'error/response':
            error_response = message.payloadString;
            break;
        default:
            return;
    }   
}

// method for getting jwt and id of a user
export const getJWT = async () => {
    return new Promise(() => {
        client.subscribe('authentication/signIn/response', { qos: 1 });
        try {
            setTimeout(() => {
                const object = JSON.parse(login_response)
                if (object.jwtToken === 'null') {
                    alert('could not log in');
                    window.location.reload();
                } else {
                    const encryptId = encrypt(object._id); // encrypting id in order to mae it harder to steal credentials
                    window.localStorage.setItem('TOKEN', object.jwtToken);
                    window.localStorage.setItem('ID', encryptId);
                    window.location.replace("/");
                    client.unsubscribe('authentication/signIn/response')
                } 

            }, 1000)

        } catch (error) {
            alert('something went wrong, please try again.');
        }
      
    })
}


export const signOut = async () => {
    try {
            return await new Promise(() => {
                const id = String(localStorage.getItem('ID'));
                const decryptedId = decrypt(id);
                const userId = { id: decryptedId }
                const encrypted = encrypt(userId);
                client.subscribe('authentication/signOut/response', { qos: 1 });
                publish('authentication/signOut/request', encrypted.toString());
                try {
                    setTimeout(() => {
                        const response = JSON.parse(signout_response);
    
                        if (response.jwtToken === 'null') {//if token is received as null then clear storage and logout
                            localStorage.clear();
                            window.location.reload();
                        }
                    }, 300)
                    
                } catch (error) {
                    alert(error);
                }
            })
    } catch (error) {
        alert(error);
    }
}

export const getError = async () => {
    try {
        return await new Promise(() => {
            client.subscribe('error/response');
            const error_parsed = JSON.parse(error_response);
            console.log(error_parsed);
        })

    } catch (error) {
        alert(error);
    }
}


/**
 * Reference from PAHO DOCS -->
 * client.subscribe("World");
    message = new Paho.MQTT.Message("Hello");
    message.destinationName = "World";
    client.send(message);
*/

// connect the client
export function connectMQTT() {
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({
        useSSL: true,
        onSuccess: onConnect,
        userName: 'T2Project',
        password: 'Mamamia1234.' 
    });
}