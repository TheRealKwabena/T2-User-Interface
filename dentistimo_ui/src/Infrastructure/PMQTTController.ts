import Paho from 'paho-mqtt';
// Create a client instance
const client = new Paho.Client('80a9b426b200440c81e9c17c2ba85bc2.s2.eu.hivemq.cloud', Number(8884), "clientId");
client.onMessageArrived = onMessageArrived;

var msg = '';
// called when the client connects
export function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log(`Connected successfully.`);
    client.subscribe("appointment/request");
    client.subscribe("appointment/response");
}

export function subscribe(topic: string) {
    client.subscribe(topic);
}

export function publish(topic: any, message: any) {
    const payload = new Paho.Message(message);
    payload.destinationName = topic;
    client.send(topic, message, 1);
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
    } if (message.destinationName === 'authentication/signIn/response') {
        msg = message.payloadString;
    }
}

export const getJWT = async () => {
    return new Promise(() => {
        client.subscribe('authentication/signIn/response', { qos: 1 });
        const object = JSON.parse(msg)
        window.localStorage.setItem('TOKEN', object.jwtToken);
    })
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