// const person = {
//   name: 'Andrew',
//   age: 43,
//   location: {
//     city: 'Newcastle',
//     temp: 27
//   }
// };

// const { name = 'Anonymous', age } = person;

// console.log(`${name} is ${age}.`);

// const { city, temp: temperature } = person.location;

// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// }

// const { name: publisherName = 'Self Published'} = book.publisher;

// console.log(publisherName);

const address = ['3/401 Darby Street', 'Bar Beach', 'New South Wales', '2300'];
const [, city, state] = address;
console.log(`You are in ${city}, ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [menuItem, , mediumPrice] = item;
console.log(`A medium ${menuItem} costs ${mediumPrice}`);