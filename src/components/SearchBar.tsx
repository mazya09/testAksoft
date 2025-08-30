import { Input } from 'antd'
import { observer } from 'mobx-react-lite'
import { appointmentStore } from '../store/appointmentStore' // если alias не настроен

export const SearchBar = observer(() => (
  <Input
    placeholder="Поиск по пациенту"
    value={appointmentStore.search}
    onChange={e => appointmentStore.setSearch(e.target.value)}
    style={{ marginBottom: 16, width: '100%' }}
  />
))