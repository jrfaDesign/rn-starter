// jest.setup.js
import "@testing-library/jest-native/extend-expect";
require("react-native-reanimated").setUpTests();

jest.mock("@expo/vector-icons", () => {
  const MockIcon = (props) => <div {...props} />;

  return new Proxy(
    {},
    {
      get: (target, name) => {
        if (name === "__esModule") {
          return true; // Required for handling ES Module imports correctly
        }
        return MockIcon;
      }
    }
  );
});
