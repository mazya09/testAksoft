import dayjs from 'dayjs'

export const TIME_START = '08:00'
export const TIME_END = '20:00'
export const SLOT_MINUTES = 30

export function makeTimeSlots(start = TIME_START, end = TIME_END, step = SLOT_MINUTES) {
  const slots: string[] = []
  let t = dayjs(start, 'HH:mm')
  const stop = dayjs(end, 'HH:mm')
  while (t.isBefore(stop) || t.isSame(stop)) {
    slots.push(t.format('HH:mm'))
    t = t.add(step, 'minute')
  }
  return slots
}

export function isInRange(slot: string, start: string, end: string) {
  const s = dayjs(slot, 'HH:mm')
  const a = dayjs(start, 'HH:mm')
  const b = dayjs(end, 'HH:mm')
  return (s.isAfter(a) || s.isSame(a)) && (s.isBefore(b) || s.isSame(b))
}