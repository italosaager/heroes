import Load from 'react-loading';
import './loading.css';

export default function Loading() {
    return (
        <div className='loading'>
            <Load type='spin' color='#1351b4' height={100} width={100} />
        </div>
    )
}