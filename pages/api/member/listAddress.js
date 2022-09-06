import Axios from 'axios';
import { baseUrlApi, setJsonResponse } from '../../../custom/contoh';

const getListAddress = async (memberId) => {
  await Axios.get(`${baseUrlApi}/api/v2/getListAddressMember/${memberId}`)
    .then((res) => {
      const { data, status } = res;
      if (status === 200) {
        return setJsonResponse(data);
      }
      return setJsonResponse(data);
    });
};
export default getListAddress;
