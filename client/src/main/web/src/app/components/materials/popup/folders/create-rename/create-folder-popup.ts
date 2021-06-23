import {Component, Inject} from '@angular/core';
import {SharedService} from '../../../../../services/shared.service';
import {MaterialsService} from '../../../../../services/materials.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FolderDto} from "../../../../../dto/folder-dto";

@Component({
    selector: 'create-folder-popup',
    templateUrl: 'create-folder-popup.html',
    styleUrls: ['create-folder-popup.css']
})
export class CreateFolderPopup {

    public isRename: boolean;
    public folderId: string;
    public folder: FolderDto = new FolderDto(null, null, null);

    constructor(
        public dialogRef: MatDialogRef<CreateFolderPopup>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private shared: SharedService,
        private materialsService: MaterialsService) {
        this.folderId = data.folderId;
        this.isRename = data.isRename;
        this.folder.id = this.folderId;
    }

    public closePopup(): void {
        this.dialogRef.close();
    }

    public saveFolder(): void {
        if (this.isAllowToUpdate()) {
            this.materialsService.save(this.folder).subscribe(data => {
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

    public isAllowToUpdate(): boolean {
        return !this.shared.isBlank(this.folder.name);
    }
}
