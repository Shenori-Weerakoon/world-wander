const API_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = async () => {
  const response = await fetch(`${API_URL}/all`);
  return response.json();
};

export const fetchCountryByName = async (name) => {
  const response = await fetch(`${API_URL}/name/${name}`);
  return response.json();
};

export const fetchCountriesByRegion = async (region) => {
  const response = await fetch(`${API_URL}/region/${region}`);
  return response.json();
};

export const fetchCountryByCode = async (code) => {
  const response = await fetch(`${API_URL}/alpha/${code}`);
  return response.json();
};