import React from "react";
import {
  Breadcrumbs,
  Typography,
  Container,
  useTheme,
  Box,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { Link } from "../../navigation/link";
import { useGetDefaultThemeColor } from "../../../utils";
import { HeaderComponent, HeaderPreset, HeaderProps } from "./header.types";
import { useTab } from "~/providers";
import { useLocation } from "react-router-dom";

/**
 * Section used to explain give basic information about the page
 * and put the main actions
 */
export const Header: HeaderComponent = ({
  title,
  subtitle,
  preset = "default",
  actionsVariant = "outlined",
  breadcrumbs,
  actions,
  tabs,
  tabsMode = "panel",
  navigationButton,
}: HeaderProps) => {
  const location = useLocation();
  const { palette } = useTheme();
  const defaultColor = useGetDefaultThemeColor();
  const [selectedTab, setSelectedTab] = useTab();

  const bgColorPresets: Record<HeaderPreset, string> = {
    default: defaultColor,
    primary: palette.primary.main,
    secondary: palette.secondary.main,
    inherit: "inherit",
    transparent: "transparent",
  };
  const bgColor = bgColorPresets[preset];
  const textColorPresets: Record<HeaderPreset, string> = {
    default: palette.getContrastText(bgColorPresets.default),
    primary: palette.primary.contrastText,
    secondary: palette.secondary.contrastText,
    inherit: "inherit",
    transparent: palette.text.primary,
  };
  const textColor = textColorPresets[preset];

  const modedSelectedTab =
    tabsMode === "panel" ? selectedTab : tabs?.findIndex((tab) => tab.href === location.pathname);

  return (
    <Box bgcolor={bgColor} color={textColor}>
      <Container>
        <Box sx={{ py: 3, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Box>
            {navigationButton && (
              <Button
                href={navigationButton.href}
                size="small"
                color="inherit"
                LinkComponent={Link}
                startIcon={navigationButton.icon}
                sx={{ mb: 1 }}
              >
                {navigationButton.text}
              </Button>
            )}
            {breadcrumbs?.length && (
              <Breadcrumbs
                color="inherit"
                separator="›"
                aria-label="breadcrumb"
                sx={{ marginTop: 1 }}
              >
                {breadcrumbs.map(({ id, link, text }) => (
                  <Link
                    key={id}
                    underline="hover"
                    color="inherit"
                    href={link}
                    variant="body2"
                    role="link"
                  >
                    {text}
                  </Link>
                ))}
              </Breadcrumbs>
            )}
            <Typography variant="h4" role="heading" aria-level={1}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" role="heading" aria-level={2}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {actions && (
            <Box>
              {actions.map(({ disabled, id, href, onClick, text }, i) => (
                <Button
                  component={href ? Link : "button"}
                  role="button"
                  color="inherit"
                  disabled={disabled}
                  key={id}
                  variant={actionsVariant}
                  size="small"
                  href={href}
                  onClick={onClick}
                  sx={{ mr: i != actions.length - 1 ? 1 : 0 }}
                >
                  {text}
                </Button>
              ))}
            </Box>
          )}
        </Box>
        {tabs && (
          <Tabs
            value={modedSelectedTab}
            textColor="inherit"
            onChange={tabsMode === "panel" ? (_, index) => setSelectedTab(index) : undefined}
          >
            {tabs.map(({ id, label, disabled, href }) => {
              const tabProps = { label, disabled };
              if (tabsMode === "panel") {
                return <Tab key={id} {...tabProps} />;
              } else {
                return <Tab key={id} {...tabProps} component={Link} href={href} />;
              }
            })}
          </Tabs>
        )}
      </Container>
    </Box>
  );
};
