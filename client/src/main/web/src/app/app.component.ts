import {Component, ElementRef, Inject} from '@angular/core';
import {SharedService} from './services/shared.service';
import {Router} from '@angular/router';
import {LoginPopup} from './components/home/popup/login/login-popup';
import {DOCUMENT} from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "./services/user.service";
import {UserDto} from "./dto/user-dto";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.css'
    ]
})

export class AppComponent {

    constructor(public shared: SharedService,
                public userService: UserService,
                private router: Router,
                private dialog: MatDialog,
                @Inject(DOCUMENT) document: ElementRef) {
        this.applyTheme();
    }

    private applyTheme() {
        if (localStorage.getItem('theme') === null) {
            this.onSetTheme('indigo-pink');
        } else {
            this.shared.getThemeAndApply();
        }
    }

    public onSetTheme(theme: string) {
        const themeElement: any = document.getElementById('themeAsset');
        themeElement.href = '/assets/theme/' + theme + '.css';
        this.shared.setTheme(theme);
    }

    public toggleSidenav(sidenav: any) {
        if (this.shared.isMobile()) {
            sidenav.toggle();
        }
    }

    public openLoginPopup(): void {
        const dialogRef = this.dialog.open(LoginPopup, {});
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    public showUserInfo() {
        let user = this.userService.getLoggedUser();
        return user.firstName + ' ' + user.lastName;
    }

    public logout() {
        this.userService.setUserToken('');
        this.userService.setLoggedUser(new UserDto(null, null, null, null, null, null, null, null, null));
        this.router.navigate(['/home']);
    }
}
