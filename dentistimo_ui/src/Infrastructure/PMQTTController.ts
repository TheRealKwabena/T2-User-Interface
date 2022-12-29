import Paho from 'paho-mqtt';

// Create a client instance
const client = new Paho.Client('cb9fe4f292fe4099ae5eeb9f230c8346.s2.eu.hivemq.cloud', Number(8884), `${Math.ceil(Math.random()*10000000)}`);

var appointments : any[];
var deleteRes : any;
var editRes : any;

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
    client.send(payload);
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
    if (message.destinationName === 'appointment/response') {
        console.log("appointment/response " + message.payloadString);
    } if (message.destinationName === 'appointment/request') {
        console.log("appointment/request " + message.payloadString)
    } if (message.destinationName === 'get/appointments/response') {
        appointments = JSON.parse(message.payloadString);
    } if (message.destinationName === 'delete/appointment/response') {
        deleteRes = JSON.parse(message.payloadString);
    } if (message.destinationName === 'edit/response') {
        editRes = JSON.parse(message.payloadString);
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