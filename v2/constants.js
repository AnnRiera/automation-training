const { faker } = require('@faker-js/faker');

const quantity = 30;
const zeroValue = 0;
const pointQuantity = faker.number.float();
const negativeQuantity = faker.number.int({ min: -30, max: -1 });
const word = faker.lorem.word();
const subject = faker.lorem.lines(1);
const comment = faker.lorem.paragraphs(5);
const userInfo = {
    firstName: faker.person.firstName('female'),
    lastName: faker.person.lastName('female'),
    fullName: faker.person.fullName({ sex: 'female' }),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dayOfBirth: faker.date.birthdate().getDay(),
    monthOfBirth: faker.date.birthdate().getMonth(),
    yearOfBirth: faker.date.birthdate().getFullYear(),
    company: faker.company.name(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    country: faker.location.country(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    payment: {
      cardName: faker.person.fullName({ sex: 'female' }),
      cardNumber: faker.finance.creditCardNumber(),
      cvv: faker.finance.creditCardCVV,
      expirationMonth: faker.date.future({ years: 5 }).getMonth(),
      expirationYear: faker.date.future({ years: 5 }).getDate(),
    },
    invalidName: faker.string.hexadecimal({ length: 6, prefix: '#' }),
};

module.exports = { quantity, subject, comment, pointQuantity, negativeQuantity, word, zeroValue, userInfo };