import _ from 'lodash';

import { io } from '../../../bin/www';

const { getAllAppointments } = require('./appointment');

const clientSockets = {};
const userSocketIds = {};
let socketTmp;

io.on('connection', (socket) => {
    const socketId = socket.id;
    console.log(`${socketId}==== connected=====`);

    socket.on('disconnect', () => {
        const username = userSocketIds[socket.id];
        delete socket.username;
        delete userSocketIds[socket.id];
        if(typeof clientSockets[username] != 'undefined' && typeof clientSockets[username][socket.id] != 'undefined'){
            delete clientSockets[username][socket.id];
        }

        socket.removeAllListeners('disconnect');
        socket.removeAllListeners('user_join');
    });

    setInterval(async () => {
        // console.log(`socket IO loop ${new Date()}`);
        const notifications = await getAllAppointments(5);
        if (notifications) {
            notifications.forEach((notification) => {
                const username = _.get(notification, 'user.username', false);
                console.log('send to: ', username);
                socketTmp = clientSockets[username]; // socketTmp la 1 mang
                if (socketTmp && username) {
                    for(let socketId in socketTmp){
                        socket.broadcast.to(socketId).emit('new_notifications', {
                            status: 'ok',
                            notification,
                            block: '5min',
                        });
                    }
                }
            });
        }

        // const notification15s = await getAllAppointments(15);
        // if (notification15s) {
        //     // console.log('socket IO notification15s');
        //     notification15s.forEach((notification) => {
        //         const username = _.get(notification, 'user.username', false);
        //         console.log('send to: ', username);
        //         socketTmp = clientSockets[username];
        //         if (socketTmp && username) {
        //             socket.broadcast.to(socketTmp.id).emit('new_notifications', {
        //                 status: 'ok',
        //                 notification,
        //                 block: '15min',
        //             });
        //         }
        //     });
        // }
    }, 60000);

    socket.on('user_join', (data) => {
        socket.username = data.username;
        socket.join(socket.username);
        if(!clientSockets[data.username]){
            clientSockets[data.username] = {};
        }
        clientSockets[data.username][socket.id] = socket;
        userSocketIds[socket.id] = data.username;

        console.log('joined');
        io.emit('join_result', {
            username: data.username,
            date: new Date(),
        });
    });

    socket.on('created_appointment_success', (data) => {
        const { toUserName = '', fromUserName = '', notification } = data;
        socketTmp = clientSockets[toUserName]; // socketTmp la 1 mang
        if (fromUserName === toUserName) {
            socket.emit('new_notifications', {
                status: 'ok',
                notification,
                block: '0min',
            });
        } else if (socketTmp && toUserName) {
            console.log('=created_appointment_success to ', toUserName);
            for(let socketId in socketTmp){
                socket.broadcast.to(socketId).emit('new_notifications', {
                    status: 'ok',
                    notification,
                    block: '0min',
                });
            }
        }
    });
});
