import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Checkbox from ".";

describe("Checkbox Component", () => {
  it("renders correctly", () => {
    const mockSetChecked = jest.fn();
    const { getByTestId } = render(<Checkbox checked={false} setChecked={mockSetChecked} />);

    expect(getByTestId("checkbox-container")).toBeTruthy();
  });

  it("calls setChecked when pressed", () => {
    const mockSetChecked = jest.fn();
    const { getByTestId } = render(<Checkbox checked={false} setChecked={mockSetChecked} />);

    const checkbox = getByTestId("checkbox-container");
    fireEvent.press(checkbox);

    expect(mockSetChecked).toHaveBeenCalledTimes(1);
    expect(mockSetChecked).toHaveBeenCalledWith(true);
  });
});
