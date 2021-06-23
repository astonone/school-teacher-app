import {FeedbackDto} from '../feedback-dto';

export class FeedbackListDto {

    private _feedbacks: FeedbackDto[] = [];

    constructor(feedbacks: FeedbackDto[]) {
        this._feedbacks = feedbacks;
    }

    get feedbacks(): FeedbackDto[] {
        return this._feedbacks;
    }

    set feedbacks(value: FeedbackDto[]) {
        this._feedbacks = value;
    }

}