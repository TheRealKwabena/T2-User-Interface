"use strict";
exports.__esModule = true;
exports.MQTTController = void 0;
var mqtt = require("mqtt");
var MQTTController = /** @class */ (function () {
    function MQTTController() {
        var _this = this;
        this.options = {
            port: 8883,
            host: '80a9b426b200440c81e9c17c2ba85bc2.s2.eu.hivemq.cloud',
            protocol: 'mqtts',
            username: 'gusreinaos',
            password: 'Mosquitto1204!'
        };
        this.client = mqtt.connect(this.options);
        this.mqtt_options = { qos: 1 };
        this.availabilityTopic = 'avaiability/#';
        this.appointmentTopic = 'appointment/#';
        this.appointmentResponse = 'appointment/response';
        this.appointmentRequest = 'appointment/request';
        this.editRequest = 'edit/request';
        this.editResponse = 'edit/response';
        this.inventoryRequest = 'inventory/request';
        this.inventoryResponse = 'inventory/response';
        // functon to send message to mqtt to check availability and create new appointment
        this.createAppointment = function (_a) {
            var id = _a.id, dentistry = _a.dentistry, date = _a.date;
            var newAppointment = null;
            newAppointment = {
                'userId': id,
                'requestId': dentistry,
                'date': date
            };
            _this.client.publish(_this.appointmentRequest, JSON.stringify(newAppointment), { qos: 1 });
            // must register success or failure
        };
        this.updateAppointment = function (_a) {
            var id = _a.id, newDentistry = _a.newDentistry, newDate = _a.newDate;
            var newAppointment = null;
            newAppointment = {
                'userId': id,
                'requestId': newDentistry,
                'date': newDate
            };
            _this.client.publish(_this.editRequest, JSON.stringify(newAppointment), { qos: 1 });
        };
    }
    MQTTController.prototype.connect = function () {
        var _this = this;
        this.client.on('connect', function () {
            console.log('Client is connected to the internet');
            _this.client.subscribe(_this.appointmentResponse, { qos: 1 });
            _this.client.subscribe(_this.editResponse, { qos: 1 });
            _this.client.subscribe(_this.inventoryResponse, { qos: 1 });
            console.log('Client has subscribed successfully');
            _this.client.on('message', function (topic, message) {
                if (topic === _this.inventoryResponse) {
                    var answer = JSON.parse(message.toString());
                    console.log(answer);
                }
            });
        });
    };
    MQTTController.prototype.fetchInventory = function () {
        this.client.publish(this.inventoryRequest, '', { qos: 1 });
    };
    return MQTTController;
}());
exports.MQTTController = MQTTController;
