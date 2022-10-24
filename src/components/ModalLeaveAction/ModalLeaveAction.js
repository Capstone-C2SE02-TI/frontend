import { useState } from "react";
import Modal from "../Modal/Modal";
import { TimesIcon } from '~/components/Icons';
import Button from './../Button/Button';
import { useNavigate } from 'react-router-dom';

function ModalLeaveAction() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const navigate = useNavigate();

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const openModal = () => {
        setIsOpenModal(true);
    };

    return (
        <Modal isOpen={isOpenModal} onRequestClose={closeModal}>
            <div style={{ padding: '26px' }}>
                <div className="d-flex justify-content-between">
                    <span style={{ fontWeight: '700', fontSize: '24px' }}>Are you sure to leave?</span>
                    <span  onClick={closeModal}>
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
    );
}

export default ModalLeaveAction;