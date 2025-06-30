import './invitacion-para.css';
import { useState } from 'react';

export default function InvitacionPara() {
    const [number_of_passes, setNumberOfPasses] = useState(1);

    return (
        <section className="invitacion-para-container">
            <h2>Invitación para:</h2>
            <h2 className='nombre_del_invitado'>María Fernanda Cabrera Rojas</h2>
            <h3 className='general_text'><span className='number_of_passes_number'>{number_of_passes}</span>{number_of_passes >1 ? '  pases disponibles' : '  pase disponible'}</h3>
            <p className='general_text'>
            Nos hará muy felices que nos acompañes en el viaje más importante de nuestra vida.
            </p>
        </section>
    );
}