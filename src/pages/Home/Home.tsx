import {
  AppBar,
  Button,
  Card,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

import styles from "./Home.module.scss";

const currentDate = "2018-11-01";
const schedulerData = [
  {
    startDate: "2018-10-29T09:45",
    endDate: "2018-10-29T10:45",
    title: "Иван П. (Python)",
  },
  {
    startDate: "2018-11-01T09:45",
    endDate: "2018-11-01T11:00",
    title: "Иван П. (Python)",
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Дмитрий М. (Алгоритмы)",
  },
  {
    startDate: "2018-11-01T13:10",
    endDate: "2018-11-01T13:40",
    title: "Дмитрий М. (Алгоритмы)",
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    schedule: {
      marginTop: theme.spacing(5),
    },
    paper: {
      marginTop: theme.spacing(5),
      padding: theme.spacing(2),
    },
  })
);

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tutor platform
          </Typography>
          <Button color="inherit">Дмитрий М.</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper className={classes.paper} elevation={0}>
          <Typography variant="h4">Кабинет преподавателя</Typography>

          <Card className={classes.schedule}>
            <Scheduler data={schedulerData} height={560}>
              <ViewState currentDate={currentDate} />
              <WeekView startDayHour={7} endDayHour={22} />
              <Appointments />
            </Scheduler>
          </Card>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
