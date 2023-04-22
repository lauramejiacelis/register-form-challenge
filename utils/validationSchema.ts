import * as Yup from 'yup';

const isRequiredMessage = 'Este campo es obligatorio';
const mustBeNumber = 'Únicamente se permiten números';
const tenDigits = 'Deben ser exactamente 10 dígitos';
const tooShort = 'Muy corta';
const tooLong = 'Muy larga';

export const formSchema = Yup.object().shape({
  country: Yup.string().required(isRequiredMessage),
  gender: Yup.string().required(isRequiredMessage),
  firstName: Yup.string().required(isRequiredMessage).min(3, tooShort),
  lastName: Yup.string().required(isRequiredMessage).min(3, tooShort),
  dateOfBirth: Yup.date()
    .required(isRequiredMessage)
    .max(
      new Date(Date.now() - 3600 * 24 * 365 * 18),
      'Debes ser mayor de 18 años'
    ),
  documentType: Yup.string().required(isRequiredMessage),
  documentNumber: Yup.number()
    .typeError(mustBeNumber)
    .min(5, 'El campo debe tener al menos 5 dígitos')
    .required(isRequiredMessage),
  documentImageFront: Yup.string().required(isRequiredMessage),
  documentImageBack: Yup.string().required(isRequiredMessage),
  email: Yup.string().email().required(isRequiredMessage),
  password: Yup.string()
    .min(6, tooShort)
    .max(10, tooLong)
    .required(isRequiredMessage),
  confirmPassword: Yup.string()
    .required(isRequiredMessage)
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
  tel: Yup.number()
    .required(isRequiredMessage)
    .typeError(mustBeNumber)
    .test('len', tenDigits, (val) => val.toString().length === 10),
  cel: Yup.number()
    .required(isRequiredMessage)
    .typeError(mustBeNumber)
    .test('len', tenDigits, (val) => val.toString().length === 10),
  address: Yup.string().required(isRequiredMessage),
  zipCode: Yup.number()
    .required(isRequiredMessage)
    .typeError('El código postal debe ser un número')
    .test('len', 'Deben ser 5 dígitos', (val) => val.toString().length === 5),
});
