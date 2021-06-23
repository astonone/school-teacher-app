export class FileDto {

    private _id: string;
    private _filepath: string;
    private _filename: string;
    private _file: string;
    private _fileExtension: string;

    public static createNewObjectFromDto(element: FileDto): FileDto {
        return new FileDto(element.id, element.filename, element.filepath, element.file, element.fileExtension);
    }

    constructor(id: string, filepath: string, filename: string, file: string, fileExtension: string) {
        this._id = id;
        this._filepath = filepath;
        this._filename = filename;
        this._file = file;
        this._fileExtension = fileExtension;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get filepath(): string {
        return this._filepath;
    }

    set filepath(value: string) {
        this._filepath = value;
    }

    get filename(): string {
        return this._filename;
    }

    set filename(value: string) {
        this._filename = value;
    }

    get file(): string {
        return this._file;
    }

    set file(value: string) {
        this._file = value;
    }

    get fileExtension(): string {
        return this._fileExtension;
    }

    set fileExtension(value: string) {
        this._fileExtension = value;
    }

    public toObject() {
        return {
            id: this._id,
            filepath: this._filepath
        };
    }
}
