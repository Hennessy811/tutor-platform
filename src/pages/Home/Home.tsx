import {
  Card,
  CircularProgress,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import {
  ChangeSet,
  EditingState,
  ViewState,
  IntegratedEditing,
  AppointmentModel,
} from '@devexpress/dx-react-scheduler';

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
} from '@devexpress/dx-react-scheduler-material-ui';

import { format } from 'date-fns';
import useSWR from 'swr';
import Auth from '../../context/Auth';
import { Course } from '../../shared/interfaces/course';
import { request } from '../../shared/utils/api';

const currentDate = format(new Date(), 'yyyy-MM-dd');

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
  }),
);

const Home = () => {
  const classes = useStyles();
  const user = Auth.useContainer().data;
  const { data, isValidating } = useSWR<Course[]>(
    `courses?tutors.id=${user?.id}`,
    request,
  );

  const schedule: AppointmentModel[] | undefined =
    data &&
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
      }),
    );

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    if (added && data) {
      const item = { ...added, course: data[0].id };
      request('schedules', {
        method: 'POST',
        body: JSON.stringify(item),
      });
    }
    if (changed) {
      const id = Object.keys(changed)[0];

      request(`schedules/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...changed[id],
        }),
      });
    }
    if (deleted) {
      request(`schedules/${deleted}`, {
        method: 'DELETE',
      });
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default Home;
