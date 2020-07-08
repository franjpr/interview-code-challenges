import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { PhoneVm } from './phones.vm';
import { mapToCollection } from '../../common';
import { mapFromApiToVm } from './phone-collection.mapper';
const serverUrl: string = `${process.env.SERVER_URL}`;

export const getPhones = (): Promise<AxiosResponse<PhoneVm[]>> => {
  let url = `${serverUrl}/api/phones`;
  return axios.get(url).then((r) => {
    r.data = mapToCollection<any, PhoneVm>(r.data, mapFromApiToVm);
    return r;
  });
};
