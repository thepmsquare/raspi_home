import "@fontsource-variable/fraunces";
import "@fontsource-variable/outfit";
import "../stylesheets/common.css";
import "../stylesheets/index.css";

import * as React from "react";
import { GreetingCommonBL, UtilsCommonBL } from "squarecommonblhelper";
import { CustomSnackbar, CustomSnackbarStateType } from "squarecomponents";

import WavingHandIcon from "@mui/icons-material/WavingHand";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  LinearProgress,
  TextField,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import squareConfig from "../config/square";
import { theme } from "../utils/theme";

const isBrowser = typeof window !== "undefined";
import type { HeadFC, PageProps } from "gatsby";
export const Head: HeadFC = () => <title>thePmSquare | server</title>;

const IndexPage: React.FC<PageProps> = () => {
  // state
  const [isGreetDialogOpen, changeIsGreetDialogOpen] = React.useState(false);
  const [greetingName, changeGreetingName] = React.useState("");
  const [greetingText, changeGreetingText] = React.useState("");
  const [isGreetDialogLoading, changeIsGreetDialogLoading] =
    React.useState(false);

  const [snackbarState, changeSnackbarState] =
    React.useState<CustomSnackbarStateType>({
      isOpen: false,
      message: "",
      severity: "error",
    });
  // functions
  const handleGreetDialogOpen = () => {
    changeIsGreetDialogOpen(true);
  };
  const handleGreetDialogClose = () => {
    if (isGreetDialogLoading) {
      return;
    }
    changeIsGreetDialogOpen(false);
  };

  const handleGreetDialogSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      changeIsGreetDialogLoading(true);
      let result = await greetingCommonBL.createGreetingV0(
        true,
        greetingName === "" ? undefined : greetingName,
        undefined,
        greetingText === "" ? undefined : greetingText
      );
      changeIsGreetDialogLoading(false);
      changeGreetingName("");
      changeGreetingText("");
      changeIsGreetDialogOpen(false);
      changeSnackbarState({
        isOpen: true,
        message: result.message ? result.message : "",
        severity: "success",
      });
    } catch (error) {
      changeSnackbarState({
        isOpen: true,
        message: (error as any).message as string,
        severity: "error",
      });
      changeIsGreetDialogLoading(false);
      changeIsGreetDialogOpen(false);
    }
  };
  // useEffects

  // misc

  let greetingCommonBL = new GreetingCommonBL(
    squareConfig.squareCommonBLBaseURL
  );
  let utilsCommonBL = new UtilsCommonBL(squareConfig.squareCommonBLBaseURL);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="index-main">
        <div className="index-container">
          <h1 className="index-title">welcome</h1>
          <div className="index-subtitle">to thePmSquare's server</div>
          <Fab
            color="default"
            aria-label="greet"
            className="index-fab"
            onClick={handleGreetDialogOpen}
          >
            <WavingHandIcon />
          </Fab>
          <Dialog onClose={handleGreetDialogClose} open={isGreetDialogOpen}>
            {isGreetDialogLoading && <LinearProgress />}
            <DialogTitle>send a greeting</DialogTitle>
            <form onSubmit={handleGreetDialogSubmit}>
              <DialogContent className="index-fab-form">
                <TextField
                  label="name (optional)"
                  variant="outlined"
                  value={greetingName}
                  onChange={(e) => changeGreetingName(e.target.value)}
                  disabled={isGreetDialogLoading}
                  autoFocus
                />
                <TextField
                  label="greeting (optional)"
                  variant="outlined"
                  multiline
                  minRows={2}
                  maxRows={4}
                  value={greetingText}
                  onChange={(e) => changeGreetingText(e.target.value)}
                  disabled={isGreetDialogLoading}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleGreetDialogClose}
                  color="inherit"
                  disabled={isGreetDialogLoading}
                  tabIndex={-1}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isGreetDialogLoading}>
                  send
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          <CustomSnackbar
            snackbarState={snackbarState}
            changeSnackbarState={changeSnackbarState}
          />
        </div>
      </main>
    </ThemeProvider>
  );
};

export default IndexPage;
