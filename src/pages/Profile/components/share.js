import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../Profile.module.scss';

const cx = classNames.bind(styles);

const Share = () => {
    const initFacebookSDK = () => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
        let locale = "vi_VN";
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "",// You App ID
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: "v2.5" // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            console.log(s);
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    };
    useEffect(() => {
        initFacebookSDK();
    }, []);
    return (
        <div className={cx('fb-share-button')} data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="">
            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fprofile&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Chia sẻ</a>
        </div>
    );
}

export default Share;
