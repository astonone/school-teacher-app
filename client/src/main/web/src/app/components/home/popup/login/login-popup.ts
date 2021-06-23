import {Component} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service';
import {RegistrationPopup} from '../registration/registration-popup';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserDto} from "../../../../dto/user-dto";

@Component({
    selector: 'login-popup',
    templateUrl: 'login-popup.html',
    styleUrls: ['login-popup.css']
})
export class LoginPopup {

    public user: UserDto = new UserDto(null, null, null, null, null, null, null, null, null);
    public isRemember = false;

    constructor(
        public dialogRef: MatDialogRef<LoginPopup>,
        private shared: SharedService,
        private dialog: MatDialog,
        private userService: UserService) {
    }

    public login(): void {
        if (this.isRemember) {
            localStorage.setItem('isRemember', 'true');
        } else {
            localStorage.setItem('isRemember', 'false');
        }
        this.userService.loginAndAuthUser(this.isRemember, this.user, this.dialogRef);
    }

    public openRegistrationPopup(): void {
        const dialogRef = this.dialog.open(RegistrationPopup, {});
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    public closeLoginPopup(): void {
        this.dialogRef.close();
    }
}
