export default () => ({
  // Api key from the environment variables
  apiKey: process.env.API_KEY || '',
  apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
});
