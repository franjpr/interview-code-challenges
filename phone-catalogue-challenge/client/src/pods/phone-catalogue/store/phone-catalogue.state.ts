import { PhoneVm } from '../phones.vm';

export interface PhoneCatalogueState {
  phoneCollection: PhoneVm[];
  setPhoneCollection: (phones: PhoneVm[]) => void;
  isLoading: boolean;
}
export const defaultPhoneCatalogueState = (): PhoneCatalogueState => ({
  phoneCollection: [],
  setPhoneCollection: (phones: PhoneVm[]) => {},
  isLoading: true,
});
