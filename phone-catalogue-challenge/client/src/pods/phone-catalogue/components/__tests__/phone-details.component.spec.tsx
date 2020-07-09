import React from 'react'
import { render } from "@testing-library/react"
import { PhoneDetailsComponent } from '../phone-details.component'
import { createDefaultPhoneVm } from '../../phones.vm'

describe('Phone Details Component specs', () => {

  it('should not render when open equals false', () => {
    //Arrange
    const phone = createDefaultPhoneVm();

    // Act
    const { queryByTestId } = render(<PhoneDetailsComponent handleClose={() => { }} open={false} phone={phone}></PhoneDetailsComponent>)
    const elementByTestId = queryByTestId('dialogTestId');

    // Assert
    expect(elementByTestId).not.toBeInTheDocument();
    expect(elementByTestId).toBeNull()
  })

  it('should render when open equals true', () => {
    // Arrange
    const phone = createDefaultPhoneVm();

    // Act
    const { getByTestId } = render(<PhoneDetailsComponent handleClose={() => { }} open={true} phone={phone}></PhoneDetailsComponent>)
    const elementByTestId = getByTestId('dialogTestId');

    //Assert
    expect(elementByTestId).toBeInTheDocument();
  })

  it('should render when with the given phone', () => {
    //Arrange
    const phone = createDefaultPhoneVm();
    phone.name = "TestName";

    //Act
    const { getByText } = render(<PhoneDetailsComponent handleClose={() => { }} open={true} phone={phone}></PhoneDetailsComponent>)
    const elementByName = getByText(phone.name);

    // Assert
    expect(elementByName).toBeInTheDocument();
    expect(phone.name).toEqual(elementByName.textContent);
  })
})