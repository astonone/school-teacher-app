import {ImageUtil} from '../util/image.util';

export class UserDto {

    private _id: string;
    private _username: string;
    private _password: string;
    private _repeatedPassword: string;
    private _firstName: string;
    private _lastName: string;
    private _pathToPhotoLink: string;
    private _photoFile: string;
    private _photoFileExtension: string;
    private _secretKey: string;

    public static createNewObjectFromDto(element: UserDto): UserDto {
        return new UserDto(element.id, element.username, element.password, element.firstName, element.lastName,
            element.pathToPhotoLink, element.photoFile, element.photoFileExtension, element.secretKey);
    }

    constructor(id: string, username: string, password: string, firstName: string, lastName: string, pathToPhotoLink: string, photoFile: string, photoFileExtension: string, secretKey: string) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
        this._pathToPhotoLink = pathToPhotoLink;
        this._photoFile = photoFile;
        this._photoFileExtension = photoFileExtension;
        this._secretKey = secretKey;
        if (this._photoFile !== null && this._photoFileExtension !== null) {
            this._photoFile = ImageUtil.getImageUrl(this._photoFile, this._photoFileExtension)
        }
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get repeatedPassword(): string {
        return this._repeatedPassword;
    }

    set repeatedPassword(value: string) {
        this._repeatedPassword = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get pathToPhotoLink(): string {
        return this._pathToPhotoLink;
    }

    set pathToPhotoLink(value: string) {
        this._pathToPhotoLink = value;
    }

    get photoFile(): string {
        return this._photoFile;
    }

    set photoFile(value: string) {
        this._photoFile = value;
    }

    get photoFileExtension(): string {
        return this._photoFileExtension;
    }

    set photoFileExtension(value: string) {
        this._photoFileExtension = value;
    }

    get secretKey(): string {
        return this._secretKey;
    }

    set secretKey(value: string) {
        this._secretKey = value;
    }

    public toObject() {
        return {
            id: this._id,
            username: this._username,
            password: this._password,
            firstName: this._firstName,
            lastName: this._lastName,
            secretKey: this._secretKey
        };
    }

}
