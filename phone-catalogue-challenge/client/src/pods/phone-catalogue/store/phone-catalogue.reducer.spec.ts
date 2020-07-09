import { defaultPhoneCatalogueState } from '.';
import { phoneCatalogueReducer } from './phone-catalogue.reducer';
import { actionsIds } from './action-ids';
import { IAction } from './action.interface';
import { createTestPhoneVm } from '../phones.vm';

describe('phone-catalogue reducer specs', () => {
  it('Updates the loadingStatus ', () => {
    const initialState = defaultPhoneCatalogueState();

    const action: IAction = {
      type: actionsIds.UPDATE_LOADING_STATUS,
      payload: false,
    };

    const updatedState = phoneCatalogueReducer(initialState, action);

    expect(updatedState).toEqual({
      ...initialState,
      isLoading: false,
    });
  });

  it('Updates the phone collection ', () => {
    const initialState = defaultPhoneCatalogueState();

    const action: IAction = {
      type: actionsIds.UPDATE_PHONE_COLLECTION,
      payload: [createTestPhoneVm('testPhone')],
    };

    const updatedState = phoneCatalogueReducer(initialState, action);

    expect(updatedState).toEqual({
      ...initialState,
      phoneCollection: [createTestPhoneVm('testPhone')],
    });
  });
});
