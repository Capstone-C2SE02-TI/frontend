import { useEffect, useState } from 'react';
import millify from 'millify';
import classNames from 'classnames/bind';
import styles from './Analyze.module.scss';
import { Row, Col, Slider } from 'antd';
import SharkWalletsOverview from './containers/SharkWalletsOverview';
import SharkWalletsDetail from './containers/SharkWalletsDetail';
import { useDispatch, useSelector } from 'react-redux';
import sharkWalletSlice, { fetchAddNewShark, resetSharkDetail } from '~/modules/SharkWallet/sharkWalletSlice';
import { newSharkSelector, sharkDetailSelector } from '~/modules/SharkWallet/selector';
import ModalNotify from '~/components/ModalNotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import { transactionSharkService } from '~/services';

const DOLLAR = 10000000;

const cx = classNames.bind(styles);
function Analyze() {
    const [rangeStart, setRangeStart] = useState(0);
    const [rangeEnd, setRangeEnd] = useState(100 * DOLLAR);
    const [openModalSucceed, setOpenModalSucceed] = useState(false);
    const [openModalError, setOpenModalError] = useState(false);
    const [modalSucceedContent, setModalSucceedContent] = useState('');
    const [sharkAddressText, setSharkAddressText] = useState('');
    const [totalTransaction, setTotalTransaction] = useState('');
    const [totalUser, setTotalUser] = useState('');
    const [totalShark, setShark] = useState('');
    const userInfoDetail = useSelector(userInfoSelector);

    const dispatch = useDispatch();

    const onChange = (value) => {
        setRangeStart(value[0] * DOLLAR);
        setRangeEnd(value[1] * DOLLAR);
    };
    const dataFollow = useSelector(sharkDetailSelector);

    useEffect(() => {
        getMarquee();
        dispatch(
            sharkWalletSlice.actions.actionFilterSharkTotalAssets({
                startTotalAssets: rangeStart,
                endTotalAssets: rangeEnd,
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAfterChange = (value) => {
        dispatch(
            sharkWalletSlice.actions.actionFilterSharkTotalAssets({
                startTotalAssets: value[0] * DOLLAR,
                endTotalAssets: value[1] * DOLLAR,
            }),
        );
    };

    const newSharkStatus = useSelector(newSharkSelector);


    useEffect(() => {
        if (newSharkStatus.error) {
            setOpenModalError(true);
            setModalSucceedContent({ title: 'Error', description: 'Add new shark failed' });
            dispatch(resetSharkDetail(''));
        } else if (newSharkStatus.newShark) {
            setOpenModalSucceed(true);
            setModalSucceedContent({ title: 'Success', description: 'Add new shark successfully' });
            dispatch(resetSharkDetail(''));
        }
    }, [newSharkStatus]);

    const formatter = (value) => `$ ${millify(value * DOLLAR)}`;

    const handleSubmitAddNewShark = (e) => {
        e.preventDefault();
        dispatch(fetchAddNewShark({ walletAddress: sharkAddressText, userId: userInfoDetail.userId }));
        setSharkAddressText('')
    };

    const getMarquee = () => {
        const fetchApi = async () => {
            const totalTransaction = await transactionSharkService.getTotalTransaction();
            const totalUser = await transactionSharkService.getTotalUser();
            const totalShark = await transactionSharkService.getTotalShark();
            setTotalTransaction(totalTransaction.data)
            setTotalUser(totalUser.data)
            setShark(totalShark.data)
        };
        fetchApi();
    }

    const renderFilterRange = () => {
        return (
            <div className={cx('common-filter-range')}>
                <div className={cx('shark-range-filter')}>
                    <div className="d-flex justify-content-between align-items-center">
                        <p style={{ fontSize: '20px' }}>Add a new shark</p>
                        <form className={cx('form')} onSubmit={handleSubmitAddNewShark}>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                                </svg>
                            </button>
                            <input
                                className={cx('input')}
                                placeholder="Add to shark..."
                                required
                                type="text"
                                value={sharkAddressText}
                                onChange={(e) => setSharkAddressText(e.target.value)}
                            />
                            <button className={cx('reset')} type="reset">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="d-flex justify-content-between mb-8">
                        <div className={cx('shark-filter-range-container')}>
                            <p className={cx('range-price')}>
                                Filter range shark: $
                                {millify((rangeStart + rangeEnd) / 2, {
                                    precision: 3,
                                })}
                            </p>
                        </div>
                        <div className={cx('shark-filter-range-container')}>
                            <p className={cx('range-start')}>
                                $
                                {millify(rangeStart, {
                                    precision: 3,
                                })}
                            </p>
                            <p className={cx('range-spread')}>-</p>
                            <p className={cx('range-end')}>
                                $
                                {millify(rangeEnd, {
                                    precision: 3,
                                })}
                            </p>
                        </div>
                    </div>
                    <Slider
                        range
                        // step={10}
                        defaultValue={[0, 100]}
                        onChange={onChange}
                        onAfterChange={onAfterChange}
                        tooltip={{ formatter: formatter }}
                    />
                </div>
                <div className={cx('box-content__shark')}>
                    <h2>SHARK WALLET INFORMATION</h2>
                </div>
            </div>
        );
    };

    return (
        <section className={cx('shark-wallet')}>
            <marquee className={cx('Marquee')}>
                <div className={cx("Marquee-tag")}><b>Total of transaction: </b> {" " + totalTransaction}</div>
                <div className={cx("Marquee-tag")}><b>Total investors: </b> {totalUser}</div>
                <div className={cx("Marquee-tag")}><b>Total sharks: </b> {totalShark}</div>
            </marquee>
            <div className={cx('shark-wallet__content')}>
                {renderFilterRange()}
            </div>
            <Row>
                <Col span={8}>
                    <SharkWalletsOverview />
                </Col>
                <Col span={15}>
                    <SharkWalletsDetail />
                </Col>
            </Row>
            {openModalSucceed && (
                <ModalNotify
                    typeSuccess={true}
                    icon={<FontAwesomeIcon icon={faCheck} />}
                    isOpen={openModalSucceed}
                    title={modalSucceedContent.title}
                    description={modalSucceedContent.description}
                    onRequestClose={() => setOpenModalSucceed(false)}
                />
            )}
            {openModalError && (
                <ModalNotify
                    typeError={true}
                    icon={<FontAwesomeIcon icon={faCircleExclamation} />}
                    isOpen={openModalError}
                    title={modalSucceedContent.title}
                    description={modalSucceedContent.description}
                    onRequestClose={() => setOpenModalError(false)}
                    type="error"
                />
            )}
        </section>
    );
}

export default Analyze;
