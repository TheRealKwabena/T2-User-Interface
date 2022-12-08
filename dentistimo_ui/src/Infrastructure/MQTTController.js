"use strict";
exports.__esModule = true;
exports.MQTTController = void 0;
var mqtt = require("mqtt");
var MQTTController = /** @class */ (function () {
    function MQTTController() {
        this.options = {
            port: 8883,
            host: '80a9b426b200440c81e9c17c2ba85bc2.s2.eu.hivemq.cloud',
            protocol: 'mqtts',
            username: 'gusreinaos',
            password: 'Mosquitto1204!'
        };
        this.client = mqtt.connect(this.options);
        this.availabilityTopic = 'avaiability/#';
        this.appointmentTopic = 'appointment/#';
        this.appointmentResponse = 'appointment/response';
        this.appointmentRequest = 'appointment/request';
        this.availabilityRequest = 'availability/request';
        this.availabilityResponse = 'availability/response';
        this.appointment = '';
    }
    MQTTController.prototype.subscribe = function () {
        var _this = this;
        this.client.on('connect', function () {
            _this.client.subscribe(_this.appointmentRequest);
            _this.client.subscribe(_this.availabilityResponse);
            console.log('Client has subscribed successfully');
        });
    };
    MQTTController.prototype.publish = function (topic, responseMessage) {
        var _this = this;
        this.client.on('connect', function () {
            _this.client.publish(topic, responseMessage);
            console.log(topic, responseMessage);
        });
    };
    return MQTTController;
}());
exports.MQTTController = MQTTController;
