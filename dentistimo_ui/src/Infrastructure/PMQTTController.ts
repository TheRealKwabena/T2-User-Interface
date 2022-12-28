import Paho from 'paho-mqtt';
import { encrypt } from '../utils/encryptionUtils';
// Create a client instance
const client = new Paho.Client('cb9fe4f292fe4099ae5eeb9f230c8346.s2.eu.hivemq.cloud', Number(8884), "clientId");
client.onMessageArrived = onMessageArrived;

var login_response = '';
var signout_response = '';
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
        login_response = message.payloadString;
    } if (message.destinationName === 'authentication/signOut/response') {
        signout_response = message.payloadString;
    }
}

export const getJWT = async () => {
    return new Promise(() => {
        client.subscribe('authentication/signIn/response', { qos: 1 });
        try {
            setTimeout(() => {
                const object = JSON.parse(login_response)
                window.localStorage.setItem('TOKEN', object.jwtToken);
                window.localStorage.setItem('ID', object._id)
                window.location.replace("/");

                if (localStorage.getItem('TOKEN') === null) {
                    alert('could not log in');
                }
            }, 1000)

        } catch (error) {
            alert('something went wrong, please try again.');
        }
      
    })
}


export const signOut = async () => {
    try {
        const userId = { id: localStorage.getItem('ID') }
        const encrypted = encrypt(userId);
        publish('authentication/signOut/request', encrypted.toString());
        
            return new Promise(() => {
                client.subscribe('authentication/signOut/response', { qos: 1 });
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