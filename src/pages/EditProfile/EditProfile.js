import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import { useState, useRef, useEffect } from 'react';
import Button from '~/components/Button';
import { ArrowRightIcon, TimesIcon, UploadIcon } from '~/components/Icons';
import RecommendAccountFollow from './containers/RecommendAccountFollow/RecommendAccountFollow';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import { fetchGetUserInfo } from '~/modules/user/auth/authSlice';
import { authService } from '~/services';
import { useNavigate } from 'react-router-dom';
import { Progress, Spin } from 'antd';
import LoadingCustomize from '~/components/LoadingCustomize';
import images from '~/assets/images';
import Axios from 'axios';
import Modal from '~/components/Modal';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function EditProfile() {
    const initialValue = {
        email: '',
        phoneNumber: '',
        avatar: '',
        fullName: '',
        website: '',
    };
    const [formValues, setFormValues] = useState(initialValue);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [formErrors, setFormErrors] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedAvatarImage, setSelectedAvatarImage] = useState();
    const [imageString, setImageString] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);

    const avatarInputFile = useRef();
    const inputUserRef = useRef();
    const websiteInputRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfoDetail = useSelector(userInfoSelector);
    const { userId } = JSON.parse(localStorage.getItem('userInfo'));

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFocus = () => {
        setDisabledBtn(false);
    };

    useEffect(() => {
        if (userId) {
            dispatch(fetchGetUserInfo(userId));
        }
    }, [dispatch, userId]);

    const onChangeAvatarFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event?.target?.files?.item(0);

        setImageString(file);
        setDisabledBtn(false);
    };
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loadingUploadProgress, setLoadingUploadProgress] = useState(false);

    const postImage = async () => {
        const data = new FormData();
        data.append('file', imageString);
        data.append('upload_preset', 'ecommerce');
        data.append('cloud_name', 'dhzbsq7fj');
        setLoadingUploadProgress(true);
        const cloudinaryResponse = await Axios.post('https://api.cloudinary.com/v1_1/dhzbsq7fj/auto/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: function (e) {
                const uploadProgress = (e.loaded / e.total) * 100;
                setUploadProgress(Math.floor(uploadProgress));
            },
        });
        setLoadingUploadProgress(false);
        setSelectedAvatarImage(cloudinaryResponse.data.url);
    };

    useEffect(() => {
        if (imageString !== '') postImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageString]);

    const onEditBackgroundButtonClick = () => {
        avatarInputFile?.current?.click();
    };

    const onSubmitProfile = (e) => {
        if (disabledBtn) {
            e.preventDefault();
        } else {
            e.preventDefault();

            const fetchApi = async () => {
                setLoading(true);
                const data = await authService.updateUserInfo(
                    {
                        ...formValues,
                        avatar: selectedAvatarImage ? selectedAvatarImage : '',
                    },
                    userId,
                );
                setLoading(false);

                if (data.error) {
                    // console.log({data});
                    const errors = {};
                    if (data.error.toLowerCase().startsWith('fullname')) {
                        errors.fullName = data.error;
                    } else if (data.error.toLowerCase().startsWith('email')) {
                        errors.email = data.error;
                    } else if (data.error.toLowerCase().startsWith('website')) {
                        errors.website = data.error;
                    } else {
                        errors.phoneNumber = data.error;
                    }

                    setFormErrors(errors);
                } else {
                    setFormErrors({});
                    navigate('/profile');
                    toast.success('Update profile successfully', {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                        icon: '👻',
                    });
                }
            };

            fetchApi();
        }
    };

    const onBackProfile = () => {
        if (disabledBtn) {
            navigate('/profile');
        } else {
            openModal();
        }
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const openModal = () => {
        setIsOpenModal(true);
    };

    const renderProgressUploadImages = () => {
        return (
            loadingUploadProgress && (
                <Progress type="circle" percent={uploadProgress} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
            )
        );
    };

    const renderEditProfile = () => {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('edit-profile')}>
                    <Modal isOpen={isOpenModal} onRequestClose={closeModal}>
                        <div style={{ padding: '26px' }}>
                            <div className="d-flex justify-content-between">
                                <span style={{ fontWeight: '700', fontSize: '24px' }}>Are you sure to leave?</span>
                                <span className={cx('times-icon')} onClick={closeModal}>
                                    <TimesIcon />
                                </span>
                            </div>
                            <div className="py-8" styles={{ color: '#58667e' }}>
                                Your content has not been saved yet! It will be lost if you leave this page.
                            </div>
                            <div className="d-flex flex-row-reverse mt-16">
                                <Button primary onClick={closeModal}>
                                    Stay
                                </Button>
                                <Button onClick={() => navigate('/profile')}>Leave</Button>
                            </div>
                        </div>
                    </Modal>
                    <div className="d-flex  align-items-center">
                        <span className={cx('back-profile')} onClick={onBackProfile}>
                            <ArrowRightIcon />
                        </span>
                        <p className={cx('edit-profile-title')}>Edit My Profile</p>
                    </div>
                    {loading && (
                        <LoadingCustomize>
                            <Spin></Spin>
                        </LoadingCustomize>
                    )}

                    <div className={cx('edit-profile-avatar')}>
                        <span>Your avatar</span>
                        {renderProgressUploadImages()}
                        {!loadingUploadProgress && (
                            <img
                                src={selectedAvatarImage || userInfoDetail.avatar || images.userAvatar}
                                alt={cx('edit-profile-avatar')}
                            />
                        )}
                        <span className={cx('upload-avatar-btn')}>
                            <UploadIcon className={cx('upload-icon')} />
                            <Button primary onClick={onEditBackgroundButtonClick} className={cx('upload-text')}>
                                Upload
                                <input
                                    type="file"
                                    id="file"
                                    ref={avatarInputFile}
                                    accept="image/*"
                                    onChange={onChangeAvatarFile}
                                    style={{ display: 'none' }}
                                />
                            </Button>
                        </span>
                    </div>
                    <form onSubmit={onSubmitProfile}>
                        <div className={cx('edit-profile-control')}>
                            <label>Full name</label>
                            <input
                                defaultValue={userInfoDetail.fullName}
                                ref={inputUserRef}
                                type="text"
                                name="fullName"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Enter your full name"
                            />
                            <p className={cx('error-message')}>{formErrors?.fullName}</p>
                        </div>
                        <div className={cx('edit-profile-control')}>
                            <label>Email</label>
                            <input
                                defaultValue={userInfoDetail.email}
                                ref={inputUserRef}
                                type="text"
                                name="email"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Eg. levanthuan@gmail.com"
                            />
                            <p className={cx('error-message')}>{formErrors?.email}</p>
                        </div>
                        <div className={cx('edit-profile-control')}>
                            <label>Phone Number</label>
                            <input
                                defaultValue={userInfoDetail.phoneNumber}
                                ref={inputUserRef}
                                type="number"
                                name="phoneNumber"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Eg. 0967933259"
                            />
                            <p className={cx('error-message')}>{formErrors?.phoneNumber}</p>
                        </div>
                        <div className={cx('edit-profile-control')}>
                            <label>Website</label>
                            <input
                                defaultValue={userInfoDetail.website}
                                ref={websiteInputRef}
                                type="text"
                                name="website"
                                onChange={handleChange}
                                onFocus={handleFocus}
                                placeholder="Enter your website"
                            />
                            <p className={cx('error-message')}>{formErrors?.website}</p>
                        </div>

                        <div className={cx('edit-profile-submit')}>
                            <Button primary disabled={disabledBtn}>
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="d-flex justify-content-between">
            {renderEditProfile()}
            {/* <RecommendAccountFollow /> */}
        </div>
    );
}

export default EditProfile;
