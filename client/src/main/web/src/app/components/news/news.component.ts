import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';
import {NewDto} from '../../dto/new-dto';
import {NewsService} from '../../services/news.service';
import {DeleteNewPopup} from './popup/delete/delete-new-popup';
import {CreateNewPopup} from './popup/create/create-new-popup';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'news',
    templateUrl: './news.component.html',
    styleUrls: [
        './news.component.css'
    ]
})

export class NewsComponent implements OnInit {

    public news: NewDto[] = [];

    constructor(public dialog: MatDialog,
                private router: Router,
                public userService: UserService,
                public shared: SharedService,
                private newsService: NewsService) {
    }

    ngOnInit(): void {
        this.loadNews();
    }

    private loadNews(): void {
        this.newsService.getAll().subscribe(data => {
            this.news = data.news;
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия или просмотра контента');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public isEmptyNewsList(): boolean {
        return this.news.length === 0;
    }

    public deleteNew(id: number): void {
        const dialogRef = this.dialog.open(DeleteNewPopup, {
            data: {newId: id}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.loadNews();
        });
    }

    public createNew(): void {
        const dialogRef = this.dialog.open(CreateNewPopup, {});
        dialogRef.afterClosed().subscribe(result => {
            this.loadNews();
        });
    }
}
