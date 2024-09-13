/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { service } from '../../service/service';
import Loading from '../../components/loading/Loading';
import './ability.css';
import Modal from '../../components/modal/Modal';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import EditAbility from '../../components/editAbility/EditAbility'; // Importa o componente de edição

interface Ability {
    id_ability: number,
    nameAbility: string
}

export default function Ability() {
    const [data, setData] = useState<Ability[]>([]);
    const [nameAbility, setNameAbility] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editIdAbility, setEditIdAbility] = useState<number | null>(null); // Estado para controlar o modal de edição

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                const result = await service.getAbility();
                setData(result);
            } catch (error) {
                console.log(error);
                setModalMessage('Error fetching abilities');
                setIsSuccess(false);
                setIsModalOpen(true);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            await service.createAbility(nameAbility);
            setModalMessage('Ability successfully added!');
            setIsSuccess(true);
            setIsModalOpen(true);
            const result = await service.getAbility();
            setData(result);
            setNameAbility('');
        } catch (error: any) {
            console.log(error);

            if (error.response && error.response.data) {
                setModalMessage(error.response.data);
            } else {
                setModalMessage('Failed to add ability. Please try again.');
            }
            setIsSuccess(false);
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id_ability: number) => {
        try {
            setIsLoading(true);
            await service.deleteAbility(id_ability);
            setModalMessage('Ability successfully deleted!');
            setIsSuccess(true);

            const result = await service.getAbility();
            setData(result);
        } catch (error: any) {
            console.log(error);

            if (error.response && error.response.data) {
                setModalMessage(error.response.data);
            } else {
                setModalMessage('Failed to delete ability. Please try again.');
            }
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
            setIsModalOpen(true);
        }
    };

    const handleEdit = (id_ability: number) => {
        setEditIdAbility(id_ability);
        setIsEditOpen(true);
    };

    const closeEditModal = async () => {
        setIsEditOpen(false);
        const result = await service.getAbility();
        setData(result);
    };

    return (
        <div className="containerAbility">
            {isModalOpen && (
                <Modal
                    close={() => setIsModalOpen(false)}
                    message={modalMessage}
                    isSuccess={isSuccess}
                />
            )}

            {isEditOpen && editIdAbility !== null && (
                <EditAbility idAbility={editIdAbility} close={closeEditModal} />
            )}

            <form onSubmit={handleSubmit}>
                <h1>Register Ability</h1>
                <div className='registerAbility'>
                    <label>Ability Name:</label>
                    <input
                        type="text"
                        value={nameAbility}
                        onChange={(e) => {
                            const regex = /^[a-zA-Z\s]*$/;
                            if (regex.test(e.target.value)) {
                                setNameAbility(e.target.value);
                            }
                        }}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>Register Ability</button>
            </form>

            <h1>Abilities Available</h1>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {data.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Ability</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.nameAbility}</td>
                                        <td>
                                            <div className='actions'>
                                                <FaPenToSquare
                                                    className="edit-icon"
                                                    size={24}
                                                    onClick={() => handleEdit(item.id_ability)} // Chama o modal de edição
                                                />
                                                <FaTrash
                                                    onClick={() => handleDelete(item.id_ability)}
                                                    className="delete-icon"
                                                    size={24}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No abilities available</p>
                    )}
                </>
            )}
        </div>
    );
}
