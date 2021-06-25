import {Component, OnInit} from '@angular/core';
import {UserDto} from '../../dto/user-dto';
import {UserService} from '../../services/user.service';
import {SharedService} from '../../services/shared.service';
import {ImageUtil} from '../../util/image.util';

@Component({
    selector: 'home',
    templateUrl: './portfolio.component.html',
    styleUrls: [
        './portfolio.component.css'
    ]
})

export class PortfolioComponent implements OnInit {

    public currentUser: UserDto = new UserDto(null, null, null, null, null, null, null, null, null);
    public currentUserImageSrc: string;
    public files: any;

    constructor(private shared: SharedService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.loadCurrentUser();
    }

    private loadCurrentUser(): void {
        const portfolioUserId = '1';
        this.userService.getById(portfolioUserId).subscribe(data => {
            this.currentUser = data;
            if (this.currentUser.photoFile !== null && this.currentUser.photoFileExtension !== null) {
                this.currentUserImageSrc = ImageUtil.getImageUrl(this.currentUser.photoFile, this.currentUser.photoFileExtension);
            }
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }
}
