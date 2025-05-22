export interface Measurement {
  id: string;
  systolic: number;
  diastolic: number;
  pulse: number;
  date: string; // Or number for timestamp
}