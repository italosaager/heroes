import './modal.css';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';

interface ModalProps {
    close: () => void;
    message: string;
    isSuccess: boolean;
}

export default function Modal({ close, message, isSuccess }: ModalProps) {
    return (
        <div className="containerModal">
            <div className='modalContent'>
                {isSuccess ? <FaCircleCheck size={24} color='green' /> : <FaCircleXmark size={24} color='red' />}
                <p>{message}</p>
                <button onClick={close}>
                    Fechar
                </button>
            </div>
        </div>
    )
}