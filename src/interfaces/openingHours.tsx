export interface OpeningHours {
  open_now: boolean
  periods: {
    open: { day: number; time: string }
    close: { day: number; time: string }
  }[]
  weekday_text: string[]
}
