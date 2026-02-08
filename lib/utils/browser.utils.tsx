export default class BrowserUtils {
    //Check if the user is on a mobile device based on the user agent string
    static isMobileUserAgent() {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    }
}