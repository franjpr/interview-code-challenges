import {
  defaultPhoneCatalogueState,
  PhoneCatalogueState,
} from './phone-catalogue.state';
import { IAction } from './action.interface';
import { actionsIds } from './action-ids';
import { PhoneVm } from '../phones.vm';

export const phoneCatalogueReducer = (
  state = defaultPhoneCatalogueState(),
  action: IAction
): PhoneCatalogueState => {
  switch (action.type) {
    case actionsIds.UPDATE_PHONE_COLLECTION:
      return updatePhoneCollectionHandler(state, action.payload);
    case actionsIds.UPDATE_LOADING_STATUS:
      return updateLoadingStatusHandler(state, action.payload);
    default:
      return state;
  }
};

const updatePhoneCollectionHandler = (
  state: PhoneCatalogueState,
  collection: PhoneVm[]
): PhoneCatalogueState => ({
  ...state,
  phoneCollection: collection,
});

const updateLoadingStatusHandler = (
  state: PhoneCatalogueState,
  value: boolean
): PhoneCatalogueState => ({
  ...state,
  isLoading: value,
});
