import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, HealthCheckRatingOption, DiagnosisSelection } from "./FormField";
import { HealthCheckEntry, HealthCheckRating } from "../../types";
import { useStateValue } from "../../state";

type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;
export type EntryFormValues = HealthCheckEntryFormValues;

const HealthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
];

export interface Options {
  resetForm: () => void;
}
interface Props {
  onSubmit: (values: EntryFormValues, options: Options) => void;
  // onCancel: () => void;
}
export const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [{ diagnoses }] = useStateValue();
  
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const wrongFormatError = "Wrong format";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        } else if (values.date.length !== 10 || !Date.parse(values.date)) {
          errors.date = wrongFormatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Name"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            {/* <Field
              label="Diagnosis Codes"
              placeholder="いらなくね？"
              name="diagnosisCodes"
              component={TextField}
            /> */}
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            /> 
            <SelectField
              label="Health Check Rating"
              name="healthCheckRating"
              options={HealthCheckRatingOptions}
            />
            <Grid>
              {/* <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column> */}
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
