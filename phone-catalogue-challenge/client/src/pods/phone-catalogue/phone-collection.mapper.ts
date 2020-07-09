import { PhoneVm, createDefaultPhoneVm } from './phones.vm';

export const mapFromApiToVm = (phone: any): PhoneVm => {
  if (!phone) {
    return createDefaultPhoneVm();
  }

  return {
    id: phone.id,
    name: phone.name,
    manufacturer: phone.manufacturer,
    description: phone.description,
    color: phone.color,
    price: phone.price,
    image_url: phone.imageFileName,
    screen: phone.screen,
    processor: phone.processor,
    ram: phone.ram,
  };
};
