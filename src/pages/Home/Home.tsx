import {
  Card,
  CircularProgress,
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import {
  ChangeSet,
  EditingState,
  ViewState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";

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
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

import { Redirect } from "react-router-dom";
import { format } from "date-fns";
import Header from "../../shared/components/Header";
import { Auth } from "../../store/auth/useAuth";
import { Course } from "../../shared/interfaces/course";
import { request } from "../../shared/utils/api";
import useSWR from "swr";

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

const Home = () => {
  const classes = useStyles();
  const auth = Auth.useContainer();
  const { data, isValidating } = useSWR<Course[]>(
    `courses?tutors.id=${auth?.data?.id}`,
    request
  );

  console.log(data);

  const schedule: any =
    data?.length &&
    data.flatMap((course) =>
      course?.schedule.map((i) => {
        const item = {
          ...i,
          startDate: new Date(i.startDate),
        };

        if (item.endDate) {
          item.endDate = new Date(i.endDate);
        }

        return item;
      })
    );

  if (!auth.token) {
    return <Redirect to="/sign-in" />;
  }

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    console.log("commit", { added, changed, deleted });
    if (added && data) {
      const item = { ...added, course: data[0].id };
      request(`schedules`, {
        method: "POST",
        body: JSON.stringify(item),
      });
    }
    if (changed) {
      const id = Object.keys(changed)[0];

      request(`schedules/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...changed[id],
        }),
      });
    }
    if (deleted) {
      request(`schedules/${deleted}`, {
        method: "DELETE",
      });
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Paper className={classes.paper} elevation={0}>
          {isValidating && !data ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h4">Кабинет преподавателя</Typography>

              <Card className={classes.schedule}>
                <Scheduler data={schedule} height={700}>
                  <ViewState defaultCurrentDate={currentDate} />

                  <EditingState onCommitChanges={commitChanges} />
                  <IntegratedEditing />
                  <ConfirmationDialog />

                  <MonthView />
                  <DayView />
                  <WeekView />
                  <Toolbar />
                  <ViewSwitcher />

                  <DateNavigator />
                  <TodayButton />
                  <Appointments />

                  <AppointmentTooltip showCloseButton showOpenButton />
                  <AppointmentForm />
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
