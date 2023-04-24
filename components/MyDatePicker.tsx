import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/RegisterForm.module.css';

const DatePickerField = ({ field, form, ...props }: any) => (
  <div>
    <DatePicker
      dateFormat="yyyy/MM/dd"
      {...field}
      selected={field.value}
      onChange={(val) => form.setFieldValue(field.name, val)}
      className={styles.formInput}
      maxDate={new Date()}
      showYearDropdown
      scrollableYearDropdown
      showDisabledMonthNavigation
      yearDropdownItemNumber={50}
    />
  </div>
);

export default DatePickerField;
