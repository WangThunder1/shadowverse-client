import React, { useState } from "react";
import imageRamina from "../../assets/leaders/Ramina.png";
import imageJeanne from "../../assets/leaders/Jeanne.png";
import imageForte from "../../assets/leaders/Forte.png";
import imageGalmieux from "../../assets/leaders/Galmieux.png";
import imageKuon from "../../assets/leaders/Kuon.png";
import imageDaria from "../../assets/leaders/Daria.png";
import imageDionne from "../../assets/leaders/Dionne.png";
import imageAlbert from "../../assets/leaders/Albert.png";
import imageAria from "../../assets/leaders/Aria.png";
import imageCC from "../../assets/leaders/CC.png";
import imageExella from "../../assets/leaders/Exella.png";
import imageAmy from "../../assets/leaders/Amy.png";
import imageMaru from "../../assets/leaders/Maru.png";
import imageRin from "../../assets/leaders/Rin.png";
import imageMio from "../../assets/leaders/Mio.png";
import dragon from "../../assets/logo/dragon.png";

import {
  Box,
  Modal,
  Card,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  List,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatIcon from "@mui/icons-material/Chat";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLeader, reset } from "../../redux/CardSlice";
import { useSelector } from "react-redux";

export default function Selection({ setSelectedOption }) {
  // redux state
  const reduxChatLog = useSelector((state) => state.card.chatLog);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const selectLeader = (e) => {
    const leader = e.target.alt;
    setSelectedOption(leader);
    dispatch(setLeader(leader));
  };

  const exitToHome = () => {
    dispatch(reset());
    navigate("/");
  };

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialog]);

  return (
    <>
      <Drawer
        anchor={"left"}
        open={drawerOpen}
        PaperProps={{
          sx: {
            backgroundColor: "#131219",
            color: "white",
          },
        }}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{ width: 270 }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List>
            <ListItem key={"text"} disablePadding>
              <ListItemButton onClick={handleModalOpen}>
                <ListItemIcon>
                  <img src={dragon} height={30} alt={dragon} />
                </ListItemIcon>
                <ListItemText primary={"Change Class"} />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem key={"text"} disablePadding>
              <ListItemButton onClick={handleOpenDialog}>
                <ListItemIcon>
                  <ChatIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"Game Log"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />

          <List>
            <ListItem key={"text"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />

          <List>
            <ListItem key={"text"} disablePadding>
              <ListItemButton onClick={exitToHome}>
                <ListItemIcon>
                  <ExitToAppIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={"Exit Game"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Game Log</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {reduxChatLog.map((x) =>
              x[1] === "M" ? (
                <Typography
                  variant="body1"
                  style={{ color: "red", whiteSpace: "pre-line" }}
                >
                  {x}
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  style={{ color: "blue", whiteSpace: "pre-line" }}
                >
                  {x}
                </Typography>
              )
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <IconButton
        onClick={handleDrawerOpen}
        sx={{
          color: "white",
          position: "fixed",
          left: "1%",
          top: "1%",
          zIndex: "10",
          backgroundColor: "rgba(0, 0, 0, 1)",
        }}
      >
        <MenuIcon
          sx={{
            color: "white",
            width: "50px",
            height: "50px",
          }}
        />
      </IconButton>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 1)",
            boxShadow: 24,
            p: 4,
            width: "40%",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            variant="outlined"
          >
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageForte} alt="Forte" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageGalmieux} alt="Galmieux" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageJeanne} alt="Jeanne" />
            </IconButton>

            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageRamina} alt="Ramina" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageAlbert} alt="Albert" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageDionne} alt="Dionne" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageDaria} alt="Daria" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageKuon} alt="Kuon" />
            </IconButton>

            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageCC} alt="CC" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageAria} alt="Aria" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageAmy} alt="Amy" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageExella} alt="Exella" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageMaru} alt="Maruzensky" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageRin} alt="Rin" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              }}
              onClick={(e) => {
                selectLeader(e);
              }}
            >
              <img width="100px" src={imageMio} alt="Mio" />
            </IconButton>
          </Card>
        </Box>
      </Modal>
    </>
  );
}
