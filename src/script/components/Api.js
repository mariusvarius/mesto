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
        return fetch(this.baseUrl, {
                headers: this.headers
            })
            .then(res => res.json())
    }

    deleteItem(id) {
        console.log(id);
        return fetch(`${this.baseUrl}/${id}`, {
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
        return fetch(this.baseUrl, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(item)
            })
            .then(res => res.json())
    }

    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
                headers: this.headers,
            })
            .then(res => res.json())
    }

    editProfile(item) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
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
        return fetch(`${this.baseUrl}/likes/${id}`, {
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
        return fetch(`${this.baseUrl}/likes/${id}`, {
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

}