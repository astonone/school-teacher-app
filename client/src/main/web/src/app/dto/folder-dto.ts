import {FileDto} from './file-dto';

export class FolderDto {

    private _id: string;
    private _name: string;
    private _files: FileDto[] = [];

    public static createNewObjectFromDto(element: FolderDto): FolderDto {
        return new FolderDto(element.id, element.name, element.files);
    }

    constructor(id: string, name: string, files: FileDto[]) {
        this._id = id;
        this._name = name;
        this._files = files;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get files(): FileDto[] {
        return this._files;
    }

    set files(value: FileDto[]) {
        this._files = value;
    }

    public toObject() {
        return {
            id: this._id,
            name: this._name,
        };
    }
}
