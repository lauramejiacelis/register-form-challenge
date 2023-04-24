import { ErrorMessage, useField } from 'formik';
import { BsCheckLg } from 'react-icons/bs';
import { HiXMark } from 'react-icons/hi2';

export const FormInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>
        {label}
        {(meta.touched && meta.error) || meta.value === meta.initialValue ? (
          <HiXMark style={{ color: 'red' }} />
        ) : (
          <BsCheckLg style={{ color: '#05cc30' }} />
        )}
      </label>
      <input {...field} {...props} />
      <ErrorMessage name={props.name} component="span" />
    </>
  );
};

export const SelectInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.name}>
        {label}
        {(meta.touched && meta.error) || meta.value === meta.initialValue ? (
          <HiXMark style={{ color: 'red' }} />
        ) : (
          <BsCheckLg style={{ color: '#05cc30' }} />
        )}
      </label>
      <select {...field} {...props} />
      <ErrorMessage name={props.name} component="span" />
    </div>
  );
};
