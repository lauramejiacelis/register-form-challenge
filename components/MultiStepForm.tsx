import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormInput, SelectInput } from './FormInput';
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
} from '@/utils/validationSchema';
import { COUNTRIES, GENDERS, DOCUMENTTYPES } from '@/utils/Constants';
import DatePickerField from './MyDatePicker';
import Modal from './Modal';
import useModal from '@/hooks/useModal';
import { BsFillClipboardCheckFill, BsCheckLg } from 'react-icons/bs';
import { HiXMark } from 'react-icons/hi2';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

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
  email: string;
  password: string;
  confirmPassword: string | null;
  tel: number;
  cel: number;
  address: string;
  zipCode: number;
}

const MultiStepForm = () => {
  const [data, setData] = useState<FormValues>({
    country: '',
    gender: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    documentType: '',
    documentNumber: '',
    documentImageFront: '',
    documentImageBack: '',
    email: '',
    password: '',
    confirmPassword: '',
    tel: 0,
    cel: 0,
    address: '',
    zipCode: 0,
  });

  const [formData, setFormData] = useState<Object>({});

  const { isOpen, toggle } = useModal();

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (newData: any, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    setCurrentStep((prev: number) => {
      if (prev + 1 === steps.length) {
        setFormData(newData);
        toggle();
        return prev;
      }
      return prev + 1;
    });
  };

  const handlePrevStep = (newData: any) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne key={0} next={handleNextStep} data={data} label={'Paso 1'} />,
    <StepTwo
      key={1}
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
      label={'Paso 2'}
    />,
    <StepThree
      key={2}
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
      label={'Paso 3'}
    />,
  ];

  return (
    <>
      <div className={styles.formContainer}>
        <Stepper alternativeLabel activeStep={currentStep}>
          {steps.map((child) => (
            <Step key={child.props.label}>
              <StepLabel>{child.props.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={styles.title}>Formulario de Registro</div>
        {steps[currentStep]}
      </div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <div className={styles.successMessage}>
          <p>Your data was sent successfully!!!</p>
          <div>
            <BsFillClipboardCheckFill className={styles.icon} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MultiStepForm;

const StepOne = (props: any) => {
  //review this type
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    props.next(values);
  };
  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={stepOneSchema}
      label="step 1"
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

const StepTwo = (props: any) => {
  //review this type
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    props.next(values);
  };

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={stepTwoSchema}
      label="step 2"
    >
      {(formik) => (
        <Form>
          <div className={styles.userInfo}>
            <div className={styles.inputBox}>
              <FormInput
                label="Correo Electrónico"
                name="email"
                type="email"
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputBox}>
              <FormInput
                label="Contraseña"
                name="password"
                type="password"
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputBox}>
              <FormInput
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputBox}>
              <FormInput
                label="Número de Teléfono "
                name="tel"
                type="number"
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputBox}>
              <FormInput
                label="Número de Celular "
                name="cel"
                type="number"
                className={styles.formInput}
              />
            </div>
          </div>

          <button
            className={styles.btnGrad}
            type="button"
            onClick={() => props.prev(formik.values)}
          >
            Back
          </button>

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

const StepThree = (props: any) => {
  //review this type
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    props.next(values, true);
  };

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={stepThreeSchema}
      label="step 3"
    >
      {(formik) => (
        <Form>
          <div className={styles.userInfo}>
            <div className={styles.inputBox}>
              <FormInput
                label="Dirección de Residencia "
                name="address"
                type="text"
                className={styles.formInput}
              />
            </div>

            <div className={styles.inputBox}>
              <FormInput
                label="Código Postal "
                name="zipCode"
                type="number"
                className={styles.formInput}
              />
            </div>
          </div>

          <button
            className={styles.btnGrad}
            type="button"
            onClick={() => props.prev(formik.values)}
          >
            Back
          </button>

          <button
            className={styles.btnGrad}
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
