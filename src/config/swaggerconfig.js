export default {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        description:"Como usar los endpoints y sus parametros",
        version: '1.0.0',
      },
    },
    apis: ['./src/docs/*.yml'], // files containing annotations as above
  };

