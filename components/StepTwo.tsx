import { Formik, Form} from 'formik';
import { FormInput} from './FormInput';
import {
  stepTwoSchema,
} from '@/utils/validationSchema';
import styles from '../styles/RegisterForm.module.css';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string | null;
  tel: number;
  cel: number;
}

const StepTwo = (props: any) => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    props.next(values);
  };

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={stepTwoSchema}
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

export default StepTwo;