import "./bullets.css";
import locationIcon from "../../assets/icons/location-icon.svg";
import calendarIcon from "../../assets/icons/calendar-icon.svg";
import timeIcon from "../../assets/icons/time-icon.svg";

export default function Bullets(props) {
    const { icon } = props;
    const shape = {
        "location": locationIcon,
        "calendar": calendarIcon,
        "time": timeIcon,
    }
    return (
        <div className="bullet">
            <img className="bullet__icon" src={shape[icon]} alt={icon} />
        </div>
    )
}