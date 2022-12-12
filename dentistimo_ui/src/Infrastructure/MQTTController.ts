import * as mqtt from 'mqtt'
import { IClientOptions } from 'mqtt'
import { convertToLocalTime } from '../../src/Domain/Utils/dateUtils';


export class MQTTController {
    id
    constructor(dentistId){
        this.id = dentistId
    }

    readonly options: IClientOptions = {
        port: 8883,
        host: '80a9b426b200440c81e9c17c2ba85bc2.s2.eu.hivemq.cloud',
        protocol: 'mqtts',
        username: 'gusreinaos',
        password: 'Mosquitto1204!'
    }

    readonly client = mqtt.connect(this.options);
    readonly mqtt_options = {qos: 1};

    readonly availabilityTopic = 'avaiability/#'
    readonly appointmentTopic = 'appointment/#'
    readonly appointmentResponse = 'appointment/response'
    readonly appointmentRequest = 'appointment/request'
    readonly editRequest = 'edit/request'
    readonly editResponse = 'edit/response'
    readonly inventoryRequest = 'inventory/request'
    readonly inventoryResponse = 'inventory/response'

    public connect() {
        this.client.on('connect', () => {
            console.log('Client is connected to the internet');
            this.client.subscribe(this.appointmentResponse, {qos: 1})
            this.client.subscribe(this.editResponse, {qos: 1})
            this.client.subscribe(this.inventoryResponse, {qos: 1})
            console.log('Client has subscribed successfully')
            this.client.on('message', (topic, message) => {
                if(topic === this.inventoryResponse) {
                    const answer = JSON.parse(message.toString())
                    console.log(answer)
                }
            })     
        })
    }

    // functon to send message to mqtt to check availability and create new appointment
    public createAppointment = ({ id, dentistry, date }) => {
        let newAppointment = null;
        newAppointment = <JSON><unknown> {
            'userId': id,
            'requestId': dentistry,
            'date': date
        }
        this.client.publish(this.appointmentRequest, JSON.stringify(newAppointment), {qos: 1});
        // must register success or failure
    }

    public updateAppointment = ({ id, newDentistry, newDate }) => {
        let newAppointment = null;
        newAppointment = <JSON><unknown> {
            'userId': id,
            'requestId': newDentistry,
            'date': newDate
        }
        this.client.publish(this.editRequest, JSON.stringify(newAppointment), {qos: 1});
    }

    public fetchInventory(dentistId){
        this.client.publish(this.inventoryRequest, dentistId, {qos: 1});
    }
}
