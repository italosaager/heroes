import { Routes, Route } from 'react-router-dom';
import Hero from '../pages/hero/Hero';
import Notfound from '../pages/notfound/Notfound';
import Ability from '../pages/ability/Ability';

export default function RoutesComponent() {
    return (
        <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/ability' element={<Ability />} />
            <Route path='*' element={<Notfound />} />
        </Routes>
    )
}