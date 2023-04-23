import { Color, useTheme } from "@mui/material";

type KeyColor = keyof Color;

export const useGetDefaultThemeColor = ({
  lightWeight = 100,
  darkWeight = 900,
}: { lightWeight?: KeyColor; darkWeight?: KeyColor } = {}) => {
  const { palette } = useTheme();
  return palette.mode === "light" ? palette.grey[lightWeight] : palette.grey[darkWeight];
};
