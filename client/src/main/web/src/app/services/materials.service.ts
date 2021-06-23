import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from "./local-storage.service";
import {Observable} from "rxjs";
import {FolderDto} from "../dto/folder-dto";
import {UserService} from "./user.service";
import {FoldersListDto} from "../dto/list/folder-list-dto";
import {FileDto} from "../dto/file-dto";

@Injectable({
    providedIn: 'root'
})
export class MaterialsService {

    private readonly SERVER_URL: string;

    private readonly FOLDERS_LIST: string;
    private GET_FOLDER_BY_ID: string;
    private readonly SAVE_FOLDER: string;
    private DELETE_FOLDER: string;
    private readonly ADD_FILE: string;
    private REMOVE_FILE: string;

    constructor(private http: HttpClient,
                private localStorageService: LocalStorageService,
                private userService: UserService) {
        this.SERVER_URL = this.localStorageService.getServerURL();

        this.FOLDERS_LIST = this.SERVER_URL + '/folder/';
        this.GET_FOLDER_BY_ID = this.SERVER_URL + '/folder/{id}';
        this.SAVE_FOLDER = this.SERVER_URL + '/folder/';
        this.DELETE_FOLDER = this.SERVER_URL + '/folder/{id}';
        this.ADD_FILE = this.SERVER_URL + '/folder/file/';
        this.REMOVE_FILE = this.SERVER_URL + '/folder/file/{id}';
    }

    public save(folder: FolderDto): Observable<FolderDto> {
        return this.http.post<FolderDto>(this.SAVE_FOLDER, folder.toObject(), this.userService.getOptions());
    }

    public getAll(): Observable<FoldersListDto> {
        return this.http.get<FoldersListDto>(this.FOLDERS_LIST);
    }

    public deleteById(id: string): Observable<Object> {
        const regExp = /{id}/gi;
        const url = this.DELETE_FOLDER.replace(regExp, id);
        return this.http.delete<Object>(url, this.userService.getOptions());
    }

    public getById(id: string): Observable<FolderDto> {
        const regExp = /{id}/gi;
        const url = this.GET_FOLDER_BY_ID.replace(regExp, id);
        return this.http.get<FolderDto>(url);
    }

    public removeFileById(folder: FolderDto, id: string): Observable<FolderDto> {
        const regExp = /{id}/gi;
        const url = this.REMOVE_FILE.replace(regExp, id);
        return this.http.post<FolderDto>(url, FolderDto.createNewObjectFromDto(folder).toObject(), this.userService.getOptions());
    }

    public addFile(folder: FolderDto, file: FileDto, files: any): Observable<FolderDto> {
        return this.http.post<FolderDto>(this.ADD_FILE, this.createFormData(file, folder, files), this.userService.getOptions());
    }

    private createFormData(file: FileDto, folder: FolderDto, files: any): FormData {
        let formData = new FormData();

        const fileJson = JSON.stringify(FileDto.createNewObjectFromDto(file).toObject());
        const fileBlob = new Blob([fileJson], {
            type: 'application/json'
        });

        const folderJson = JSON.stringify(FolderDto.createNewObjectFromDto(folder).toObject());
        const folderBlob = new Blob([folderJson], {
            type: 'application/json'
        });

        let result: FileList = files;
        formData.append('uploadedFile', result[0]);
        formData.append('file', fileBlob);
        formData.append('folder', folderBlob);

        return formData;
    }

}
