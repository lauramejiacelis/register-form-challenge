import { Formik, Form} from 'formik';
import { FormInput} from './FormInput';
import {
  stepThreeSchema,
} from '@/utils/validationSchema';
import styles from '../styles/RegisterForm.module.css';

interface FormValues {
  address: string;
  zipCode: number;
}

const StepThree = (props: any) => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    props.next(values, true);
  };

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={stepThreeSchema}
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
export default StepThree;