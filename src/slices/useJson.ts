// { useQuery } from 'react-query';
import axios from 'axios'

export const fetchData = async () => {
  const response = await fetch('../whole_Geo.json')
  const data = await response.json()
  return data
}
// fetchData();

// export const useData = () => {
//   return useQuery('data', fetchData);
// };
