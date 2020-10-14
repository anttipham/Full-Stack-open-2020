import express from 'express';
import patientService from '../services/patientService';
import { toNewEntryEntry, toNewPatientEntry } from '../utils';
const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const patient = patientService.addEntry(newPatientEntry);
    res.json(patient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const patients = patientService.getEntries();
  const patient = patients.find(patient => patient.id === id);
  res.json(patient);
});

patientsRouter.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  // console.log(req.body)
  const newEntryEntry = toNewEntryEntry(req.body);

  try {
    const entry = patientService.addEntryEntry(id, newEntryEntry);
    res.json(entry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default patientsRouter;
