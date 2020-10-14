import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { editPatient } from '../reducers';
import { useStateValue } from '../state';
import { Patient, Entry } from '../types';
import AddEntryForm, { EntryFormValues, Options } from './AddEntryForm';
import EntryDetails from './EntryDetails';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];
  // console.log(patient)

  if (!patient) {
    return null;
  }

  // fetch and store personal data, eg. SSN
  if (!patient.ssn) {
    axios.get(`${apiBaseUrl}/patients/${patient.id}`).then(({ data: patient }) => {
      console.log("accessed", patient.name, "for the first time, wow");
      dispatch(editPatient(patient));
    });
  }
  
  const submitNewEntry = async (values: EntryFormValues, { resetForm }: Options): Promise<void> => {
    values = {
      ...values,
      healthCheckRating: Number(values.healthCheckRating)
    }
    try {
      const { data: entry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      const updatePatient: Patient = {
        ...patient,
        entries: [
          ...patient.entries,
          entry
        ]
      };
      dispatch(editPatient(updatePatient));
      resetForm();
    } catch (e) {
      console.error(e.response.data);
      alert(e.response.data);
    }
  };
  
  // console.log(patient);
  return (
    <div>
      <Header as="h2">
        {patient.name}

        {patient.gender === "male" &&
          <Icon name="mars" />
        }
        {patient.gender === "female" &&
          <Icon name="venus" />
        }
      </Header>
      <div><b>SSN:</b> {patient.ssn}</div>
      <div><b>Occupation:</b> {patient.occupation}</div>

      {patient.entries && patient.entries.length > 0 &&
        <>
          <Header as="h3">Entries</Header>
          {patient.entries.map(entry =>
            <EntryDetails entry={entry} key={entry.id} />
          )}
        </>
      }

      <Header as="h3">Add New Entry</Header>
      <AddEntryForm onSubmit={submitNewEntry} />
    </div>
  );
};

export default PatientPage;