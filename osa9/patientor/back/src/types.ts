export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export interface DatePeriod {
  startDate: string;
  endDate: string;
}

export interface DateAndCriteria {
  date: string;
  criteria: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export type EntryType =
  | "Hospital"
  | "OccupationalHealthcare"
  | "HealthCheck"

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: DateAndCriteria;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: DatePeriod;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntryEntry =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}
export type NewPatientEntry = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

