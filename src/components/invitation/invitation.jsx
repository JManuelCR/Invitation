import Envelope from '../envelope/envelope'
import { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../../context/useData'
import PortadaDeInvitacion from '../portada-de-invitacion/portada-de-invitacion'
import NosCasamos from '../nos-casamos/nos-casamos'
import InvitacionPara from '../invitacion-para/invitacion-para'
import Ceremonia from '../ceremonia/ceremonia'
import Recption from '../recepcion/recepcion'
import './invitation.css'
import Kiss from '../manu-and-tlalli-kiss/kiss'
import Fathers from '../fathers/fathers'
import WeSaidYes from '../we-said-yes/we-said-yes'
import DressCode from '../dress-code/dress-code'
import Schedule from '../schedule/schedule'
import Gifts from '../gifts/gifts'
import AsistanConfirmation from '../asistan-confirmation/asistan-confirmation'
import TipsAndTricks from '../tips-and-tricks/tips-and-tricks'
import Thanks from '../thanks/thanks'
import Travel from '../travel/travel'


export default function Invitation() {
    const { person, loading, guestId } = useData();
    const targetRef = useRef(null);
    const audioRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [showFullControls, setShowFullControls] = useState(false);
    const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

    // Bloquear scroll al cargar la página y posicionar al inicio
    useEffect(() => {
        // Bloquear scroll
        document.body.style.overflow = 'hidden';

        // Posicionar al inicio de la página
        window.scrollTo(0, 0);

        // También posicionar al inicio cuando se hace reload
        const handleBeforeUnload = () => {
            window.scrollTo(0, 0);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Removido el useEffect que causaba scroll automático
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [isEnvelopeOpened]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handlePlay = () => setIsPaused(false);
            const handlePause = () => setIsPaused(true);

            audio.addEventListener('play', handlePlay);
            audio.addEventListener('pause', handlePause);

            return () => {
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('pause', handlePause);
            };
        }
    }, []);

    const handleEnvelopeClick = () => {
        setIsEnvelopeOpened(true);
        setShowFullControls(true);

        // Habilitar scroll después de hacer clic
        document.body.style.overflow = 'auto';

        // Hacer scroll suave hacia la invitación solo si es necesario
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            if (rect.top < 0) {
                targetRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    const handleMuteToggle = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(audioRef.current.muted);
        }
    };

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    const handleShowControls = () => {
        setShowFullControls(!showFullControls);
        setShowControls(!showControls);
    }

    const handleVolumeChange = (increment) => {
        if (audioRef.current) {
            const newVolume = Math.max(0, Math.min(1, audioRef.current.volume + increment));
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className={`invitation-container ${isEnvelopeOpened ? 'envelope-opened' : ''}`}>
            {loading ? <div>Cargando...</div> : 
            <>
            <Envelope
                text="Abrir"
                targetRef={targetRef}
                audioRef={audioRef}
                onEnvelopeClick={handleEnvelopeClick}
                isOpened={isEnvelopeOpened}
            />

            <PortadaDeInvitacion ref={targetRef}/>
            <NosCasamos/>
            <InvitacionPara data={{ person }} />
            <Ceremonia/>
            <Recption/>
            <Kiss/>
            <Fathers/>
            <WeSaidYes/>
            <DressCode/>
            <Schedule/>
            <Gifts/>
            <AsistanConfirmation totalPasses={person?.guestPassesNumberToRecibe} guestId={guestId}/>
            <TipsAndTricks/>
            <Travel/>
            <Thanks/>
            <audio
                ref={audioRef}
                src="/audio/Christina Perri - A Thousand Years [Official Music Video] - Christina Perri.mp3"
                preload="auto"
            />
            <button className='show-controls-button' onClick={handleShowControls} style={{ display: showFullControls  ? 'block' : 'none' }}>
                <span>🔊</span>
            </button>

            <div className='controls-container' style={{ display: showControls ? 'flex' : 'none' }}>
                <button className='mute-button' onClick={handleMuteToggle}>
                    <span className='mute-button-text'>{isMuted ? '🔇' : '🔊'}</span>
                </button>

                <button onClick={handlePlayPause} className='mute-button-icon'>
                    {isPaused ? '▶️' : '⏸️'}
                </button>

                <button onClick={() => handleVolumeChange(0.1)} className='mute-button-icon'>
                    🔊 +
                </button>

                <button onClick={() => handleVolumeChange(-0.1)} className='mute-button-icon'>
                    🔊 -
                </button>

                <button onClick={() => handleShowControls()} className='mute-button-icon'>
                    ✖️
                </button>
                </div>
            </>
            }
        </div>
    )
}