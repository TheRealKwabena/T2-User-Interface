import Paho from 'paho-mqtt';

// Create a client instance
const client = new Paho.Client('e960f016875b4c75857353c7f267d899.s2.eu.hivemq.cloud', Number(8884), "clientId");

export var appointments : any[];
export var upcommingApp:any[];

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
        console.log(message.payloadString);
        appointments = JSON.parse(message.payloadString);
    }
}

export function onMessageDelivered(message: any) {
    console.log('Message sent to: ' + message.destinationName + ' , Message: ' + message.payloadString);
}


// connect the client
export function connectMQTT() {
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.onMessageDelivered = onMessageDelivered;
    client.connect({
        useSSL: true,
        onSuccess: onConnect,
        userName: 'gusasarkw@student.gu.se',
        password: 'Twumasi123.' 
    });
}
