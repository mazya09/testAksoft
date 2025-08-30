import { Button } from 'antd'
import { LeftOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { appointmentStore } from '@/store/appointmentStore'

export const TopBar = observer(() => {
  const date = appointmentStore.selectedDate
  const formattedDate = date.toLocaleDateString('ru-RU', {
    weekday: 'short', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      <Button icon={<LeftOutlined />} onClick={() => appointmentStore.setDate(new Date(date.setDate(date.getDate() - 1)))} />
      <div style={{ flex: 1, textAlign: 'center', fontWeight: 600 }}>
        {appointmentStore.doctors.map(doc => (
          <span key={doc.doctor} style={{ margin: '0 12px' }}>
            <UserOutlined /> {doc.doctor} <span style={{ color: '#888' }}>{doc.specialty}</span>
          </span>
        ))}
      </div>
      <Button icon={<RightOutlined />} onClick={() => appointmentStore.setDate(new Date(date.setDate(date.getDate() + 1)))} />
      <div style={{ marginLeft: 16 }}>{formattedDate}</div>
    </div>
  )
})