import { render, fireEvent } from "@testing-library/react-native";
import Input from ".";
import React from "react";

describe("Input Component", () => {
  it("renders with the correct placeholder based on type", () => {
    const { getByPlaceholderText } = render(<Input value="" setValue={() => {}} type="email" />);

    const input = getByPlaceholderText("Enter your email");
    expect(input).toBeTruthy();
  });

  it("renders the password input with eye icon", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Input value="" setValue={() => {}} type="password" />
    );

    const input = getByPlaceholderText("Enter your password");
    const eyeIconPressable = getByTestId("input-password-icon-pressable");
    expect(input).toBeTruthy();
    expect(eyeIconPressable).toBeTruthy();
  });

  it("toggles the password visibility when the eye icon is pressed", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Input value="" setValue={() => {}} type="password" />
    );

    const input = getByPlaceholderText("Enter your password");
    const eyeIconPressable = getByTestId("input-password-icon-pressable");

    expect(input.props.secureTextEntry).toBe(true);

    fireEvent.press(eyeIconPressable);
    expect(input.props.secureTextEntry).toBe(false);

    fireEvent.press(eyeIconPressable);
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("changes value when user types into the input", () => {
    const setValue = jest.fn();
    const { getByTestId } = render(<Input value="Test" setValue={setValue} type="text" />);

    const input = getByTestId("text-input");
    fireEvent.changeText(input, "New value");

    expect(setValue).toHaveBeenCalledWith("New value");
  });

  it("renders error message when errorMsg prop is passed", () => {
    const { getByTestId, getByText } = render(
      <Input value="" setValue={() => {}} type="text" errorMsg="This field is required" />
    );

    const errorMessage = getByText("This field is required");
    expect(errorMessage).toBeTruthy();

    const errorContainer = getByTestId("input-error-container");
    expect(errorContainer).toBeTruthy();
  });

  it("changes input style based on the containerStyle and inputStyle props", () => {
    const customContainerStyle = { backgroundColor: "lightblue" };
    const customInputStyle = { color: "red" };

    const { getByTestId } = render(
      <Input
        value="Test"
        setValue={() => {}}
        type="text"
        containerStyle={customContainerStyle}
        inputStyle={customInputStyle}
      />
    );

    const inputContainer = getByTestId("input-container");
    const input = getByTestId("text-input");

    expect(inputContainer.props.style).toMatchObject(customContainerStyle);

    expect(input.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customInputStyle)])
    );
  });
  it("focuses the input field when the container is pressed", () => {
    const { getByTestId } = render(<Input value="" setValue={() => {}} type="text" />);

    const pressableContainer = getByTestId("input-presable");
    const input = getByTestId("text-input");

    fireEvent.press(pressableContainer);

    expect(input.props.onFocus).toBeTruthy();
  });

  it("renders multiline input when multiline prop is true", () => {
    const { getByTestId } = render(
      <Input value="" setValue={() => {}} type="text" multiline={true} />
    );

    const input = getByTestId("text-input");
    expect(input.props.multiline).toBe(true);
    expect(input.props.style).toEqual(
      expect.arrayContaining([{ height: 100, textAlignVertical: "top" }])
    );
  });
});
