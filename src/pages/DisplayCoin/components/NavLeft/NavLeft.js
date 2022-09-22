
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './NavLeft.module.scss';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import { faHouse, faMagnifyingGlass, faChartSimple, faFlag, faCaretDown, faQuestion } from '@fortawesome/free-solid-svg-icons';
import ItemSubNav from './ItemSubNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { subnavDiscover } from './NavLeftData';

const cx = classNames.bind(styles);

const listItem = [
    {
        title: 'Home page',
        icon: faHouse
    },
    {
        title: 'Discover',
        icon: faMagnifyingGlass,
        iconDropdown: true,
        children: ['Update premium','Market overview','Gain chart','Shark wallet']
    },
    {
        title: 'Analyze',
        icon: faChartSimple,
        iconDropdown: true,
        children: ['Update Ranking projects','Invest with shark']

    },
    {
        title: 'Support',
        icon: faQuestion,
        iconDropdown: true,
        children: ['Guide','Chat with us','Give a feedback']
    },
    {
        title: 'Report',
        icon: faFlag,
    }
]

function NavLeft() {

    return (
        <section className={cx('colLeft')}>
            <div className={cx('logoImg')}>
                <Image className={cx('logoSvg')} src={images.logoSvg} alt="logo" />
            </div>
            <nav className={cx('listMenu')}>
                <ul>
                    {
                        listItem.map((item, index) => {
                            return (
                                <ItemSubNav key={index} item={item} index={index}/>
                            )
                        })
                    }

                </ul>
            </nav>
        </section>
    )
}

export default NavLeft;