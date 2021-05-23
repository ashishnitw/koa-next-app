import axios from 'axios';

const baseUrl = 'https://corona.lmao.ninja/v3/covid-19';

export const fetchWorldData = async () => {
  try {
    let url = `${baseUrl}/all`;
    const { data: { cases, active, recovered, deaths, updated, todayCases, todayDeaths } } = await axios.get(url);
    return { cases, active, recovered, deaths, updated, todayCases, todayDeaths };
  } catch (error) {
    return error;
  }
};