import { PhoneCatalogueComponent, EMPTY_LIST_MESSAGE } from "../phone-catalogue.component"
import React from 'react';
import { render } from "@testing-library/react";
import { createTestPhoneVm } from "../phones.vm";

describe('Phone catalogue component specs', () => {
  it('should display loading symbol', () => {
    // Arrange
    const props = {
      phonesCollection: [],
      isLoading: true
    }

    const { queryByTestId } = render(<PhoneCatalogueComponent {...props}></PhoneCatalogueComponent>);
    const spinner = queryByTestId('spinnerTestId');

    expect(spinner).toBeInTheDocument();
  })

  it('should not display loading symbol when isLoading = false', () => {
    // Arrange
    const props = {
      phonesCollection: [],
      isLoading: false
    }

    const { queryByTestId } = render(<PhoneCatalogueComponent {...props}></PhoneCatalogueComponent>);
    const spinner = queryByTestId('spinnerTestId');

    expect(spinner).not.toBeInTheDocument();
    expect(spinner).toBeNull();
  })

  it('should render a message when there are no phones to show', () => {
    // Arrange
    const props = {
      phonesCollection: [],
      isLoading: false
    }

    const { queryByText } = render(<PhoneCatalogueComponent {...props}></PhoneCatalogueComponent>);
    const message = queryByText(EMPTY_LIST_MESSAGE);

    expect(message).toBeInTheDocument();
    expect(message.textContent).toEqual(EMPTY_LIST_MESSAGE)
  })

  it('should render a table with a phone collection', () => {
    // Arrange
    const props = {
      phonesCollection: [createTestPhoneVm('testPhone')],
      isLoading: false
    }

    const { queryAllByText } = render(<PhoneCatalogueComponent {...props}></PhoneCatalogueComponent>);
    const phoneRows = queryAllByText('testPhone');
    const rowsContents = phoneRows.map(item => item.textContent);
    const isPhoneInCollection = rowsContents.indexOf('testPhone') !== -1;
    expect(phoneRows).toHaveLength(1);
    expect(isPhoneInCollection).toBeTruthy()
  })
})