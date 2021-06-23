import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDto} from '../dto/user-dto';
import {LocalStorageService} from "./local-storage.service";
import {SharedService} from "./shared.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {LoginPopup} from "../components/home/popup/login/login-popup";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly SERVER_URL: string;

    private readonly LOGIN: string;
    private readonly AUTH: string;
    private readonly SAVE: string;
    private GET_BY_ID: string;
    private DELETE: string;

    constructor(private http: HttpClient,
                private localStorageService: LocalStorageService,
                private shared: SharedService,
                private router: Router) {
        this.SERVER_URL = this.localStorageService.getServerURL();

        this.LOGIN = this.SERVER_URL + '/user/login';
        this.AUTH = this.SERVER_URL + '/user/authenticate';
        this.GET_BY_ID = this.SERVER_URL + '/user/{id}';
        this.DELETE = this.SERVER_URL + '/user/{id}';
        this.SAVE = this.SERVER_URL + '/user/';
    }

    public setUserToken(token: string): void {
        this.localStorageService.getStorage().setItem('token', token);
    }

    public getUserToken(): string {
        return this.localStorageService.getStorage().getItem('token');
    }

    public setLoggedUser(user: UserDto): void {
        if (user.id !== null) {
            user.photoFile = null;
            user.photoFileExtension = null;
            this.localStorageService.getStorage().setItem('loggedUser', JSON.stringify(UserDto.createNewObjectFromDto(user).toObject()));
        } else {
            this.localStorageService.getStorage().setItem('loggedUser', '');
        }
    }

    public getLoggedUser(): UserDto {
        let user = this.localStorageService.getStorage().getItem('loggedUser');
        if (user !== null && user !== '') {
            let parsedUser = JSON.parse(user);
            return new UserDto(parsedUser.id, parsedUser.username, parsedUser.password, parsedUser.firstName,
                parsedUser.lastName, parsedUser.pathToPhotoLink, null, null, null);
        } else {
            return null;
        }
    }

    public isUserLogged(): boolean {
        return this.getLoggedUser() !== null;
    }

    public getOptions() {
        const headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + this.getUserToken()
        });

        return {headers: headers};
    }

    public login(userDto: UserDto): Observable<Object> {
        return this.http.post<Observable<Object>>(this.LOGIN, UserDto.createNewObjectFromDto(userDto).toObject());
    }

    public authenticate(): Observable<UserDto> {
        return this.http.post<UserDto>(this.AUTH, null, this.getOptions());
    }

    public getById(id: string): Observable<UserDto> {
        const regExp = /{id}/gi;
        const url = this.GET_BY_ID.replace(regExp, id);
        if (id === '1') {
            return this.http.get<UserDto>(url);
        }
        return this.http.get<UserDto>(url, this.getOptions());
    }

    public save(user: UserDto, files: any): Observable<UserDto> {
        return this.http.post<UserDto>(this.SAVE, this.createFormData(UserDto.createNewObjectFromDto(user), files));
    }

    private createFormData(user: UserDto, files: any): FormData {
        let formData = new FormData();

        const json = JSON.stringify(user.toObject());
        const blob = new Blob([json], {
            type: 'application/json'
        });

        if (files) {
            let result: FileList = files;
            formData.append('uploadedFile', result[0]);
            formData.append('user', blob);
        } else {
            formData.append('user', blob);
        }

        return formData;
    }

    public removeById(id: string): Observable<Object> {
        const regExp = /{id}/gi;
        const url = this.DELETE.replace(regExp, id);
        return this.http.delete<Observable<Object>>(url, this.getOptions());
    }

    public loginAndAuthUser(isRemember: boolean, user: UserDto, dialogRef: MatDialogRef<LoginPopup>) {
        if (isRemember) {
            localStorage.setItem('isRemember', 'true');
        } else {
            localStorage.setItem('isRemember', 'false');
        }
        this.login(user)
            .subscribe(() => {
                this.setUserToken(btoa(user.username + ':' + user.password));
                this.setLoggedUser(new UserDto(null, null, null, null, null,
                    null, null, null, null));
                this.authenticate().subscribe(data => {
                    this.setLoggedUser(data);
                    dialogRef.close();
                })
            }, error => {
                if (error.status === 401) {
                    this.shared.openSnackBar("Пользователь или пароль неверные!");
                } else {
                    this.shared.openSnackBar(error.error.message);
                }
            });
    }

}
