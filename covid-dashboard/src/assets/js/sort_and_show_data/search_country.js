// show country start with the entered name
import { showGlobalData } from './show_global_data';

export default function searchCountry(arrCountryList) {
  const value = `^${document.querySelector('#country').value}`.toLowerCase();
  // eslint-disable-next-line max-len
  showGlobalData(arrCountryList.filter((el) => el[0].toLowerCase().match(value)));
}
