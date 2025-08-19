import './invitacion-para.css';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export default function InvitacionPara({ data }) {
    const [number_of_passes, setNumberOfPasses] = useState(1);
    const person = data?.person;
    const { t } = useTranslation();
    
    // Si tenemos datos del invitado, actualizar el número de pases
    useEffect(() => {
        if (person && person.guestPassesNumberToRecibe) {
            setNumberOfPasses(person.guestPassesNumberToRecibe);
        }
    }, [person]);

    return (
        <section className="invitacion-para-container">
            <div className="header-alignment">
            <h2>{t.invitation.invitationFor}</h2>
            <hr />
            </div>
            <h2 className='nombre_del_invitado'>
                {person?.guestName !== '' ? person.guestName : person?.guestName ?? t.invitation.guest}
            </h2>
            <h3 className='general_text'>
                <span className='number_of_passes_number'>{number_of_passes}</span>
                {number_of_passes > 1 ? ` ${t.invitation.passesAvailable}` : ` ${t.invitation.passAvailable}`}
            </h3>
            <p className='general_text'>
                {t.invitation.welcomeMessage}
            </p>
        </section>
    );
}