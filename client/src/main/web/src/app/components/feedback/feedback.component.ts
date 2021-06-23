import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {SharedService} from '../../services/shared.service';
import {FeedbackService} from "../../services/feedback.service";
import {FeedbackDto} from "../../dto/feedback-dto";

@Component({
    selector: 'feedback',
    templateUrl: './feedback.component.html',
    styleUrls: [
        './feedback.component.css'
    ]
})

export class FeedbackComponent implements OnInit {

    public feedbacks: FeedbackDto[] = [];
    public feedback = new FeedbackDto(null, null, null, null);

    constructor(public userService: UserService,
                private feedbackService: FeedbackService,
                public shared: SharedService) {
    }

    ngOnInit(): void {
        this.loadFeedbacks();
    }

    private loadFeedbacks(): void {
        this.feedbackService.getAll().subscribe(data => {
            this.feedbacks = data.feedbacks;
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public isEmptyFeedbackList(): boolean {
        return this.feedbacks.length === 0;
    }

    public deleteFeedback(id: string): void {
        this.feedbackService.deleteById(id).subscribe(result => {
            this.loadFeedbacks();
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public send(): void {
        this.feedbackService.save(this.feedback).subscribe(result => {
            this.shared.openSnackBar('Сообщение успешно отправлено!');
            this.feedback = new FeedbackDto(null, null, null, null);
        }, error => {
            if (error.status === 403 || error.status === 401) {
                this.shared.openSnackBar('Недостаточно прав для совершения этого действия');
            } else {
                this.shared.openSnackBar(error.error.message);
            }
        });
    }

    public isValid(): boolean {
        return !this.shared.isBlank(this.feedback.text) && !this.shared.isBlank(this.feedback.contactData) &&
            !this.shared.isBlank(this.feedback.userName);
    }
}
