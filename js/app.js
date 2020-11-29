const ANDROID_VIDEO_ID = 'i-8q7lJ_OO8';
const IOS_VIDEO_ID = 'HThe1aSGOO8';

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

$(function(){
    let videoUrl = 'https://www.youtube.com/embed/';
    const os = getMobileOperatingSystem();
    if (os === 'iOS') {
        videoUrl += IOS_VIDEO_ID;
    } else {
        videoUrl += ANDROID_VIDEO_ID;
    }

    videoUrl += '?rel=0';
    $("#guide-url")
        .attr("src", videoUrl)
        .removeClass('d-none');
});