import robot from '../../assets/notfound.png';
import './notfound.css';

export default function Notfound() {
    return (
        <div className='notfound'>
            <h1>Not Found!</h1>
            <img src={robot} width={200} />
        </div>
    )
}