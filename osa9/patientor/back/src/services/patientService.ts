import patientData from '../../data/patients';
import { PublicPatient, Patient, NewPatientEntry, NewEntryEntry, Entry } from '../types';
import uuid = require('uuid');

const patients = patientData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const addEntryEntry = (id: string, entry: NewEntryEntry) => {
  const newEntry: Entry = {
    ...entry,
    id: uuid.v1()
  };
  const patients = getEntries();
  const patient = patients.find(patient => patient.id === id);
  if (!patient) {
    throw new Error(`Nonexistent id ${id}`)
  }

  patient.entries.push(newEntry);
  return newEntry;
}

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (patientEntry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    ...patientEntry,
    id: uuid.v1()
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addEntryEntry,
  getNonSensitiveEntries,
  addEntry
};