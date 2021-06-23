import {Component, Inject} from '@angular/core';
import {NewsService} from '../../../../services/news.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SharedService} from "../../../../services/shared.service";

@Component({
    selector: 'delete-new-popup',
    templateUrl: 'delete-new-popup.html',
    styleUrls: ['delete-new-popup.css']
})
export class DeleteNewPopup {

    public newId: number;

    constructor(
        public dialogRef: MatDialogRef<DeleteNewPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private newsService: NewsService,
        private shared: SharedService) {
        this.newId = data.newId;
    }

    public closePopup(): void {
        this.dialogRef.close();
    }

    public deleteNew(): void {
        this.newsService.deleteById(this.newId).subscribe(() => {
            this.closePopup();
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }
}
