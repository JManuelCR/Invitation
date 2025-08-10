import "./car-rental.css";
import { useTranslation } from '../../hooks/useTranslation';

const CarRental = ({ rentalOptions }) => {
  const { t } = useTranslation();
  return (
    <section className="car-rental-container">
      {rentalOptions.map((option) => (
        <a
          className="rental-option"
          key={option.name}
          href={option.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={option.image} alt={option.name} />
          <div className="rental-name-container">
            <h3 className="rental-option-name">{option.name}</h3>
            <span className="more-information">
              {t.tips.moreInformation}
            </span>
          </div>
        </a>
      ))}
    </section>
  );
};

export default CarRental;
