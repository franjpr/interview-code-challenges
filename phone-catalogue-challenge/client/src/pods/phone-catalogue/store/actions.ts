import { PhoneVm } from '../phones.vm';
import { IAction } from './action.interface';
import { actionsIds } from './action-ids';

export const updatePhonesCollection = (collection: PhoneVm[]): IAction => ({
  type: actionsIds.UPDATE_PHONE_COLLECTION,
  payload: collection,
});

export const updateLoadingStatus = (value: boolean): IAction => ({
  type: actionsIds.UPDATE_LOADING_STATUS,
  payload: value,
});
