import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formSchema } from '@/utils/validationSchema';
import { COUNTRIES, GENDERS, DOCUMENTTYPES } from '@/utils/Constants';
import DatePickerField from './MyDatePicker';
import Modal from './Modal';
import useModal from '@/hooks/useModal';
import { BsFillClipboardCheckFill, BsCheckLg } from 'react-icons/bs';
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
  email: string;
  password: string;
  confirmPassword: string | null;
  tel: number;
  cel: number;
  address: string;
  zipCode: number;
}

const RegisterForm = () => {
  const [formData, setFormData] = useState<Object>({});

  const { isOpen, toggle } = useModal();

  const initialValues: FormValues = {
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
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    setFormData(values);
    toggle();
    //formik.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        {(formik) => (
          <Form>
            <div className={styles.formContainer}>
              <div className={styles.title}>Formulario de Registro</div>
              <div className={styles.userInfo}>
                <div className={styles.inputBox}>
                  <label htmlFor="country">País</label>
                  <Field
                    className={styles.formInput}
                    name="country"
                    as="select"
                    label="country"
                    type="text"
                    error={formik.errors.country}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione
                    </option>
                    {COUNTRIES.map((country, index) => (
                      <option key={index} value={country.toLowerCase()}>
                        {country}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="country" component="span" />
                </div>
                <div className={styles.inputBox}>
                  <label htmlFor="gender">Género</label>
                  <Field
                    className={styles.formInput}
                    name="gender"
                    as="select"
                    label="gender"
                    type="text"
                    error={formik.errors.gender}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione
                    </option>
                    {GENDERS.map((gender, index) => (
                      <option key={index} value={gender.toLowerCase()}>
                        {gender}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="gender" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="firstName">
                    Primer Nombre:
                    {formik.errors.firstName ? (
                      <HiXMark style={{ color: 'red' }} />
                    ) : (
                      <BsCheckLg style={{ color: '#05cc30' }} />
                    )}
                  </label>

                  <Field
                    className={styles.formInput}
                    name="firstName"
                    as="input"
                    type="text"
                    error={formik.errors.firstName}
                  />

                  <ErrorMessage name="firstName" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="lastName">Segundo Nombre: </label>
                  <Field
                    className={styles.formInput}
                    name="lastName"
                    as="input"
                    type="text"
                    error={formik.errors.lastName}
                  />
                  <ErrorMessage name="lastName" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="dateOfBirth">Fecha de Nacimiento: </label>
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
                  <label htmlFor="documentType">Tipo de Documento: </label>
                  <Field
                    className={styles.formInput}
                    name="documentType"
                    as="select"
                    type="text"
                    error={formik.errors.documentType}
                  >
                    <option value="" selected disabled hidden>
                      Seleccione
                    </option>
                    {DOCUMENTTYPES.map((documentType, index) => (
                      <option key={index} value={documentType.toLowerCase()}>
                        {documentType}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="documentType" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="documentNumber">Número de Documento: </label>
                  <Field
                    className={styles.formInput}
                    name="documentNumber"
                    as="input"
                    error={formik.errors.documentNumber}
                    type="text"
                  />
                  <ErrorMessage name="documentNumber" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="documentImageFront">
                    Foto Documento - Frente:{' '}
                  </label>
                  <Field
                    name="documentImageFront"
                    as="input"
                    error={formik.errors.documentImageFront}
                    type="file"
                    accept="image/png, image/jpeg"
                  />
                  <ErrorMessage name="documentImageFront" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="documentImageBack">
                    Foto Documento - Reverso:{' '}
                  </label>
                  <Field
                    name="documentImageBack"
                    as="input"
                    error={formik.errors.documentImageBack}
                    type="file"
                    accept="image/png, image/jpeg"
                  />
                  <ErrorMessage name="documentImageBack" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="email">Correo Electrónico</label>
                  <Field
                    className={styles.formInput}
                    name="email"
                    as="input"
                    type="email"
                    error={formik.errors.email}
                  />
                  <ErrorMessage name="email" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="password">Contraseña</label>
                  <Field
                    className={styles.formInput}
                    name="password"
                    as="input"
                    type="password"
                    error={formik.errors.password}
                  />
                  <ErrorMessage name="password" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="password">Confirmar Contraseña</label>
                  <Field
                    className={styles.formInput}
                    name="confirmPassword"
                    as="input"
                    type="password"
                    error={formik.errors.confirmPassword}
                  />
                  <ErrorMessage name="confirmPassword" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="tel">Número de Teléfono: </label>
                  <Field
                    className={styles.formInput}
                    name="tel"
                    as="input"
                    error={formik.errors.tel}
                  />
                  <ErrorMessage name="tel" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="cel">Número de Celular: </label>
                  <Field
                    className={styles.formInput}
                    name="cel"
                    as="input"
                    error={formik.errors.cel}
                  />
                  <ErrorMessage name="cel" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="address">Dirección de Residencia: </label>
                  <Field
                    className={styles.formInput}
                    name="address"
                    as="input"
                    error={formik.errors.address}
                  />
                  <ErrorMessage name="address" component="span" />
                </div>

                <div className={styles.inputBox}>
                  <label htmlFor="zipCode">Código Postal: </label>
                  <Field
                    className={styles.formInput}
                    name="zipCode"
                    as="input"
                    error={formik.errors.zipCode}
                  />
                  <ErrorMessage name="zipCode" component="span" />
                </div>
              </div>

              <button
                className={styles.btnGrad}
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
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

export default RegisterForm;
