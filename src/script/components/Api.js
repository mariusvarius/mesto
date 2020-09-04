import {
    name
} from "file-loader"

export class Api {
    constructor({
        baseUrl,
        headers
    }) { // options
        this.baseUrl = baseUrl
        this.headers = headers
    }

    getItems() {
        return fetch(`${this.baseUrl}/cards`, {
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject('что-то не так!!')
            })
    }

    deleteItem(id) {
        console.log(id);
        return fetch(`${this.baseUrl}/cards/${id}`, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject('что-то не так!!')
            })

    }

    createItem(item) {
        return fetch(`${this.baseUrl}/cards`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(item)
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject('что-то не так!!')
            })
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
                headers: this.headers,
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject('что-то не так!!')
            })
    }

    editProfile(item) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(item)
        });
    }

    getAppInfo() {
        return Promise.all([this.getItems(), this.getUserInfo()])
    }

    likeCard(id) {
        console.log(id);
        console.log("сработал лайк в апи");
        return fetch(`${this.baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject('что-то не так!')
            })
    }

    dislikeCard(id) {
        console.log(id);
        console.log("сработал дизлайк в апи");
        return fetch(`${this.baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject('что-то не так!')
            })
    }

    patchAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject('что-то не так!')
        })
    }

};