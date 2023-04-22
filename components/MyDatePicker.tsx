import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/RegisterForm.module.css';

const DatePickerField = ({ field, form, ...props }: any) => (
  <div>
    <DatePicker
      dateFormat="yyyy/mm/dd"
      {...field}
      selected={field.value}
      onChange={(val) => form.setFieldValue(field.name, val)}
      className={styles.formInput}
      showYearDropdown
      scrollableYearDropdown
      showDisabledMonthNavigation
    />
  </div>
);

export default DatePickerField;
