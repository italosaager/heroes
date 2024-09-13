import { useEffect, useState } from 'react';
import './editAbility.css'; // Reutilizando o CSS do editAbility
import { service } from '../../service/service';

interface EditAbilityProps {
    close: () => void,
    idAbility: number;
}

export default function EditAbility({ close, idAbility }: EditAbilityProps) {
    const [nameAbility, setNameAbility] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getAbility() {
            try {
                const result = await service.getAbilitybyId(idAbility);
                setNameAbility(result.nameAbility);
            } catch (error) {
                console.error("Error fetching ability:", error);
            } finally {
                setIsLoading(false);
            }
        }

        getAbility();
    }, [idAbility]);

    const handleSave = async () => {
        try {
            await service.updateAbility(idAbility, nameAbility);
            close();
        } catch (error) {
            console.error("Error updating ability:", error);
        }
    };

    if (isLoading) {
        return <div className="editAbility">Loading...</div>;
    }

    return (
        <div className='editAbility'>
            <div className='editAbilityContent'>
                <h2>Edit Ability</h2>

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
                />

                <button className="saveBtn" onClick={handleSave} disabled={!nameAbility}>
                    Save
                </button>

                <button className="closeBtn" onClick={close}>
                    Close
                </button>
            </div>
        </div>
    );
}
