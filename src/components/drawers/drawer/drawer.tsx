import React from "react";
import {
  SxProps,
  Theme,
  drawerClasses,
  styled,
  Drawer as MuiDrawer,
  Divider,
  IconButton,
  useTheme,
  paperClasses,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { DrawerComponent, DrawerProps, DrawerState, DrawerVariant } from "../drawer.types";
import { useDrawer } from "../drawer-provider/drawer-context";
import { closedMixin, openedMixin } from "../drawer-provider/drawer-mixins";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const showCloseButton: Record<DrawerVariant, boolean> = {
  temporary: true,
  mini: true,
  persistent: true,
  clipped: false,
};

const muiDrawerVariant: Record<DrawerVariant, "permanent" | "persistent" | "temporary"> = {
  temporary: "temporary",
  mini: "permanent",
  clipped: "permanent",
  persistent: "persistent",
};

type SxGenerator = (state: DrawerState, theme: Theme) => SxProps<Theme>;
const NoopSxGenerator = () => ({});
const variantsSx: Readonly<Record<DrawerVariant, SxGenerator>> = {
  mini: (state: DrawerState, theme: Theme) => ({
    boxSizing: "border-box",
    [`& .${paperClasses.root}`]: {
      zIndex: theme.zIndex.drawer - 1,
    },
  }),
  temporary: NoopSxGenerator,
  clipped: NoopSxGenerator,
  persistent: NoopSxGenerator,
};

export const Drawer: DrawerComponent = ({ children, ...rest }: DrawerProps) => {
  const theme = useTheme();
  const { state, switchState, underAppBar, close, drawerWidth, variant } = useDrawer();

  const sx: any = {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    ...(state === "open" && {
      ...openedMixin(theme),
      [`& .${drawerClasses.paper}`]: openedMixin(theme),
    }),
    ...(state !== "open" && {
      ...closedMixin(theme),
      [`& .${drawerClasses.paper}`]: closedMixin(theme),
    }),
    ...variantsSx[variant](state, theme),
  };

  return (
    <MuiDrawer
      open={state === "open"}
      variant={muiDrawerVariant[variant]}
      role="menu"
      aria-hidden={state === "close"}
      onClose={close}
      sx={sx}
      {...rest}
    >
      <DrawerHeader>
        {!underAppBar && showCloseButton[variant] && (
          <IconButton onClick={switchState}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      {children}
    </MuiDrawer>
  );
};
