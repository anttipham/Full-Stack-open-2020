import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  // console.log(diagnoseData);
  return diagnoseData;
};

const addEntry = (): void => {
  return;
};

export default {
  getEntries,
  addEntry
};