import * as mqtt from 'mqtt'
import { IClientOptions } from 'mqtt'

export class MQTTController {

    constructor(){}

    readonly options: IClientOptions = {
        port: 8883,
        host: '80a9b426b200440c81e9c17c2ba85bc2.s2.eu.hivemq.cloud',
        protocol: 'mqtts',
        username: 'gusreinaos',
        password: 'Mosquitto1204!'
    }

    readonly client = mqtt.connect(this.options);

    readonly availabilityTopic = 'avaiability/#'
    readonly appointmentTopic = 'appointment/#'
    readonly appointmentResponse = 'appointment/response'
    readonly appointmentRequest = 'appointment/request'
    readonly availabilityRequest = 'availability/request'
    readonly availabilityResponse = 'availability/response'

    appointment = '';

    public subscribe() {
        this.client.on('connect', () => {
            this.client.subscribe(this.appointmentRequest)
            this.client.subscribe(this.availabilityResponse)
            console.log('Client has subscribed successfully')
        });
    }

    public publish(topic: string, responseMessage: string) {
        this.client.on('connect',  () => {
            this.client.publish(topic, responseMessage);
            console.log(topic ,responseMessage)
        })
    }
}



