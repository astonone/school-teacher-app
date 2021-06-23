import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MaterialsService} from '../../services/materials.service';
import {FileDto} from '../../dto/file-dto';
import {UploadPopup} from './popup/upload/upload-popup';
import {DeleteFilePopup} from './popup/delete/delete-file-popup';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {FolderDto} from "../../dto/folder-dto";

@Component({
    selector: 'app-download',
    templateUrl: './folder.component.html',
    styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

    public files: FileDto[] = [];
    private folder: FolderDto = new FolderDto(null, null, []);
    private folderId: string;

    constructor(public dialog: MatDialog,
                private materialsService: MaterialsService,
                private shared: SharedService,
                private router: Router,
                private route: ActivatedRoute,
                public userService: UserService) {
    }

    ngOnInit(): void {
        this.folderId = this.route.snapshot.paramMap.get('id');
        this.loadFolder(this.folderId);
    }

    private loadFolder(folderId: string): void {
        this.materialsService.getById(folderId).subscribe(data => {
            this.folder = data;
            this.files = data.files;
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия или просмотра контента');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public uploadFileToFolder(): void {
        const dialogRef = this.dialog.open(UploadPopup, {
            data: {folder: this.folder}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadFolder(this.folderId);
        });
    }

    public deleteFileFromFolder(fileId: string): void {
        const dialogRef = this.dialog.open(DeleteFilePopup, {
            data: {folder: this.folder, fileId: fileId}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadFolder(this.folderId);
        });
    }

    public isEmptyFilesList(): boolean {
        return this.files === null || this.files.length === 0;
    }

    public onClickDownload(element: FileDto) {
        let base64String = element.file;
        this.downloadFile(base64String, element.filename, element.fileExtension);
    }

    private downloadFile(base64String: string, fileName: string, fileExtension: string) {
        const source = `data:application/${fileExtension};base64,${base64String}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}`
        link.click();
    }

}
