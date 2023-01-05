import Paho from 'paho-mqtt';
import { decrypt, encrypt } from '../utils/encryptionUtils';
import { User } from '../pages/Authentication/UserType';
// Create a client instance
const client = new Paho.Client('cb9fe4f292fe4099ae5eeb9f230c8346.s2.eu.hivemq.cloud', Number(8884), `${Math.ceil(Math.random()*10000000)}`);

var appointments : any[];
var deleteRes : any;
var editRes : any;

var login_response = '';
var signup_response = '';
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

export function rawUserId() : string {
    return decrypt(String(localStorage.getItem('ID'))).toString();
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
        case 'authentication/signUp/response':
            signup_response = message.payloadString;
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
                if (object.isSuccess === true) {
                    if (object.data.jwtToken === 'null') {
                        alert('could not log in');
                        window.location.reload();
                    } else {
                        const encryptId = encrypt(object.data._id); // encrypting id in order to mae it harder to steal credentials
                        window.localStorage.setItem('ID', encryptId);
                        window.localStorage.setItem('TOKEN', object.data.jwtToken);
                        window.location.replace("/");
                        client.unsubscribe('authentication/signIn/response')
                    }
                     
                } else if (object.isSuccess === false) {
                    const error_message = String(object.errors[0].detail); 
                    alert(error_message);
                } 

            }, 1000)

        } catch (error) {
            alert('something went wrong, please try again.');
        }
      
    })
}


export const signOut = async () => {
    try {
        return new Promise(() => {
                const user_id = String(localStorage.getItem('ID'));
                client.subscribe('authentication/signOut/response', { qos: 1 });
                const decryptedId = decrypt(user_id);
                const userId = { id: decryptedId }
                const encrypted = encrypt(userId);
                publish('authentication/signOut/request', encrypted.toString());
                try {
                    setTimeout(() => {
                        const object = JSON.parse(signout_response);
    
                        if (object.isSuccess === true) {
                            localStorage.clear();
                            window.location.reload();
                        } else if (object.isSuccess === false) {
                            const error_message = String(object.errors[0].detail);
                            alert(error_message);
                        }
                    }, 300)
                    
                } catch (error) {
                    console.log(error);
                }
            })
    } catch (error) {
        console.log(error);
    }
}

export const getError = async () => {
    try {
        return await new Promise(() => {
            client.subscribe('error/response', {qos:1});
            const error_parsed = JSON.parse(error_response);
            console.log(error_response);
        })

    } catch (error) {
        alert(error);
    }
}

export const createUser = async (user: User) => {
    try {
        return await new Promise(() => {
            client.subscribe('authentication/signUp/response', { qos: 1 });
            const encrypted_user = encrypt(user);
            publish('authentication/signUp/request', encrypted_user.toString());
            
            setTimeout(() => {
                const object = JSON.parse(signup_response);
                const onSuccess = object.isSuccess;
                if (onSuccess === false) {
                    const error_message = String(object.errors[0].detail);
                    alert(error_message);
                } else if(onSuccess === true) {
                    alert('User created sucessfully');
                    window.location.assign('/');
                }
            }, 500)
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