import './fathers-in-law-card.css'

const FathersInLawCard = ({ title, names, isActive, isAnimating }) => {
    const [fatherName, motherName] = names
    return (
        <div className={`fathers-in-law-card ${isActive ? 'active' : ''} ${isAnimating ? 'animating' : ''}`}>
            <h3 className="fathers-in-law-card-title">{title}</h3>
            <div className="fathers-in-law-card-names">
                <span className="fathers-in-law-card-name">
                    {motherName}
                </span>
                <span className="fathers-in-law-card-name">
                    {fatherName}
                </span>
            </div>
        </div>
    )
}

export default FathersInLawCard