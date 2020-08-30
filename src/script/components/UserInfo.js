export class UserInfo {
    constructor({
        profileNameSelector,
        profileJobSelector,
        profileAvatarSelector
    }) {
        this._profileNameSelector = profileNameSelector;
        this._profileJobSelector = profileJobSelector;
        this._profileAvatarSelector = profileAvatarSelector;
        this._profileName = document.querySelector(this._profileNameSelector);
        this._profileJob = document.querySelector(this._profileJobSelector);
        this._profileAvatar = document.querySelector(this._profileAvatarSelector);

    }
    getUserInfo() {
        this._userProfile = {
            name: this._profileName.textContent,
            about: this._profileJob.textContent,
            avatar: this.this._profileAvatar.style.backgroundImage

        };
        return this._userProfile;
    }
    setUserInfo({
        name,
        about,
        avatar
    }) {
        if (name) {
            this._profileName.textContent = name;
        }
        if (about) {
            this._profileJob.textContent = about;
        }
        if (avatar) {
            this._profileAvatar.style.backgroundImage = `url(${avatar})`;
        }
    }


    setUserAvatar(
        data
    ) {
        this._profileAvatar.style.backgroundImage = `url(${data})`;
    }
}