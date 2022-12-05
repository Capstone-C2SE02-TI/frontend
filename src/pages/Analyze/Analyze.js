import { useEffect, useState } from 'react';
import millify from 'millify';
import classNames from 'classnames/bind';
import styles from './Analyze.module.scss';
import { Row, Col, Slider } from 'antd';
import SharkWalletsOverview from './containers/SharkWalletsOverview';
import SharkWalletsDetail from './containers/SharkWalletsDetail';
import { useDispatch, useSelector } from 'react-redux';
import sharkWalletSlice, { fetchAddNewShark } from '~/modules/SharkWallet/sharkWalletSlice';
import { sharkDetailSelector } from '~/modules/SharkWallet/selector';
import ModalNotify from '~/components/ModalNotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const DOLLAR = 10000000;

const cx = classNames.bind(styles);
function Analyze() {
    const [rangeStart, setRangeStart] = useState(0);
    const [rangeEnd, setRangeEnd] = useState(100 * DOLLAR);
    const [openModalSucceed, setOpenModalSucceed] = useState(false);
    const [modalSucceedContent, setModalSucceedContent] = useState('');
    const [sharkAddressText, setSharkAddressText] = useState('');

    const dispatch = useDispatch();

    const onChange = (value) => {
        setRangeStart(value[0] * DOLLAR);
        setRangeEnd(value[1] * DOLLAR);
    };
    const dataFollow = useSelector(sharkDetailSelector);

    useEffect(() => {
        if (dataFollow && dataFollow?.isFollowed) {
            setOpenModalSucceed(true);
            setModalSucceedContent({ title: 'Success', description: 'Follow shark successfully' });
        } else if (dataFollow && !dataFollow?.isFollowed) {
            setOpenModalSucceed(true);
            setModalSucceedContent({ title: 'Success', description: 'UnFollow shark successfully' });
        }
    }, [dataFollow]);
    useEffect(() => {
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

    const formatter = (value) => `$ ${millify(value * DOLLAR)}`;
    
    const handleSubmitAddNewShark = (e) => {
        e.preventDefault();
        dispatch(fetchAddNewShark({ walletAddress: sharkAddressText }));
    };

    const renderFilterRange = () => {
        return (
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
        );
    };

    return (
        <section className={cx('shark-wallet')}>
            <div className={cx('shark-wallet__content')}>
                <h2>SHARK WALLETS</h2>
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
                    icon={<FontAwesomeIcon icon={faCheck} />}
                    isOpen={openModalSucceed}
                    title={modalSucceedContent.title}
                    description={modalSucceedContent.description}
                    onRequestClose={() => setOpenModalSucceed(false)}
                />
            )}
        </section>
    );
}

export default Analyze;
