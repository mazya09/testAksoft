import { makeAutoObservable } from 'mobx'
import doctorsData from '../mock/doctors.json'
import type { Appointment, Doctor } from '../types' // Импорт типов из types.ts

class AppointmentStore {
  doctors: Doctor[] = []
  selectedDate: Date = new Date()
  search: string = ''

  constructor() {
    makeAutoObservable(this)
    this.doctors = doctorsData as Doctor[] // Приведение типа, если нужно
  }

  setDate(date: Date) {
    this.selectedDate = date
  }

  setSearch(value: string) {
    this.search = value
  }

  get filteredDoctors(): Doctor[] {
    if (!this.search) return this.doctors
    return this.doctors.map(doc => ({
      ...doc,
      appointments: doc.appointments.filter(ap =>
        ap.patient.toLowerCase().includes(this.search.toLowerCase())
      ),
    }))
  }
}

export const appointmentStore = new AppointmentStore()