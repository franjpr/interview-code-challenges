import { PhoneVm, createDefaultPhoneVm, createTestPhoneVm } from '../phones.vm';
import { mapFromApiToVm } from '../phone-collection.mapper';

describe('PhoneCollection mapper specs', () => {
  it('should return the default PhoneVm when its fed with undefined', () => {
    // Arrange
    const apiModel = undefined;
    const defaultVm = createDefaultPhoneVm();

    //Act
    const viewModel: PhoneVm = mapFromApiToVm(apiModel);

    //Assert
    expect(viewModel).toStrictEqual(defaultVm);
  });

  it('maps the given phone ', () => {
    // Arrange
    const apiModel = {
      id: -1,
      name: 'testPhone',
      manufacturer: 'testManufacturer',
      description: '',
      color: '',
      price: 0,
      imageFileName: 'someUrl',
      screen: '',
      processor: '',
      ram: 0,
    };
    const testVm = createTestPhoneVm('testPhone');
    testVm.manufacturer = 'testManufacturer';
    testVm.image_url = 'someUrl';

    //Act
    const viewModel: PhoneVm = mapFromApiToVm(apiModel);

    //Assert
    expect(viewModel).toStrictEqual(testVm);
  });
});
