import {Component, Inject} from '@angular/core';
import {SharedService} from '../../../../../services/shared.service';
import {MaterialsService} from '../../../../../services/materials.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'delete-folder-popup',
    templateUrl: 'delete-folder-popup.html',
    styleUrls: ['delete-folder-popup.css']
})
export class DeleteFolderPopup {

    public folderId: string;

    constructor(
        public dialogRef: MatDialogRef<DeleteFolderPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private shared: SharedService,
        private materialsService: MaterialsService) {
        this.folderId = data.folderId;
    }

    public closePopup(): void {
        this.dialogRef.close();
    }

    public deleteFolder(): void {
        this.materialsService.deleteById(this.folderId).subscribe(data => {
            this.closePopup();
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия или просмотра контента');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }
}
