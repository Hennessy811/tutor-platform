import {
  AppBar,
  Button,
  Card,
  CircularProgress,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Toolbar as AppToolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  Toolbar,
  ViewSwitcher,
  TodayButton,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";

import styles from "./Home.module.scss";
import { useAuth } from "../../shared/utils/hooks/auth";
import { Redirect, useHistory } from "react-router-dom";
import { BACKEND_URL } from "../../shared/utils/config";
import { format } from "date-fns";
import Header from "../../shared/components/Header";

export interface Tutor {
  confirmed: boolean;
  blocked: boolean;
  _id: string;
  username: string;
  email: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  role: string;
  id: string;
}

export interface Student {
  confirmed: boolean;
  blocked: boolean;
  _id: string;
  username: string;
  email: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  role: string;
  id: string;
}

export interface Step {
  _id: string;
  title: string;
  description: string;
  __v: number;
  id: string;
}

export interface Schedule {
  datetime_start: string;
  _id: string;
  datetime: string;
  notes: string;
  topic: string;
  paid: boolean;
  __v: number;
  datetime_end: string;
  id: string;
}

export interface Curriculum {
  _id: string;
  title: string;
  description: string;
  steps: Step[];
  schedule: Schedule[];
  __v: number;
  id: string;
}

export interface Courses {
  tutors: Tutor[];
  students: Student[];
  parents: any[];
  _id: string;
  title: string;
  subject: string;
  published_at: string;
  curriculum: Curriculum;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

// const currentDate = "2020-11-08"
const currentDate = format(new Date(), "yyyy-MM-dd");

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

const getCourses = (token: string) => {
  return fetch(`${BACKEND_URL}/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  }).then((r) => r.json());
};

const Home = () => {
  const classes = useStyles();
  const { token } = useAuth();
  const [courses, setCourses] = useState<Courses[] | null>(null);

  useEffect(() => {
    if (token) {
      getCourses(token).then((r) => {
        setCourses(r);
      });
    }
  }, [token]);

  const schedule: any =
    courses?.length &&
    courses.flatMap((course) =>
      course.curriculum?.schedule.map((i) => {
        return {
          startDate: i.datetime_start,
          endDate: i.datetime_end,
          title: i.topic,
        };
      })
    );

  console.log(schedule);

  if (!token) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div>
      <Header />
      <Container>
        <Paper className={classes.paper} elevation={0}>
          {!courses ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h4">Кабинет преподавателя</Typography>

              <Card className={classes.schedule}>
                <Scheduler data={schedule} height={560}>
                  <ViewState defaultCurrentDate={currentDate} />
                  <MonthView />
                  <DayView />
                  <WeekView />
                  <Toolbar />
                  <ViewSwitcher />

                  <DateNavigator />
                  <TodayButton />
                  <Appointments />

                  <AppointmentTooltip showCloseButton showOpenButton />
                  <AppointmentForm readOnly />
                </Scheduler>
              </Card>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
