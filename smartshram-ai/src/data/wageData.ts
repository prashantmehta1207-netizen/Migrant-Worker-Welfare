import { WageRecord } from '../types'

export const wageData: WageRecord[] = [
  { industry: 'Construction', district: 'Ahmedabad', benchmark: 450, average: 418, minimum: 340, alertCount: 12 },
  { industry: 'Construction', district: 'Surat', benchmark: 450, average: 435, minimum: 360, alertCount: 5 },
  { industry: 'Construction', district: 'Vadodara', benchmark: 450, average: 390, minimum: 310, alertCount: 18 },
  { industry: 'Construction', district: 'Rajkot', benchmark: 430, average: 410, minimum: 330, alertCount: 7 },
  { industry: 'Construction', district: 'Bharuch', benchmark: 430, average: 380, minimum: 290, alertCount: 22 },
  { industry: 'Textile', district: 'Ahmedabad', benchmark: 400, average: 385, minimum: 310, alertCount: 9 },
  { industry: 'Textile', district: 'Surat', benchmark: 400, average: 360, minimum: 280, alertCount: 31 },
  { industry: 'Textile', district: 'Vadodara', benchmark: 400, average: 395, minimum: 320, alertCount: 4 },
  { industry: 'Diamond', district: 'Surat', benchmark: 600, average: 570, minimum: 450, alertCount: 6 },
  { industry: 'Diamond', district: 'Vadodara', benchmark: 600, average: 545, minimum: 420, alertCount: 11 },
  { industry: 'Diamond', district: 'Rajkot', benchmark: 580, average: 510, minimum: 390, alertCount: 15 },
  { industry: 'Manufacturing', district: 'Ahmedabad', benchmark: 500, average: 488, minimum: 390, alertCount: 3 },
  { industry: 'Manufacturing', district: 'Rajkot', benchmark: 500, average: 460, minimum: 370, alertCount: 14 },
  { industry: 'Manufacturing', district: 'Vadodara', benchmark: 500, average: 475, minimum: 380, alertCount: 8 },
  { industry: 'Hospitality', district: 'Ahmedabad', benchmark: 360, average: 330, minimum: 260, alertCount: 19 },
  { industry: 'Hospitality', district: 'Surat', benchmark: 360, average: 345, minimum: 270, alertCount: 10 },
  { industry: 'Hospitality', district: 'Bharuch', benchmark: 350, average: 295, minimum: 220, alertCount: 28 },
]

export const complaintsOverTime = [
  { month: 'Aug', count: 34 },
  { month: 'Sep', count: 41 },
  { month: 'Oct', count: 38 },
  { month: 'Nov', count: 52 },
  { month: 'Dec', count: 61 },
  { month: 'Jan', count: 47 },
]

export const workersByIndustry = [
  { industry: 'Construction', count: 18420 },
  { industry: 'Textile', count: 24310 },
  { industry: 'Diamond', count: 12870 },
  { industry: 'Manufacturing', count: 15640 },
  { industry: 'Hospitality', count: 8930 },
]

export const skillDistribution = [
  { name: 'Masonry & Construction', value: 28 },
  { name: 'Textile & Weaving', value: 24 },
  { name: 'Diamond Cutting', value: 18 },
  { name: 'Welding & Fitting', value: 16 },
  { name: 'Hospitality', value: 14 },
]

export const wageAlertsByDistrict = [
  { district: 'Bharuch', alerts: 50 },
  { district: 'Surat', alerts: 42 },
  { district: 'Vadodara', alerts: 33 },
  { district: 'Rajkot', alerts: 22 },
  { district: 'Ahmedabad', alerts: 21 },
]
