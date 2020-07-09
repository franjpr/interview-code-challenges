export interface PhoneVm {
  id: number;
  image_url: string;
  name: string;
  manufacturer: string;
  price: number;
  description: string;
  color: string;
  screen: string;
  processor: string;
  ram: number;
}

export const createDefaultPhoneVm = (): PhoneVm => ({
  id: -1,
  image_url: '',
  name: '',
  manufacturer: '',
  price: 0,
  description: '',
  color: '',
  screen: '',
  processor: '',
  ram: 0,
});

export const createTestPhoneVm = (name: string): PhoneVm => ({
  id: -1,
  image_url: '',
  name: name,
  manufacturer: '',
  price: 0,
  description: '',
  color: '',
  screen: '',
  processor: '',
  ram: 0,
});
