import Bullets from "../bullets/bullets";
import "./list-item.css";

export default function ListElement(props) {
    const { icon, text } = props;
    return (
        <li className="list-element">
            <Bullets icon={icon} />
            <p className="list-element__text">{text}</p>
        </li>
    )
}