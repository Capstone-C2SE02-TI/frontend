
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './NavLeft.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import { faHouse, faMagnifyingGlass, faChartSimple, faFlag, faCaretDown, faQuestion} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { subnavDiscover } from './NavLeftData';

const cx = classNames.bind(styles);



function NavLeft() {

    return (
        <section className={cx('colLeft')}>
            <div className={cx('logoImg')}>
                <Image className={cx('logoSvg')} src={images.logoSvg} alt="logo" />
            </div>
            <nav className={cx('listMenu')}>
                <ul>
                    <li className={cx('listItem')}>
                        <Link to="">
                            <div className={cx('iconBox')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faHouse} />
                                <span>Home page</span>
                            </div>
                        </Link>
                    </li>
                    <li className={cx('listItem')}>
                        <Link to="">
                            <div className={cx('iconBox')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                                <span>Discover</span>
                            </div>
                            <FontAwesomeIcon className={cx('iconDropdown')} icon={faCaretDown} />
                        </Link>

                    </li>
                    <li className={cx('listItem')}>  
                        <Link to="">
                            <div className={cx('iconBox')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faChartSimple} />
                                <span>Analyze</span>
                            </div>
                            <FontAwesomeIcon className={cx('iconDropdown')} icon={faCaretDown} />
                        </Link>
                    </li> 
                    <li className={cx('listItem')}>  
                        <Link to="">
                            <div className={cx('iconBox')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faQuestion} />
                                <span>Support</span>
                            </div>
                            <FontAwesomeIcon className={cx('iconDropdown')} icon={faCaretDown} />
                        </Link>
                    </li>      
                    <li className={cx('listItem')}>
                        <Link to="">
                            <div className={cx('iconBox')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faFlag} />
                                <span>Report</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default NavLeft;