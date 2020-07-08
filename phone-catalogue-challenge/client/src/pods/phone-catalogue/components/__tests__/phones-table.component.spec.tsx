import React from 'react'
import { render, wait, fireEvent } from "@testing-library/react"
import { PhoneDetailsComponent } from '../phone-details.component'
import { createDefaultPhoneVm, createTestPhoneVm, PhoneVm } from '../../phones.vm'
import { PhonesTableComponent } from '../phones-table.component'

describe('PhonesTableComponent specs', () => {

  it('should render 0 rows when there are no phones', () => {
    //Arrange
    const phoneCollection = [];

    // Act
    const { queryAllByTestId } = render(<PhonesTableComponent onPhoneClick={() => { }} phonesCollection={phoneCollection} ></PhonesTableComponent>)
    const tableRows = queryAllByTestId('tableRow');

    // Assert
    expect(tableRows).toHaveLength(0);
  })

  it('should render N rows given N phones in phoneCollection', () => {
    // Arrange
    const phoneCollection = [createTestPhoneVm('phoneA'), createTestPhoneVm('phoneB')];

    // Act
    const { queryAllByTestId } = render(<PhonesTableComponent onPhoneClick={() => { }} phonesCollection={phoneCollection} ></PhonesTableComponent>)
    const tableRows = queryAllByTestId('tableRow');

    // Assert
    expect(tableRows).toHaveLength(2);
  })

  it('click event is fired when clicked on the "VIEW" button', async () => {
    //Arrange
    const phoneCollection = [createTestPhoneVm('phoneA')];
    const onClickStub = jest.fn();

    //Act
    const { queryByText } = render(<PhonesTableComponent onPhoneClick={onClickStub} phonesCollection={phoneCollection} ></PhonesTableComponent>)
    const viewButton = queryByText('View');

    // Assert
    await wait(() => {
      fireEvent.click(viewButton);
      expect(onClickStub).toHaveBeenCalled();
      expect(onClickStub).toHaveBeenCalledWith(phoneCollection[0]);
    })

  })
})