import * as firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyAy77CMasWX4GKuE1nGmpinB8C0XybDYkA',
    authDomain: 'thousand-53a5a.firebaseapp.com',
    databaseURL: 'https://thousand-53a5a.firebaseio.com',
    projectId: 'thousand-53a5a',
    storageBucket: '',
    messagingSenderId: '542599085794'
}

firebase.initializeApp(config)
const db = firebase.database()

function extendWithIndex (val, i) {
    if (val) {
        val.index = i
    }
    return val
}

function onRoomsChanged (cb) {
    db.ref('rooms').on('value', snapshot => {
        const rooms = _.chain(snapshot.val())
            .map(extendWithIndex)
            .compact()
            .value()
        cb(rooms)
    })
}

function onRoomChanged (roomName, cb) {
    db.ref('rooms/' + roomName).on('value', snapshot => cb(snapshot.val()))
}

function getRoom (roomName, cb) {
    db.ref('rooms/' + roomName).once('value', snapshot => cb(snapshot.val()))
}

function onGameChanged (roomName, cb) {
    db.ref('game/' + roomName).on('value', snapshot => {
        cb(snapshot.val())
    })
}

export { db, onRoomsChanged, onGameChanged, onRoomChanged, getRoom }
