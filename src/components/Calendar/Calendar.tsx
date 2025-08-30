import React, { useState } from "react";
import { Layout, Tooltip, Popover } from "antd";
import moment from "moment-timezone";
import "moment/locale/ru";
moment.locale("ru");

const { Content } = Layout;

interface DoctorResource {
  id: string;
  title: string;
  specialist: string;
}

interface AppointmentEvent {
  id: string;
  resourceId: string;
  title: string;
  start: string;
  end: string;
  color: string;
  diagnosis: string;
}

const WORK_DAY_START = 8;
const WORK_DAY_END = 19;
const SLOT_HEIGHT = 50;

const startOfWeek = moment.tz("2025-08-25", "Asia/Bishkek").startOf("isoWeek");
const weekDays = Array.from({ length: 7 }, (_, i) =>
  startOfWeek.clone().add(i, "days")
);

const resources: DoctorResource[] = [
  { id: "1", title: "Ринат Турсунов", specialist: "Доктор" },
  { id: "2", title: "Рустам Торогелдие", specialist: "Доктор" },
  { id: "3", title: "Эмир Асанов", specialist: "Доктор" },
];

const events: AppointmentEvent[] = [
  {
    id: "1",
    resourceId: "1",
    title: "Пациент: Азим Максутов",
    start: "2025-08-25T08:30:00",
    end: "2025-08-25T09:30:00",
    color: "#FFB74D",
    diagnosis: "Грипп",
  },
  {
    id: "2",
    resourceId: "2",
    title: "Пациент: Ринта Иманкулов",
    start: "2025-08-27T18:00:00",
    end: "2025-08-27T19:30:00",
    color: "#64B5F6",
    diagnosis: "Бронхит",
  },
];

const timeSlots = Array.from(
  { length: WORK_DAY_END - WORK_DAY_START },
  (_, i) =>
    moment
      .tz("2025-08-23", "Asia/Bishkek")
      .startOf("day")
      .add(WORK_DAY_START + i, "hours")
);

const isEventPast = (start: string) =>
  moment.tz(start, "Asia/Bishkek").isBefore(moment.tz(undefined, "Asia/Bishkek"));

const clamp = (m: moment.Moment) => {
  const start = m.clone().startOf("day").add(WORK_DAY_START, "hours");
  const end = m.clone().startOf("day").add(WORK_DAY_END, "hours");
  if (m.isBefore(start)) return start;
  if (m.isAfter(end)) return end;
  return m;
};

const getTopPercent = (start: string) => {
  const m = clamp(moment.tz(start, "Asia/Bishkek"));
  const base = moment.tz(start, "Asia/Bishkek").startOf("day").add(WORK_DAY_START, "hours");
  const diff = m.diff(base, "minutes");
  return (diff / ((WORK_DAY_END - WORK_DAY_START) * 60)) * 100;
};

const getHeightPercent = (start: string, end: string) => {
  const s = clamp(moment.tz(start, "Asia/Bishkek"));
  const e = clamp(moment.tz(end, "Asia/Bishkek"));
  if (e.isSameOrBefore(s)) return 0;
  const diff = e.diff(s, "minutes");
  return (diff / ((WORK_DAY_END - WORK_DAY_START) * 60)) * 100;
};


const Calendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(moment());



  return (
    <Layout>
      <Content style={{ padding: 20 }}>
        {/* Шапка с кликабельными днями недели */}
        <div style={{ display: "flex", borderBottom: "1px solid #ccc", marginBottom: 10 }}>
          <div style={{ width: 50 }} />
          {weekDays.map((d) => (
            <div
              key={d.format()}
              onClick={() => setSelectedDay(d)}
              style={{
                flex: 1,
                textAlign: "center",
                padding: 8,
                fontWeight: selectedDay.isSame(d, 'day') ? 'bold' : 'normal',
                cursor: "pointer",
                backgroundColor: selectedDay.isSame(d, 'day') ? "#e6f7ff" : 'transparent',
                borderRight: "1px solid #ccc"
              }}
            >
              {d.format("dddd, DD.MM")}
            </div>
          ))}
        </div>

        {/* Врачи */}
        <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
          <div style={{ width: 50, borderRight: "1px solid #ccc" }}>Время</div>
          {resources.map(r => (
            <div key={r.id} style={{ flex: 1, borderRight: "1px solid #ccc", padding: 8, fontWeight: 'bold' }}>
              <div>{r.specialist}</div>
              <div>{r.title}</div>
            </div>
          ))}
        </div>

        {/* Таймлайн с событиями */}
        <div style={{
          display: "flex",
          position: "relative",
          height: SLOT_HEIGHT * (WORK_DAY_END - WORK_DAY_START),
          borderTop: "1px solid #ccc"
        }}>
          {/* Сетка времени */}
          <div style={{ width: 50, borderRight: "1px solid #ccc" }}>
            {Array.from({ length: WORK_DAY_END - WORK_DAY_START }).map((_, i) => (
              <div key={i} style={{
                height: SLOT_HEIGHT,
                fontSize: 12,
                color: "#666",
                textAlign: "right",
                paddingRight: 5,
                boxSizing: "border-box",
                borderBottom: "1px solid #eee"
              }}>
                {moment().startOf("day").add(WORK_DAY_START + i, "hours").format("HH:mm")}
              </div>
            ))}
          </div>

          {/* Колонки врачей */}
          {resources.map(r => (
            <div key={r.id} style={{ flex: 1, position: "relative", borderRight: "1px solid #ccc" }}>
              {/* Сетка слотов */}
              {Array.from({ length: WORK_DAY_END - WORK_DAY_START }).map((_, idx) => (
                <div key={idx} style={{ height: SLOT_HEIGHT, borderBottom: "1px solid #eee" }} />
              ))}

              {/* События по выбранному дню */}
              {events
                .filter(ev => ev.resourceId === r.id && moment.tz(ev.start, "Asia/Bishkek").isSame(selectedDay, 'day'))
                .map(ev => {
                  const top = getTopPercent(ev.start);
                  const height = getHeightPercent(ev.start, ev.end);
                  if (height <= 0) return null;
                  const isPast = isEventPast(ev.start);
                  return (
                    <Popover key={ev.id} content={
                      <div>
                        <strong>{ev.title}</strong>
                        <div>Диагноз: {ev.diagnosis}</div>
                        <div>Время: {moment.tz(ev.start, "Asia/Bishkek").format("HH:mm")} – {moment.tz(ev.end, "Asia/Bishkek").format("HH:mm")}</div>
                      </div>
                    } title="Запись" trigger="hover" placement="top">
                      <Tooltip>
                        <div style={{
                          position: "absolute",
                          top: `${top}%`,
                          left: 5,
                          right: 5,
                          height: `${height}%`,
                          backgroundColor: isPast ? "#d3d3d3" : ev.color,
                          color: isPast ? "gray" : "black",
                          borderRadius: 4,
                          padding: "4px 6px",
                          fontSize: 12,
                          cursor: "pointer",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}>
                          {ev.title}
                        </div>
                      </Tooltip>
                    </Popover>
                  );
                })
              }
            </div>
          ))}
        </div>
      </Content>
    </Layout>
  );
};

export default Calendar;
