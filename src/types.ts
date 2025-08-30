export type AppointmentStatus = 'Пришел' | 'Ожидает' | 'Отменен'
export type AppointmentType = 'Лечение' | 'Консультация'

export interface Appointment {
  timeStart: string
  timeEnd: string
  patient: string
  phone: string
  status: AppointmentStatus
  type: AppointmentType
  comment?: string
  doctorId?: string
}

export interface Doctor {
  id: string
  doctor: string
  specialty: string
  avatarUrl?: string
  appointments: Appointment[]
}