import Paho from 'paho-mqtt';

// Create a client instance
const client = new Paho.Client('e960f016875b4c75857353c7f267d899.s2.eu.hivemq.cloud', Number(8884), `${Math.random().toFixed(6)}`);

var appointments : any[];

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
        }, 100);
    })
}

/**
 * new Promise((resolve, reject) => {
 *  if (messageReceived(get/appointments/response)) {resolve()};
 *  
 * })
 */

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
    }
}

export function onMessageDelivered(message: any) {
    console.log('Message sent to: ' + message.destinationName + ' , Message: ' + message.payloadString);
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
    client.onMessageDelivered = onMessageDelivered;
    client.connect({
        useSSL: true,
        onSuccess: onConnect,
        userName: 'gusasarkw@student.gu.se',
        password: 'Twumasi123.' 
    });
}