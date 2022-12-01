import classNames from 'classnames/bind';
import styles from '../../TokenDetail.module.scss';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function MenuTippy({ children, data }) {
  
    const renderResult = (attrs, data) => {
        return (
            <div tabIndex="-1" {...attrs} className={cx('content-tippy')}>
                {data
                    .filter((link) => link)
                    .map((link, i) => {
                        return (
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href={link}
                                className={cx('tippy-item')}
                                key={i}
                            >
                                {link.split('/')[2]}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    height="16px"
                                    width="16px"
                                    viewBox="0 0 24 24"
                                    className="sc-1prm8qw-0 jIzzVN"
                                >
                                    <path
                                        d="M12 11.9998L20 4M20 4H14.1817M20 4L19.9999 9.81802M9.81819 6.90946H5.77777C4.79594 6.90946 4 7.70537 4 8.68718V18.2223C4 19.2041 4.79594 20 5.77778 20H15.3131C16.295 20 17.0909 19.2041 17.0909 18.2223V14.182"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeMiterlimit={10}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>
                        );
                    })}
            </div>
        );
    };

    return (
        <Tippy
            delay={[0, 50]}
            interactive
            placement="bottom-end"
            render={(attrs) => renderResult(attrs, data)}
        >
            {children}
        </Tippy>
    );
}

export default MenuTippy;
