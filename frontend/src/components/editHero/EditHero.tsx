import { useEffect, useState } from 'react';
import './editHero.css';
import { service } from '../../service/service';

interface EditHeroProps {
    close: () => void,
    idHero: number;
}

interface Ability {
    id_ability: number,
    nameAbility: string,
}

export default function EditHero({ close, idHero }: EditHeroProps) {
    const [nameHero, setNameHero] = useState('');
    const [fkAbility, setFkAbility] = useState<number>(0);
    const [abilities, setAbilities] = useState<Ability[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getHero() {
            try {
                const result = await service.getHeroybyId(idHero);
                setNameHero(result.nameHero);
                setFkAbility(result.fkAbility);
            } catch (error) {
                console.error("Error fetching hero:", error);
            } finally {
                setIsLoading(false);
            }
        }

        async function getAbilities() {
            try {
                const abilitiesResult = await service.getAbility();
                setAbilities(abilitiesResult);
            } catch (error) {
                console.error("Error fetching abilities:", error);
            }
        }

        getHero();
        getAbilities();
    }, [idHero]);

    const handleSave = async () => {
        try {
            await service.updateHero(idHero, nameHero, fkAbility);
            close();
        } catch (error) {
            console.error("Error updating hero:", error);
        }
    };

    if (isLoading) {
        return <div className="editHero">Loading...</div>;
    }

    return (
        <div className='editHero'>
            <div className='editHeroContent'>
                <h2>Edit Hero</h2>

                <label>Name:</label>
                <input
                    type="text"
                    value={nameHero}
                    onChange={(e) => {
                        const regex = /^[a-zA-Z\s]*$/;
                        if (regex.test(e.target.value)) {
                            setNameHero(e.target.value);
                        }
                    }}
                />

                <label>Ability:</label>
                <select
                    value={fkAbility}
                    onChange={(e) => setFkAbility(Number(e.target.value))}
                >
                    <option value="">Select an ability</option>
                    {abilities.map((ability) => (
                        <option key={ability.id_ability} value={ability.id_ability}>
                            {ability.nameAbility}
                        </option>
                    ))}
                </select>

                <button className="saveBtn" onClick={handleSave} disabled={!nameHero || !fkAbility}>
                    Save
                </button>

                <button className="closeBtn" onClick={close}>
                    Close
                </button>
            </div>
        </div>
    );
}
