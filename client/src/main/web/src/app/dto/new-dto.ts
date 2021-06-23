export class NewDto {

    private _id: number;
    private _title: string;
    private _text: string;
    private _created: string;
    private _user: string;

    public static createNewObjectFromDto(element: NewDto): NewDto {
        return new NewDto(element.id, element.title, element.text, element.created, element.user);
    }

    constructor(id: number, title: string, text: string, created: string, user: string) {
        this._id = id;
        this._title = title;
        this._text = text;
        this._created = created;
        this._user = user;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get created(): string {
        return this._created;
    }

    set created(value: string) {
        this._created = value;
    }

    get user(): string {
        return this._user;
    }

    set user(value: string) {
        this._user = value;
    }

    public toObject() {
        return {
            id: this._id,
            title: this._title,
            text: this._text,
            created: this._created,
            user: this._user,
        };
    }

}
