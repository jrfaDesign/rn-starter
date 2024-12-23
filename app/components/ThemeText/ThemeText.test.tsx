import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ThemeText from ".";

describe("ThemeText Component", () => {
  it("renders with default text styles", () => {
    const { getByTestId } = render(<ThemeText>Test Text</ThemeText>);

    const textElement = getByTestId("themetext");
    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 16 }),
        expect.objectContaining({ color: expect.any(String) })
      ])
    );
  });

  it("renders with custom color", () => {
    const { getByTestId } = render(<ThemeText color="red">Custom Color Text</ThemeText>);

    const textElement = getByTestId("themetext");
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "red" })])
    );
  });

  it("renders with custom font size", () => {
    const { getByTestId } = render(<ThemeText size={20}>Custom Font Size</ThemeText>);

    const textElement = getByTestId("themetext");
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ fontSize: 20 })])
    );
  });

  it("renders with custom font weight", () => {
    const { getByTestId } = render(<ThemeText fontWeight="700">Bold Text</ThemeText>);

    const textElement = getByTestId("themetext");
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ fontWeight: "700" })])
    );
  });

  it("renders with monospace style", () => {
    const { getByTestId } = render(<ThemeText monospace={true}>Monospace Text</ThemeText>);

    const textElement = getByTestId("themetext");
    expect(textElement.props.numberOfLines).toBe(1);
  });

  it("renders with the correct number of lines", () => {
    const { getByTestId } = render(<ThemeText numberOfLines={2}>Multiline Text</ThemeText>);

    const textElement = getByTestId("themetext");
    expect(textElement.props.numberOfLines).toBe(2);
  });

  it("triggers onPress event when clicked", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<ThemeText onPress={mockOnPress}>Press Me</ThemeText>);

    const textElement = getByTestId("themetext");
    fireEvent.press(textElement);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("renders with custom styles passed via props", () => {
    const { getByTestId } = render(
      <ThemeText style={{ fontStyle: "italic", fontSize: 18 }}>Styled Text</ThemeText>
    );

    const textElement = getByTestId("themetext");
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontStyle: "italic" }),
        expect.objectContaining({ fontSize: 18 })
      ])
    );
  });
});
