import { observer } from 'mobx-react-lite'
import { AppointmentCard } from './AppointmentCard'
import styles from '../styles/grid.module.css'
import { appointmentStore } from '../store/appointmentStore'

export const CalendarGrid = observer(() => (
  <div className={styles.grid}>
    {appointmentStore.filteredDoctors.map(doc => (
      <div key={doc.doctor} className={styles.column}>
        <div className={styles.header}>
          {doc.doctor} <span>{doc.specialty}</span>
        </div>
        {doc.appointments.map(ap => (
          <AppointmentCard key={ap.timeStart + ap.patient + doc.doctor} ap={ap} />
        ))}
      </div>
    ))}
  </div>
))