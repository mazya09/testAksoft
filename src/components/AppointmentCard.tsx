import type { FC } from 'react'
import type { Appointment } from '@/types'
import { Tag, Tooltip } from 'antd'
import styles from '@/styles/grid.module.css'

const statusTagColor: Record<Appointment['status'], string> = {
  'Пришел': 'green',
  'Ожидает': 'gold',
  'Отменен': 'red',
}

export const AppointmentCard: FC<{ ap: Appointment }> = ({ ap }) => {
  const statusClass = ap.status === 'Пришел' ? styles.statusArrived : ap.status === 'Ожидает' ? styles.statusPending : styles.statusCancelled

  const content = (
    <div className={styles.tooltip}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{ap.patient}</div>
      <div style={{ color: '#666' }}>Телефон: {ap.phone}</div>
      <div style={{ color: '#666', marginTop: 4 }}>
        Статус: <Tag color={statusTagColor[ap.status]}>{ap.status}</Tag>
      </div>
      <div style={{ color: '#666', marginTop: 4 }}>Тип: {ap.type}</div>
      {ap.comment && <div style={{ color: '#666', marginTop: 4 }}>Комментарий: {ap.comment}</div>}
    </div>
  )

  return (
    <Tooltip placement="bottomLeft" title={content} mouseEnterDelay={0.1}>
      <div className={statusClass}>
        <div>{ap.timeStart} - {ap.timeEnd}</div>
        <div>{ap.patient}</div>
      </div>
    </Tooltip>
  )
}