import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from "./local-storage.service";
import {Observable} from "rxjs";
import {FeedbackDto} from "../dto/feedback-dto";
import {FeedbackListDto} from "../dto/list/feedback-list-dto";

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    private readonly SERVER_URL: string;

    private readonly FEEDBACK_LIST: string;
    private FEEDBACK_DELETE_BY_ID: string;
    private readonly FEEDBACK_CREATE: string;

    constructor(private http: HttpClient,
                private localStorageService: LocalStorageService) {
        this.SERVER_URL = this.localStorageService.getServerURL();

        this.FEEDBACK_LIST = this.SERVER_URL + '/feedback/';
        this.FEEDBACK_DELETE_BY_ID = this.SERVER_URL + '/feedback/{id}';
        this.FEEDBACK_CREATE = this.SERVER_URL + '/feedback/';
    }

    public save(note: FeedbackDto): Observable<FeedbackDto> {
        return this.http.post<FeedbackDto>(this.FEEDBACK_CREATE, note.toObject());
    }

    public getAll(): Observable<FeedbackListDto> {
        return this.http.get<FeedbackListDto>(this.FEEDBACK_LIST);
    }

    public deleteById(id: string): Observable<Object> {
        const regExp = /{id}/gi;
        const url = this.FEEDBACK_DELETE_BY_ID.replace(regExp, id);
        return this.http.delete<Object>(url);
    }
}