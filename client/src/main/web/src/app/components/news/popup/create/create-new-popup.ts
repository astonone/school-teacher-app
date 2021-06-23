import {Component, Inject} from '@angular/core';
import {NewsService} from '../../../../services/news.service';
import {SharedService} from '../../../../services/shared.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NewDto} from "../../../../dto/new-dto";
import {UserService} from "../../../../services/user.service";

@Component({
    selector: 'create-new-popup',
    templateUrl: 'create-new-popup.html',
    styleUrls: ['create-new-popup.css']
})
export class CreateNewPopup {

    public new: NewDto = new NewDto(null, null, null, null, null);

    constructor(
        public dialogRef: MatDialogRef<CreateNewPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private newsService: NewsService,
        private userService: UserService,
        private shared: SharedService) {
    }

    public closePopup(): void {
        this.dialogRef.close();
    }

    public createNew(): void {
        this.new.user = this.userService.getLoggedUser().username;
        this.newsService.save(this.new).subscribe(() => {
            this.closePopup();
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public isAllowedCreation(): boolean {
        return !this.shared.isBlank(this.new.text) && !this.shared.isBlank(this.new.title);
    }
}
