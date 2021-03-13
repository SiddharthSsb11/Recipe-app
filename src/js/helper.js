//import { API_URL } from './config.js';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

export const getJSON = async function(url){
    try {

      const response = await Promise.race([ timeout(TIMEOUT_SEC), fetch(url)]) ;
      const data = await response.json();
      if (!response.ok) throw new Error(`${data.message} (${response.status})`);
      return data;

    } catch (error) {
      console.error(`x*X*X*x ${error} x*X*X*x`);
      throw error;
    }
}