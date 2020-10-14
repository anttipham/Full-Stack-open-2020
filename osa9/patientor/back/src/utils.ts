/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatientEntry,
  Gender,
  NewEntryEntry,
  BaseEntry,
  EntryType,
  DateAndCriteria,
  DatePeriod, HealthCheckRating
} from "./types";

const assertNever = (errorMessage: string): never => {
  throw new Error(errorMessage);
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
  const timeSinceEpoch = Date.parse(date)
  return Boolean(timeSinceEpoch);
};
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};
const isArray = (array: any): array is any[] => {
  return Array.isArray(array);
}
const isHealthCheckRating = (rating: any): rating is Gender => {
  return Object.values(HealthCheckRating).includes(rating);
};

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const generateError = (type: string, value: any) => {
    throw new Error(`Incorrect or missing ${type}: ${value}`);
}

const parseStringArgument = (stringArgument: any, argumentName: string): string => {
  if (!stringArgument || !isString(stringArgument)) {
    generateError(argumentName, stringArgument);
  }
  return stringArgument;
};

const parseDate = (dateOfBirth: any, dateName: string): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    generateError(dateName, dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    generateError('gender', gender);
  }
  return gender;
};

const parseDiagnosisCodes = (codes: any): BaseEntry["diagnosisCodes"] => {
  if (!isArray(codes)) {
    generateError('Diagnosis codes', codes);
  }
  return codes.map((code: any, i: number) => parseStringArgument(code, `Diagnosis code at index ${i}`))
}

const parseEntryType = (type: any): EntryType => {
  switch (type) {
    case "Hospital":
    case "OccupationalHealthcare":
    case "HealthCheck":
      return parseStringArgument(type, "type") as EntryType;
    default:
      throw new Error(`Nonexistent entry type ${type}`)
  }
}

const parseDischarge = (discharge: any): DateAndCriteria => {
  if (!discharge) {
    generateError("discharge", discharge);
  }
  return {
    date: parseDate(discharge.date, "dispatch date"),
    criteria: parseStringArgument(discharge.criteria, "dispatch criteria")
  }
}

const parseSickLeave = (sickLeave: any): DatePeriod => {
  if (!sickLeave) {
    generateError("sick leave", sickLeave);
  }
  return {
    startDate: parseDate(sickLeave.startDate, "sick leave start date"),
    endDate: parseDate(sickLeave.endDate, "sick leave end date")
  }
}

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    generateError('Health Check Rating', rating);
  }
  return rating;
}

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  // console.log(object)
  return {
    name: parseStringArgument(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth, "date of birth"),
    ssn: parseStringArgument(object.ssn, 'SSN'),
    gender: parseGender(object.gender),
    occupation: parseStringArgument(object.occupation, 'occupation'),
    entries: []
  };
};

export const toNewEntryEntry = (object: any): NewEntryEntry => {
  const newEntry = {
    description: parseStringArgument(object.description, 'description'),
    date: parseDate(object.date, "entry date"),
    specialist: parseStringArgument(object.specialist, 'specialist'),
    type: parseEntryType(object.type)
  } as NewEntryEntry;
  
  if (object.diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  switch (newEntry.type) {
    case "Hospital":
      return {
        ...newEntry,
        discharge: parseDischarge(object.discharge)
      };
    case "OccupationalHealthcare":
      return {
        ...newEntry,
        employerName: parseStringArgument(object.employerName, "Employer name"),
        sickLeave: parseSickLeave(object.sickLeave)
      };
    case "HealthCheck":
      return {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      }
    default:
      return assertNever(`Incorrect Entry ${JSON.stringify(object)}`);
  }
}

