const crypto = require('crypto');

const quantity = 30;
const productId = 28;
const subject = 'Test subject';
const comment =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const userInfo = {
  name: 'Jane Doe',
  email: `jane.doe@${crypto.randomBytes(10).toString('hex')}.com`,
  password: 'Abc123.',
  dayOfBirth: '8',
  monthOfBirth: '6',
  yearOfBirth: '1995',
  company: 'Example Company',
  address: '11421 NW 39th ST Doral, FL 33178.',
  country: 'United States',
  state: 'FL',
  city: 'Doral',
  zipCode: '33178',
  phoneNumber: '+1 305 400 87 71',
  payment: {
    cardName: 'Jane Doe',
    cardNumber: '5422533266019495',
    cvv: '748',
    expirationMonth: '05',
    expirationYear: '2030',
  },
};

module.exports = {
  quantity,
  userInfo,
  comment,
  subject,
  productId,
};
