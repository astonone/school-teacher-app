import {Component, Inject} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MaterialsService} from "../../../../services/materials.service";
import {FolderDto} from "../../../../dto/folder-dto";
import {FileDto} from "../../../../dto/file-dto";

@Component({
    selector: 'login-popup',
    templateUrl: 'upload-popup.html',
    styleUrls: ['upload-popup.css']
})
export class UploadPopup {

    private folder: FolderDto;
    public files: any;

    constructor(
        public dialogRef: MatDialogRef<UploadPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private shared: SharedService,
        private materialsService: MaterialsService) {
        this.folder = data.folder;
    }

    public selectFile(event: any): void {
        this.files = null;
        let target = event.target || event.srcElement;
        this.files = target.files;
    }

    public upload(): void {
        this.materialsService.addFile(this.folder,
            new FileDto(null, null, null, null, null), this.files).subscribe(data => {
            this.shared.openSnackBar('Файл загружен успешно!');
            this.closePopup();
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия или просмотра контента');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public closePopup(): void {
        this.dialogRef.close();
    }

}
