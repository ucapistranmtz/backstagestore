const config = {
  backendPort: process.env.BACKEND_PORT || 8080,
  dbUrl:
    process.env.DB_URL ||
    'mongodb+srv://ucapistran:Roma2020@ucapistran2022.rj3hi.mongodb.net/backstageStore?retryWrites=true&w=majority',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwt: {
    secret: process.env.JWT_SECRET || '10Bits',
  },
};

module.exports = config;
