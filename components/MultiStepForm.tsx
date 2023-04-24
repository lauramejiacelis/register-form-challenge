import { useState } from 'react';
import StepOne  from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import Modal from './Modal';
import useModal from '@/hooks/useModal';
import { BsFillClipboardCheckFill, } from 'react-icons/bs';
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