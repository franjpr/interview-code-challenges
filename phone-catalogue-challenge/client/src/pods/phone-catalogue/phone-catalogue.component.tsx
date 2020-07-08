import React from "react";
import Box from '@material-ui/core/Box'
import { PhonesTableComponent } from "./components/phones-table.component";
import { PhoneVm, createDefaultPhoneVm } from "./phones.vm";
import { SpinnerComponent } from "./components/spinner.component";
import { PhoneDetailsComponent } from "./components/phone-details.component";
export const EMPTY_LIST_MESSAGE = 'There are no phones to show 😮'
interface Props {
  phonesCollection: PhoneVm[],
  isLoading: boolean
}

export const PhoneCatalogueComponent = (props: Props) => {
  const { phonesCollection, isLoading } = props;
  const [isOpen, setOpen] = React.useState(false);
  const [phoneDetails, setPhoneDetails] = React.useState(createDefaultPhoneVm());

  const handleClose = () => {
    setOpen(false);
  };

  const openPhoneDetails = (phone: PhoneVm) => {
    setOpen(true);
    setPhoneDetails(phone);
  }

  return (
    <>
      {isLoading ? <SpinnerComponent></SpinnerComponent> : ''}
      <PhoneDetailsComponent open={isOpen} handleClose={handleClose} phone={phoneDetails}></PhoneDetailsComponent>
      {
        phonesCollection.length ?
          <PhonesTableComponent phonesCollection={phonesCollection} onPhoneClick={openPhoneDetails}></PhonesTableComponent>
          : ''
      }
      {
        !isLoading && phonesCollection.length == 0 ?
          <Box>{EMPTY_LIST_MESSAGE}</Box> : ''}

    </>);
};
