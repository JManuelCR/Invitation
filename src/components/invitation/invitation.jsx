import Envelope from '../envelope/envelope'
import { useRef, useState, useEffect } from 'react'
import PortadaDeInvitacion from '../portada-de-invitacion/portada-de-invitacion'
import NosCasamos from '../nos-casamos/nos-casamos'
import './invitation.css'

export default function Invitation() {
    const targetRef = useRef(null);
    const audioRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [showControls, setShowControls] = useState(false);
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

    // Asegurar que siempre esté al inicio cuando se monta el componente
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
        setShowControls(true);
        
        // Habilitar scroll después de hacer clic
        document.body.style.overflow = 'auto';
        
        // Hacer scroll suave hacia la invitación
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
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

    const handleVolumeChange = (increment) => {
        if (audioRef.current) {
            const newVolume = Math.max(0, Math.min(1, audioRef.current.volume + increment));
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className={`invitation-container ${isEnvelopeOpened ? 'envelope-opened' : ''}`}>
            <Envelope 
                text="Abrir" 
                targetRef={targetRef} 
                audioRef={audioRef} 
                onEnvelopeClick={handleEnvelopeClick}
                isOpened={isEnvelopeOpened}
            />

            <PortadaDeInvitacion ref={targetRef}/>
            <NosCasamos/>
            <audio 
                ref={audioRef} 
                src="/audio/Christina Perri - A Thousand Years [Official Music Video] - Christina Perri.mp3"
                preload="auto"
            />
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
            </div>
        </div>
    )
}