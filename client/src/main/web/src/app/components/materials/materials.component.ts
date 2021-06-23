import {Component, OnInit} from '@angular/core';
import {MaterialsService} from '../../services/materials.service';
import {FolderDto} from '../../dto/folder-dto';
import {CreateFolderPopup} from './popup/folders/create-rename/create-folder-popup';
import {DeleteFolderPopup} from './popup/folders/delete/delete-folder-popup';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
    selector: 'app-download',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

    public folders: FolderDto[] = [];

    constructor(public dialog: MatDialog,
                public userService: UserService,
                private materialsService: MaterialsService,
                private router: Router,
                private shared: SharedService) {
    }

    ngOnInit(): void {
        this.loadFolders();
    }

    private loadFolders(): void {
        this.materialsService.getAll().subscribe(data => {
            this.folders = data.folders;
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия или просмотра контента');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public gotoFolder(folderId: string): void {
        this.router.navigate(['folder/' + folderId]);
    }

    public openCreateFolderPopup(isRename: boolean, folderId: string, folderName: string): void {
        const dialogRef = this.dialog.open(CreateFolderPopup, {
            data: {isRename: isRename, folderId: folderId, folderName: folderName}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadFolders();
        });
    }

    public isEmptyFolderList(): boolean {
        return this.folders.length === 0;
    }

    public openDeleteFolderPopup(folderId: string): void {
        const dialogRef = this.dialog.open(DeleteFolderPopup, {
            data: {folderId: folderId}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadFolders();
        });
    }
}
