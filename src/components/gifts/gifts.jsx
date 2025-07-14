import './gifts.css';
import liverpool from '../../assets/img/liverpool.png';
import santander from '../../assets/img/santander.png';
import { useState } from 'react';

const Gifts = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('014610200071796956');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }
  const url_liverpool = 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/51623252'
  return (
    <section className="gifts-container">
      <div className="gifts-header">
        <h2 className="gifts-header-title">Mesa de regalos</h2>
        <hr />
      </div>
      <p className="gifts-message">
      ¡Ándale, contribuye  a nuestra luna de miel o futuro nido de amor, una ayudita económica será recibida con alegría y (baile)!
      </p>
      <div className="gifts-account">
        <a href={url_liverpool} target="_blank" 
        className='gifts-account-link'
        >
          <img src={liverpool} alt="liverpool"  className='gifts-animation'/>
          <p className="gifts-data">Liverpool</p>
        </a>
        <div className='gifts-account-link' onClick={handleCopy}>
          <img src={santander} alt="santander" className='gifts-animation' />
          <div>
            <p className='gifts-data'>Cuenta de ahorros Santander</p>
            <p className='gifts-account-number'>014610200071796956</p>
          </div>
          {isCopied && <div className='gifts-copied'><p>Copiado en el portapapeles</p></div>}
        </div>
      </div>
    </section>
  );
};

export default Gifts;