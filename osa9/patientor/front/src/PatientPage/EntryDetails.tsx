import React from 'react';
import { Header, Icon, List, Segment, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';

const BaseEntry: React.FC<{ entry: Entry; iconName: SemanticICONS }> = ({ entry, iconName, children }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Segment>
      <Header as="h3">
        {entry.date}
        <Icon name={iconName} />
      </Header>
      <em>{entry.description}</em>
      <List>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(code =>
          <List.Item key={code}>
            <b>{code}</b> {}
            {diagnoses[code] && diagnoses[code].name}
          </List.Item>
        )}
      </List>

      <div>
        {children}
      </div>
    </Segment>
  );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <BaseEntry entry={entry} iconName="hospital">
      <div>
        <b>Discharged {entry.discharge.date}:</b> {}
        <em>{entry.discharge.criteria}</em>
      </div>
    </BaseEntry>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <BaseEntry entry={entry} iconName="stethoscope">
      <div><b>Employer:</b> {entry.employerName}</div>
      {entry.sickLeave &&
        <div>
          <b>Sick leave:</b> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </div>
      }
    </BaseEntry>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const colors: SemanticCOLORS[] = [
    "green",
    "yellow",
    "orange",
    "red"
  ];
  return (
    <BaseEntry entry={entry} iconName="user md">
      <Icon name="heart" color={colors[entry.healthCheckRating]} />
    </BaseEntry>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry ${JSON.stringify(value)}`);
  };
  
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
