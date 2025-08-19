import { useRef, useEffect, useState } from "react";
import './schedule.css'
import { useTranslation } from "../../hooks/useTranslation";


const Schedule = () => {
  const { t } = useTranslation();
  const events = [
    { time: "12:00 hrs", label: t.schedule.ceremony },
    { time: "14:30 hrs", label: t.schedule.reception },
    { time: "15:00 hrs", label: t.schedule.dinner },
    { time: "16:30 hrs", label: t.schedule.brindis },
    { time: "17:00 hrs", label: t.schedule.dance },
    { time: "17:30 hrs", label: t.schedule.party },
  ];
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
      <div className="schedule-header header-alignment">
        <h2 className="schedule-header-title">{t.schedule.title}</h2>
        <hr />
      </div>
      <ul className="schedule-list">
      <hr className="schedule-steps-path"/>
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