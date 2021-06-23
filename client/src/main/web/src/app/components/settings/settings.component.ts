import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {UserDto} from "../../dto/user-dto";
import {ImageUtil} from "../../util/image.util";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    public currentUser: UserDto = new UserDto(null, null, null, null, null, null, null, null, null);
    public currentUserImageSrc: string;
    public files: any;

    constructor(private shared: SharedService,
                private userService: UserService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loadCurrentUser();
    }

    private loadCurrentUser(): void {
        this.userService.getById(this.userService.getLoggedUser().id).subscribe(data => {
            this.currentUser = data;
            if (this.currentUser.photoFile !== null && this.currentUser.photoFileExtension !== null) {
                this.currentUserImageSrc = ImageUtil.getImageUrl(this.currentUser.photoFile, this.currentUser.photoFileExtension);
            }
            this.currentUser.password = null;
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public selectFile(event: any): void {
        this.files = null;
        let target = event.target || event.srcElement;
        this.files = target.files;
    }

    public updateUser(): void {
        this.userService.save(this.currentUser, this.files).subscribe(data => {
            this.currentUser = data;
            if (this.currentUser.photoFile !== null && this.currentUser.photoFileExtension !== null) {
                this.currentUserImageSrc = ImageUtil.getImageUrl(this.currentUser.photoFile, this.currentUser.photoFileExtension);
            }
            this.currentUser.password = null;
            this.files = null;
            this.shared.openSnackBar('Данные пользователя успешно обновлены');
            this.userService.setLoggedUser(UserDto.createNewObjectFromDto(this.currentUser));
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public deleteUser(): void {
        this.userService.removeById(this.currentUser.id).subscribe(() => {
            this.userService.setUserToken('');
            this.userService.setLoggedUser(new UserDto(null, null, null, null, null, null, null, null, null));
            this.router.navigate(['home']);
            this.shared.openSnackBar('Пользователь успешно удален');
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }
}
