import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from ".";

describe("Button Component", () => {
  it("renders correctly with text", () => {
    const { getByTestId } = render(<Button onPress={() => {}} text="Click Me" />);

    const buttonText = getByTestId("themetext");
    expect(buttonText).toBeTruthy();
    expect(buttonText.props.children).toBe("Click Me");
  });

  it("renders correctly with an image", () => {
    const { getByTestId } = render(
      <Button onPress={() => {}} image={{ uri: "https://example.com/image.png" }} />
    );

    const image = getByTestId("button-img");
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe("https://example.com/image.png");
  });

  it("shows loading indicator when loading is true", () => {
    const { getByTestId } = render(<Button onPress={() => {}} loading={true} />);

    const loadingIndicator = getByTestId("button-loading");
    expect(loadingIndicator).toBeTruthy();
    expect(loadingIndicator.type).toBe("ActivityIndicator");
  });

  it("calls onPress when the button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<Button onPress={onPressMock} text="Click Me" />);

    const button = getByTestId("button-pressable");
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("applies correct background color for default state", () => {
    const { getByTestId } = render(<Button onPress={() => {}} text="Click Me" />);

    const buttonContainer = getByTestId("button-container");
    expect(buttonContainer.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: expect.any(String) })])
    );
  });

  it("applies correct background color when disabled", () => {
    const { getByTestId } = render(<Button onPress={() => {}} text="Click Me" disabled={true} />);

    const buttonContainer = getByTestId("button-container");
    expect(buttonContainer.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: expect.any(String) })])
    );
  });

  it("applies correct border color based on variant", () => {
    const { getByTestId } = render(<Button onPress={() => {}} text="Click Me" variant="outline" />);

    const buttonContainer = getByTestId("button-container");
    expect(buttonContainer.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderColor: expect.any(String) })])
    );
  });
});
