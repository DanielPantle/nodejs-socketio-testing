'use strict';

class GameServer {
    constructor() {
        console.log('GameServer constructor');
        this._socket = null;
        this._name = "";
    }

    isActive() {
        return !!this._socket;
    }

    register(socket, name) {
        if(this.isActive()) {
            console.log('already one server connected.');
            return false;
        } else {
            console.log('register server: ', socket.id, name);
            this._socket = socket;
            this._name = name;
            return true;
        }
    }

    get data() {
        return {
            name: this._name
        };
    }

    get socket() {
        return this._socket;
    }
    set socket(socket) {
        this._socket = socket;
    }

    unbind() {
        console.log('server connection lost');
        this._socket = null;
        this._name = "";
    }
}

// Klasse in index verfügbar machen
module.exports = GameServer;
