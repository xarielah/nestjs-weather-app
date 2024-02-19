export default () => ({
  // Api key from the environment variables
  apiUrl:
    'https://api.openweathermap.org/data/2.5/weather?appid=' +
    (process.env.API_KEY || ''),
});
