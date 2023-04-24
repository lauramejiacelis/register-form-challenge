import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormInput, SelectInput } from './FormInput';
import {
  stepOneSchema,
} from '@/utils/validationSchema';
import { COUNTRIES, GENDERS, DOCUMENTTYPES } from '@/utils/Constants';
import DatePickerField from './MyDatePicker';
import {  BsCheckLg } from 'react-icons/bs';
import { HiXMark } from 'react-icons/hi2';
import styles from '../styles/RegisterForm.module.css';

interface FormValues {
  country: string;
  gender: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null | any;
  documentType: string;
  documentNumber: string;
  documentImageFront: string;
  documentImageBack: string;
}

const StepOne = (props: any) => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    props.next(values);
  };
  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={stepOneSchema}
    >
      {(formik) => (
        <Form>
          <div className={styles.userInfo}>
            <div className={styles.inputBox}>
              <SelectInput
                label="País "
                name="country"
                type="text"
                className={styles.formInput}
              >
                <option value="" selected disabled hidden>
                  Seleccione
                </option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country.toLowerCase()}>
                    {country}
                  </option>
                ))}
              </SelectInput>
            </div>

            <div className={styles.inputBox}>
              <SelectInput
                label="Género: "
                name="gender"
                type="text"
                className={styles.formInput}
              >
                <option value="" selected disabled hidden>
                  Seleccione
                </option>
                {GENDERS.map((gender) => (
                  <option key={gender} value={gender.toLowerCase()}>
                    {gender}
                  </option>
                ))}
              </SelectInput>
            </div>

            <div className={styles.inputBox}>
              <FormInput
                label="Primer Nombre: "
                name="firstName"
                type="text"
                className={styles.formInput}
                error={formik.errors.firstName}
              />
            </div>

            <div className={styles.inputBox}>
              <FormInput
                label="Segundo Nombre "
                name="lastName"
                type="text"
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="dateOfBirth">
                Fecha de Nacimiento 
                {(formik.touched.dateOfBirth && formik.errors.dateOfBirth) || formik.values.dateOfBirth === formik.initialValues.dateOfBirth ? (
                  <HiXMark style={{ color: 'red' }} />
                ) : (
                  <BsCheckLg style={{ color: '#05cc30' }} />
                )}
              </label>
              <div>
                <Field
                  className={styles.formInput}
                  name="dateOfBirth"
                  component={DatePickerField}
                />
              </div>

              <ErrorMessage name="dateOfBirth" component="span" />
            </div>

            <div className={styles.inputBox}>
              <SelectInput
                label="Tipo de Documento: "
                name="documentType"
                type="text"
                className={styles.formInput}
              >
                <option value="" selected disabled hidden>
                  Seleccione
                </option>
                {DOCUMENTTYPES.map((documentType) => (
                  <option key={documentType} value={documentType.toLowerCase()}>
                    {documentType}
                  </option>
                ))}
              </SelectInput>
            </div>

            <div className={styles.inputBox}>
              <FormInput
                label="Número de Documento "
                name="documentNumber"
                type="text"
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputBox}>
              <FormInput
                label="Foto Documento - Frente "
                name="documentImageFront"
                type="file"
                accept="image/png, image/jpeg"
                value={undefined}
              />
            </div>

            <div className={styles.inputBox}>
            <FormInput
                label="Foto Documento - Reverso "
                name="documentImageBack"
                type="file"
                accept="image/png, image/jpeg"
                value={undefined}
              />
            </div>
          </div>

          <button
            className={styles.btnGrad}
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default StepOne;