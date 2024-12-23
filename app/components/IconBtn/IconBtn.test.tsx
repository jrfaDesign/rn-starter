import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import IconBtn from ".";

describe("IconBtn Component", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<IconBtn from="Ionicons" name="home" />);

    const button = getByTestId("icon-btn");
    expect(button).toBeTruthy();
  });

  it("applies custom styles passed via iconBackgroundStyles", () => {
    const customStyles = { backgroundColor: "red" };
    const { getByTestId } = render(
      <IconBtn from="Ionicons" name="home" iconBackgroundStyles={customStyles} />
    );

    const button = getByTestId("icon-btn").children[0];
    expect(button.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: "red" })])
    );
  });

  it("calls onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<IconBtn from="Ionicons" name="home" onPress={mockOnPress} />);

    const button = getByTestId("icon-btn");
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is true", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <IconBtn from="Ionicons" name="home" disabled onPress={mockOnPress} />
    );

    const button = getByTestId("icon-btn");
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
