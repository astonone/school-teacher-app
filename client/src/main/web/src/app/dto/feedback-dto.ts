export class FeedbackDto {

    private _id: string;
    private _userName: string;
    private _contactData: string;
    private _text: string;

    public static createNewObjectFromDto(element: FeedbackDto): FeedbackDto {
        return new FeedbackDto(element.id, element.userName, element.contactData, element.text);
    }

    constructor(id: string, userName: string, contactData: string, text: string) {
        this._id = id;
        this._userName = userName;
        this._contactData = contactData;
        this._text = text;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

    get contactData(): string {
        return this._contactData;
    }

    set contactData(value: string) {
        this._contactData = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    public toObject() {
        return {
            id: this._id,
            userName: this._userName,
            text: this._text,
            contactData: this._contactData
        };
    }
}