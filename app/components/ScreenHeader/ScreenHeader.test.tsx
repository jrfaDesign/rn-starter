import { render } from "@testing-library/react-native";
import ScreenHeader from ".";
import React from "react";
import { View } from "react-native";

describe("ScreenHeader Component", () => {
  it("renders title when provided", () => {
    const { getByText } = render(<ScreenHeader title="Test Title" />);

    const title = getByText("Test Title");
    expect(title).toBeTruthy();
  });

  it("does not render title when not provided", () => {
    const { queryByTestId } = render(<ScreenHeader />);

    const title = queryByTestId("text-container");
    expect(title).toBeNull();
  });

  it("renders top left icon when provided", () => {
    const { getByTestId } = render(
      <ScreenHeader topLeftIcon={[<View key="1" testID="top-left-icon" />]} />
    );

    const icon = getByTestId("top-left-icon");
    expect(icon).toBeTruthy();
  });

  it("renders top right icon when provided", () => {
    const { getByTestId } = render(
      <ScreenHeader topRightIcon={[<View key="1" testID="top-right-icon" />]} />
    );

    const icon = getByTestId("top-right-icon");
    expect(icon).toBeTruthy();
  });

  it("renders center component when provided instead of title", () => {
    const { getByTestId } = render(
      <ScreenHeader centerComponent={<View testID="center-component" />} />
    );

    const centerComponent = getByTestId("center-component");
    expect(centerComponent).toBeTruthy();
  });

  it("applies correct default styles when no content is passed", () => {
    const { getByTestId } = render(<ScreenHeader />);

    const container = getByTestId("safearea-container");
    const style = container.props.style;

    expect(style[0].minHeight).toBe(0);
    expect(style[0].marginBottom).toBe(20);
  });

  it("renders correctly when title, topLeftIcon, and topRightIcon are all passed", () => {
    const { getByTestId, getByText } = render(
      <ScreenHeader
        title="Screen Title"
        topLeftIcon={[<View key="1" testID="top-left-icon" />]}
        topRightIcon={[<View key="1" testID="top-right-icon" />]}
      />
    );

    const title = getByText("Screen Title");
    expect(title).toBeTruthy();

    const topLeftIcon = getByTestId("top-left-icon");
    expect(topLeftIcon).toBeTruthy();

    const topRightIcon = getByTestId("top-right-icon");
    expect(topRightIcon).toBeTruthy();
  });
});
