const light = {
  theme: "light" as const,
  text: "#212121",
  textLight: "#9F9F9F",
  primary: "#8985E3",
  lightPrimary: "#C6C4F4",
  superLightPrimary: "#F6F5FB",
  background: "#F5F5F5",
  backgroundContainer: "#FFFFFF",
  border: "#E8E8E8",
  grey: "#ced0d2",
  success: "#08bc6e",
  error: "#e73838",
  warning: "#ffc107"
};

const dark = {
  theme: "dark" as const,
  text: "#FDFDFD",
  textLight: "#e2dede",
  primary: "#8985E3",
  lightPrimary: "#515185",
  superLightPrimary: "#37383D",
  background: "#181A1F",
  backgroundContainer: "#20222A",
  border: "#262A35",
  grey: "#434545",
  success: "#0cc072",
  error: "#e34343",
  warning: "#ffc107"
};

const Colors = { light, dark };
export default Colors;
