export class ImageUtil {
    public static getImageUrl(imageString: string, extension: string): string {
        switch (extension.toLocaleLowerCase()) {
            case 'png' :
                return 'data:image/png;charset=utf-8;base64,' + imageString;
            case 'jpeg' :
            case 'jpg' :
                return 'data:image/jpg;base64,' + imageString;
            case 'svg' :
                return 'data:image/svg+xml;charset=utf-8;base64,' + imageString;
            default:
                return 'data:image/svg+xml;charset=utf-8;base64,' + imageString;
        }
    }
}