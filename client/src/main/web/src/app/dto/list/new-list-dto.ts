import {NewDto} from '../new-dto';

export class NewsListDto {

    private _news: NewDto[] = [];

    constructor(news: NewDto[]) {
        this._news = news;
    }

    get news(): NewDto[] {
        return this._news;
    }

    set news(value: NewDto[]) {
        this._news = value;
    }

}
