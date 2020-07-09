import React from 'react'
import { render } from "@testing-library/react"
import { SpinnerComponent } from "../spinner.component"

describe('Spinner Component specs', () => {
  it('should render a spinner', () => {
    const { getByTestId } = render(<SpinnerComponent></SpinnerComponent>)

    const element = getByTestId('spinnerTestId');
    expect(element).toBeInTheDocument();
  })
})