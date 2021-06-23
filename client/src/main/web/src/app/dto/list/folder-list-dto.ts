import {FolderDto} from '../folder-dto';

export class FoldersListDto {

    private _folders: FolderDto[] = [];

    constructor(folders: FolderDto[]) {
        this._folders = folders;
    }

    get folders(): FolderDto[] {
        return this._folders;
    }

    set folders(value: FolderDto[]) {
        this._folders = value;
    }

}
