import {Component} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {UserService} from '../../../../services/user.service';
import {UserDto} from '../../../../dto/user-dto';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'login-popup',
    templateUrl: 'registration-popup.html',
    styleUrls: ['registration-popup.css']
})
export class RegistrationPopup {

    public newUser: UserDto = new UserDto(null, null, null, null, null, null, null, null, null);

    constructor(
        public dialogRef: MatDialogRef<RegistrationPopup>,
        private shared: SharedService,
        private userService: UserService) {
    }

    public createUser(): void {
        this.userService.save(this.newUser, null).subscribe((data) => {
            this.shared.openSnackBar('Пользователь ' + data.username + ' успешно создан');
            this.closeRegistrationPopup();
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public isValidInput(): boolean {
        return !this.shared.isBlank(this.newUser.username)
            && !this.shared.isBlank(this.newUser.password)
            && !this.shared.isBlank(this.newUser.firstName)
            && !this.shared.isBlank(this.newUser.lastName)
            && !this.shared.isBlank(this.newUser.secretKey);
    }

    public closeRegistrationPopup(): void {
        this.dialogRef.close();
    }
}
