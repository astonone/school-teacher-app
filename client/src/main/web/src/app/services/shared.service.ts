import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private snackBar: MatSnackBar) {
    }

    public openSnackBar(snackBarText: string): void {
        this.snackBar.open(snackBarText, 'End now', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    public isBlank(str: string) {
        return (!str || /^\s*$/.test(str));
    }

    public isMobile = () => screen.width < 1000;

    public setTheme(theme: string) {
        localStorage.setItem('theme', theme);
    }

    public getThemeAndApply() {
        const theme = localStorage.getItem('theme');
        const themeElement: any = document.getElementById('themeAsset');
        themeElement.href = '/assets/theme/' + theme + '.css';
    }

    public isSelected(theme: string) {
        const themeElement: any = document.getElementById('themeAsset');
        return themeElement.href.toString().includes(theme);
    }

}
