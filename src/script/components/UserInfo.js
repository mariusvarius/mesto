export class UserInfo {
    constructor({
        profileNameSelector,
        profileJobSelector
    }) {
        this._profileNameSelector = profileNameSelector;
        this._profileJobSelector = profileJobSelector;
        this._profileName = document.querySelector(this._profileNameSelector);
        this._profileJob = document.querySelector(this._profileJobSelector);

    }
    getUserInfo() {
        this._userProfile = {
            name: this._profileName.textContent,
            job: this._profileJob.textContent
        };
        return this._userProfile;
    }
    setUserInfo({
        name,
        job
    }) {
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
    }
}