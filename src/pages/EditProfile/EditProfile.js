import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import { useState, useRef, useEffect } from 'react';
import Button from '~/components/Button';
import { ArrowLeftIcon, ArrowRightIcon, UploadIcon } from '~/components/Icons';
import RecommendAccountFollow from './containers/RecommendAccountFollow/RecommendAccountFollow';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from '~/modules/user/auth/selectors';
import { fetchGetUserInfo } from '~/modules/user/auth/authSlice';
import { authService } from '~/services';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import LoadingCustomize from '~/components/LoadingCustomize';

const cx = classNames.bind(styles);

function EditProfile() {
    const initialValue = {
        email: '',
        phoneNumber: '',
        avatar: '',
        username: '',
        website: '',
    };
    const [formValues, setFormValues] = useState(initialValue);

    const [formErrors, setFormErrors] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedAvatarImage, setSelectedAvatarImage] = useState();

    const avatarInputFile = useRef();
    const inputUserRef = useRef();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userInfoDetail = useSelector(userInfoSelector);
    const { userId } = JSON.parse(localStorage.getItem('userInfo'));

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        if (userId) {
            dispatch(fetchGetUserInfo(userId));
        }
    }, [dispatch, userId]);

    // Get the instance of the FileReader
    const reader = new FileReader();
    const onChangeAvatarFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event?.target?.files?.item(0);

        reader.readAsDataURL(file);

        // Once loaded, do something with the string
        reader.addEventListener('load', (event) => {
            setSelectedAvatarImage(event.target?.result);
        });
    };

    const onEditBackgroundButtonClick = () => {
        avatarInputFile?.current?.click();
    };

    const onSubmitProfile = (e) => {
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
                const errors = {};
                if (data.error.toLowerCase().startsWith('user')) {
                    errors.username = data.error;
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
            }
        };

        fetchApi();
    };

    const renderEditProfile = () => {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('edit-profile')}>
                    <div className="d-flex  align-items-center">
                        <span className={cx('back-profile')} onClick={() => navigate('/profile')}>
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
                        <img src={selectedAvatarImage || userInfoDetail.avatar} alt={cx('edit-profile-avatar')} />
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
                            <label>User Name</label>
                            <input
                                defaultValue={userInfoDetail.username}
                                ref={inputUserRef}
                                type="text"
                                name="username"
                                onChange={handleChange}
                            />
                            <p className={cx('error-message')}>{formErrors?.username}</p>
                        </div>
                        <div className={cx('edit-profile-control')}>
                            <label>Email</label>
                            <input
                                defaultValue={userInfoDetail.email}
                                ref={inputUserRef}
                                type="text"
                                name="email"
                                onChange={handleChange}
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
                                placeholder="Eg. 0967933259"
                            />
                            <p className={cx('error-message')}>{formErrors?.phoneNumber}</p>
                        </div>
                        <div className={cx('edit-profile-control')}>
                            <label>Website</label>
                            <input
                                defaultValue={userInfoDetail.website}
                                ref={inputUserRef}
                                type="text"
                                name="website"
                                onChange={handleChange}
                                placeholder="Enter your website"
                            />
                            <p className={cx('error-message')}>{formErrors?.website}</p>
                        </div>

                        <div className={cx('edit-profile-submit')}>
                            <Button primary>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="d-flex justify-content-between">
            {renderEditProfile()}
            <RecommendAccountFollow />
        </div>
    );
}

export default EditProfile;
