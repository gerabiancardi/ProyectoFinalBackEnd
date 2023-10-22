import { faker } from "@faker-js/faker";

faker.locale = "es";

export const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    //thumbnail:faker.commerce.thumbnail(),
    code: faker.datatype.uuid(),
    stock: faker.datatype.number({
      min: 0,
      max: 500,
    }),
    //category: faker.commerce.category(),
    id: faker.database.mongodbObjectId(),
  };
};