import React from "react";
import { render, screen } from "@testing-library/react-native";
import TestScript from ".";

describe("TestScript", () => {
    it("should render the component and show the code", () => {
      render(<TestScript />);
      screen.debug(); // This will print the component's rendered output in the console
    });
});
