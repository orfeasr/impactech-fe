import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
export default {
    GET: {
        'https://localhost:42000/notifications': {
            handler: getNotifications
        }
    },
    POST: {
        'https://localhost:42000/login': {
            handler: login
        },
        'https://localhost:42000/register': {
            handler: register
        },
        'https://localhost:42000/sendNotification': {
            handler: sendNotifications
        }
    },
    PUT: {
        'https://localhost:42000/updateUser': {
            handler: updateUser
        }
    }
}
function getNotifications(params) {
    let username = params.get('username');
    let notifications = localStorage.getItem('users-notifications');
    if (notifications != null) {
        let userNotifications = JSON.parse(notifications);
        console.log(userNotifications);
        console.log(userNotifications.findIndex(x => x.username === username))
        let index = userNotifications.findIndex(x => x.username === username)
        if (index > -1) {
            return of(new HttpResponse({
                status: 200, body:userNotifications[index].notifications
            }));
        } 
    }

    return of(new HttpResponse({
        status: 200, body:[]
    }));
}

function sendNotifications(params) {
    let notifications = localStorage.getItem('users-notifications')
    if (notifications != null) {
        let userNotifications = JSON.parse(notifications);
        let index = userNotifications.findIndex(x => x.username === params.recepient);
        if (index > -1) {
            userNotifications[index].notifications.push(params.notification);
        } else {
            userNotifications.push({
                username: params.recepient,
                notifications: [params.notification]
            });
        }
        localStorage.setItem('users-notifications', JSON.stringify(userNotifications));
    } else {
        localStorage.setItem('users-notifications', JSON.stringify([{
            username: params.recepient,
            notifications: [params.notification]
        }]));
    }

    return of(new HttpResponse({
        status: 200, body: {
            status: 'SUCCESS',
            message: 'Notification Sent'
        }

    }));
}

function register(body) {
    let registeredUseres = localStorage.getItem('registered-users')
    if (registeredUseres != null) {
        let users = JSON.parse(registeredUseres);
        if (users.findIndex(x => x.username === body.username) === -1) {
            users.push(body);
            localStorage.setItem('registered-users', JSON.stringify(users));
            return of(new HttpResponse({
                status: 200, body:
                {
                    staus: 'SUCCESS',
                    message: 'User Registered Successfully'
                }
            }));
        } else {
            return of(new HttpResponse({
                status: 200, body:
                {
                    staus: 'FAILED',
                    message: 'Username Already Exists'
                }
            }));
        }
    } else {
        localStorage.setItem('registered-users', JSON.stringify([body]));
        return of(new HttpResponse({
            status: 200, body:
            {
                staus: 'SUCCESS',
                message: 'User Registered Successfully'
            }
        }));
    }
}

function login(body) {
    let isAuthenticated: boolean = false;
    let userDetails: any = {};
    if (localStorage.getItem('registered-users') != null) {
        let users = JSON.parse(localStorage.getItem('registered-users'));
        let index = users.findIndex(x => x.username === body.username && x.password === body.password);
        if (index > -1) {
            isAuthenticated = true;
            userDetails = users[index];
        }
    }
    return of(new HttpResponse({
        status: 200, body:
        {
            authenticated: isAuthenticated,
            userDetails: userDetails
        }
    }));

}

function updateUser(params) {
    const users = localStorage.getItem('registered-users');
    if (users != null) {
        const registeredUsers = JSON.parse(users);
        const index = registeredUsers.findIndex(x => x.username === params.curentUser);
        if (index > -1) {
            registeredUsers[index] = params.profile;
            localStorage.setItem('registered-users', JSON.stringify(registeredUsers));
        } else {
           console.log('user not found');
        }
    } else {
        console.log('no users for now');
    }

    return of(new HttpResponse({
        status: 200, body: {
            status: 'SUCCESS',
            message: 'User profile updated'
        }

    }));
}

