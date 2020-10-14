import { Action } from "./state";
import { Diagnosis, Patient } from "./types";

export const setPatientList = (patients: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patients
});

export const addPatient = (patient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: patient
});

export const editPatient = (patient: Patient): Action => ({
  type: "EDIT_PATIENT",
  payload: patient
});

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSIS_LIST",
  payload: diagnoses
});
