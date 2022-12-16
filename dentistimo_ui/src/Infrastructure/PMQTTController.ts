import Paho from 'paho-mqtt';

// Create a client instance
const client = new Paho.Client('80a9b426b200440c81e9c17c2ba85bc2.s2.eu.hivemq.cloud', Number(8884), "clientId"); 
// called when the client connects
export function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log(`Connected successfully.`);
    client.subscribe("appointment/request");
    client.subscribe("appointment/response");
    client.subscribe("edit/request");
    client.subscribe("edit/response");
    client.subscribe("inventory/request");
    client.subscribe("inventory/response");
    client.subscribe("delete/appointment/request");
    client.subscribe("delete/appointment/response");
}

export function subscribe(topic: string) {
    client.subscribe(topic);
}

export function publish(topic: any, message: any) {
    const payload = new Paho.Message(message);
    payload.destinationName = topic;
    client.send(payload);
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
        console.log ("appointment/request " + message.payloadString)
    } if (message.destinationName === 'inventory/response') {
        console.log(message.payloadString);
    } if (message.destinationName === 'inventory/request') {
        console.log("inventory/request " + message.payloadString);
    } if (message.destinationName === 'edit/request') {
        console.log ("edit/request " + message.payloadString);
    } if (message.destinationName === 'edit/response') {
        console.log ("edit/response " + message.payloadString);
    } if (message.destinationName === 'delete/appointment/request') {
        console.log ("delete/appointment/request " + message.payloadString);
    } if (message.destinationName === 'delete/appointment/response') {
        console.log ("delete/appointment/response " + message.payloadString);
    }
}

// called when creating an appointment
export function createAppointment (id: String, dentistry: String, date: String) {
    let newAppointment = <JSON><unknown> {
        'userId': id,
        'requestId': dentistry,
        'date': date
    }
    publish("appointment/request", JSON.stringify(newAppointment));
    // must register success or failure
}

// called when deleting an appointment
export function deleteAppointment (id: any, newDentistry: any, newDate: any){
    let newAppointment = <JSON><unknown> {
        'userId': id,
        'requestId': newDentistry,
        'date': newDate
    }
    publish("delete/appointment/request", JSON.stringify(newAppointment));
}

// called when updating an appointment
export function updateAppointment (id: any, newDentistry: any, newDate: any) {
    let newAppointment = <JSON><unknown> {
        'userId': id,
        'requestId': newDentistry,
        'date': newDate
    }
    publish("edit/request", JSON.stringify(newAppointment));
}

// called when accesing appointments page
export function fetchInventory(dentistId: any) {
    publish("inventory/request", dentistId);
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
        userName: 'gusreinaos',
        password: 'Mosquitto1204!' 
    });
}