import {Component, Inject} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {MaterialsService} from '../../../../services/materials.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FolderDto} from "../../../../dto/folder-dto";

@Component({
    selector: 'delete-file-popup',
    templateUrl: 'delete-file-popup.html',
    styleUrls: ['delete-file-popup.css']
})
export class DeleteFilePopup {

    public fileId: string;
    private folder: FolderDto;

    constructor(
        public dialogRef: MatDialogRef<DeleteFilePopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private shared: SharedService,
        private materialsService: MaterialsService) {
        this.fileId = data.fileId;
        this.folder = data.folder;
    }

    public closePopup(): void {
        this.dialogRef.close();
    }

    public deleteFile(): void {
        this.materialsService.removeFileById(this.folder, this.fileId).subscribe(data => {
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
