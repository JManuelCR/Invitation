import { useRef, useEffect, useState } from "react";
import './schedule.css'

const events = [
  { time: "12:00 pm", label: "Ceremonia" },
  { time: "2:30 pm", label: "Recepción" },
  { time: "3:00 pm", label: "Banquete" },
  { time: "4:30 pm", label: "Brindis" },
  { time: "5:00 pm", label: "Baile de los novios" },
  { time: "5:30 pm", label: "Fiesta" },
];

const Schedule = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="schedule-container">
      <div className="schedule-header">
        <h2 className="schedule-header-title">Itinerario</h2>
        <hr />
      </div>
      <ul className="schedule-list">
        {events.map((event, idx) => (
          <li
            key={event.time}
            ref={(el) => (itemRefs.current[idx] = el)}
            data-index={idx}
            className={
              `schedule-item` +
              (activeIndex === idx ? ' active' : '') +
              (activeIndex > idx ? ' completed' : '')
            }
          >
            <span className="schedule-dot" />
            <span className="schedule-time">{event.time}</span>
            <span className="schedule-label">{event.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Schedule;