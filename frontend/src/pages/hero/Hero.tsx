/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { service } from '../../service/service';
import './hero.css';
import Loading from '../../components/loading/Loading';
import Modal from '../../components/modal/Modal';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import EditHero from '../../components/editHero/EditHero';

interface Hero {
    id_hero: number,
    name_hero: string,
    name_ability: string
}

interface Ability {
    id_ability: number,
    nameAbility: string
}

export default function Hero() {
    const [data, setData] = useState<Hero[]>([]);
    const [abilities, setAbilities] = useState<Ability[]>([]);
    const [nameHero, setNameHero] = useState('');
    const [fkAbility, setFkAbility] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [idHero, setIdHero] = useState<number>(0);

    const loadHeroes = async () => {
        try {
            setIsLoading(true);
            const result = await service.getHeroAbility();
            setData(result);
        } catch (error) {
            console.log(error);
            setModalMessage('Error fetching heroes');
            setIsSuccess(false);
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadHeroes();
        async function getAbilities() {
            try {
                setIsLoading(true);
                const result = await service.getAbility();
                setAbilities(result);
            } catch (error) {
                console.log(error);
                setModalMessage('Error fetching abilities');
                setIsSuccess(false);
                setIsModalOpen(true);
            } finally {
                setIsLoading(false);
            }
        }

        getAbilities();
    }, []);

    const handleDelete = async (id_hero: number) => {
        try {
            setIsLoading(true);
            await service.deleteHero(id_hero);
            setModalMessage('Hero successfully deleted!');
            setIsSuccess(true);

            loadHeroes();
        } catch (error: any) {
            console.log(error);

            if (error.response && error.response.data) {
                setModalMessage(error.response.data);
            } else {
                setModalMessage('Failed to delete hero. Please try again.');
            }
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
            setIsModalOpen(true);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (abilities.length === 0) {
            setModalMessage('No abilities available. Please create an ability before registering a hero.');
            setIsSuccess(false);
            setIsModalOpen(true);
            return;
        }

        try {
            setIsLoading(true);
            await service.createHero(nameHero, fkAbility);
            setModalMessage('Hero successfully added!');
            setIsSuccess(true);

            loadHeroes();
            setNameHero('');
            setFkAbility(0);
        } catch (error: any) {
            console.log(error);

            if (error.response) {
                if (error.response.status === 409) {
                    setModalMessage('Hero already exists.');
                } else {
                    setModalMessage('Failed to add hero. Please try again.');
                }
            } else {
                setModalMessage('Network error. Please try again.');
            }

            setIsSuccess(false);
        } finally {
            setIsLoading(false);
            setIsModalOpen(true);
        }
    };

    const handleEdit = (idHero: number) => {
        setIdHero(idHero);
        setIsEditOpen(true);
    };

    const closeEditModal = async () => {
        setIsEditOpen(false);
        await loadHeroes();
    };

    return (
        <div className="containerHero">
            {isEditOpen && (
                <EditHero idHero={idHero} close={closeEditModal} />
            )}
            {isModalOpen && (
                <Modal
                    close={() => setIsModalOpen(false)}
                    message={modalMessage}
                    isSuccess={isSuccess}
                />
            )}

            {abilities.length === 0 ? (
                <p>No abilities available. Please create an ability before registering a hero.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1>Register Hero</h1>
                    <div className='registerHero'>
                        <label>Hero Name:</label>
                        <input
                            type="text"
                            value={nameHero}
                            onChange={(e) => {
                                const regex = /^[a-zA-Z\s]*$/;
                                if (regex.test(e.target.value)) {
                                    setNameHero(e.target.value);
                                }
                            }}
                            required
                        />
                        <label>Ability:</label>
                        <select
                            value={fkAbility}
                            onChange={(e) => setFkAbility(Number(e.target.value))}
                            required
                            disabled={abilities.length === 0}
                        >
                            <option value="">Select an ability</option>
                            {abilities.map((ability) => (
                                <option key={ability.id_ability} value={ability.id_ability}>
                                    {ability.nameAbility}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" disabled={isLoading || abilities.length === 0}>Register Hero</button>
                </form>
            )}

            <h1>Hero Available</h1>

            {isLoading ? (
                <Loading />
            ) : (
                data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Hero</th>
                                <th>Ability</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name_hero}</td>
                                    <td>{item.name_ability}</td>
                                    <td>
                                        <div className='actions'>
                                            <FaPenToSquare onClick={() => handleEdit(item.id_hero)} className="edit-icon" size={24} />
                                            <FaTrash onClick={() => handleDelete(item.id_hero)} className="delete-icon" size={24} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No heroes available</p>
                )
            )}
        </div>
    );
}
