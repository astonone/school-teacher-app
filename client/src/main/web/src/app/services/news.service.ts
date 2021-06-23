import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from "./local-storage.service";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {NewDto} from "../dto/new-dto";
import {NewsListDto} from "../dto/list/new-list-dto";

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    private readonly SERVER_URL: string;

    private readonly GET_ALL: string;
    private readonly SAVE: string;
    private DELETE_BY_ID: string;

    constructor(private http: HttpClient,
                private localStorageService: LocalStorageService,
                private userService: UserService) {
        this.SERVER_URL = this.localStorageService.getServerURL();

        this.GET_ALL = this.SERVER_URL + '/new/';
        this.DELETE_BY_ID = this.SERVER_URL + '/new/{id}';
        this.SAVE = this.SERVER_URL + '/new/';
    }

    public save(note: NewDto): Observable<NewDto> {
        return this.http.post<NewDto>(this.SAVE, note.toObject(), this.userService.getOptions());
    }

    public getAll(): Observable<NewsListDto> {
        return this.http.get<NewsListDto>(this.GET_ALL);
    }

    public deleteById(id: number): Observable<Object> {
        const regExp = /{id}/gi;
        const url = this.DELETE_BY_ID.replace(regExp, id.toString());
        return this.http.delete<Object>(url, this.userService.getOptions());
    }

}
