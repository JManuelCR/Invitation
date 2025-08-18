import './gifts.css';
import liverpool from '../../assets/img/liverpool.png';
import santander from '../../assets/img/santander.png';
import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
const Gifts = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useTranslation();
  const handleCopyAccount = () => {
    navigator.clipboard.writeText('014610200071796956');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }
  const handleOwnerName = () => {
    navigator.clipboard.writeText('Jose Manuel Cabrera Rojas');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }
  const url_liverpool = 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/51623252'
  return (
    <section className="gifts-container">
      <div className="gifts-header header-alignment">
        <h2 className="gifts-header-title">{t.gifts.title}</h2>
        <hr />
      </div>
      <p className="gifts-message">
      {t.gifts.message}
      </p>
      <div className="gifts-account">
        <a href={url_liverpool} target="_blank" 
        className='gifts-account-link'
        >
          <img src={liverpool} alt="liverpool"  className='gifts-animation'/>
          <section className="gifts-data-section"><p className='noBold'>{t.gifts.liverpool}</p>  {t.gifts.viewMore}</section>
        </a>
        <div className='gifts-account-link' >
          <img src={santander} alt="santander" className='gifts-animation' />
          <div>
            <p className='gifts-data noBold spare'>{t.gifts.savingsAccount}</p>
            <section onClick={handleOwnerName} className='gifts-account-number noBold'><p className='noBold'>{t.gifts.accountUserName}</p>   <p className='gifts-account-number spare'>{t.gifts.copy}</p></section>
            <section onClick={handleOwnerName} className='gifts-account-number noBold'><p className='noBold'>014610200071796956</p>  <p className='gifts-account-number spare'>{t.gifts.copy}</p></section>
          </div>
          {isCopied && <div className='gifts-copied'><p>{t.gifts.copied}</p></div>}
        </div>
          <p className='gifts-copy'>{t.gifts.messageComplement}</p>
      </div>
    </section>
  );
};

export default Gifts;