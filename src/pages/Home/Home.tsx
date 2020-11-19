import {
  Box,
  Card,
  Checkbox,
  CircularProgress,
  createStyles,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import {
  EditingState,
  ViewState,
  IntegratedEditing,
  ResourceInstance,
  Resource,
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
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';

import { format } from 'date-fns';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import HomeContext from './Home.context';
import { Course } from '../../shared/interfaces/course';
import { request } from '../../shared/utils/api';
import CourseContext from '../../context/Course';

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
    schedule: {},
    paper: {
      marginTop: theme.spacing(5),
      padding: theme.spacing(2),
    },
    list: {
      minWidth: '250px',
      marginLeft: theme.spacing(2),
      padding: theme.spacing(2),
    },
    container: {
      marginTop: theme.spacing(5),
      display: 'flex',
      justifyContent: 'space-between',
    },
    newCourseName: {
      fontSize: theme.typography.pxToRem(14),
    },
  }),
);

const Home = () => {
  const {
    data,
    isValidating,
    schedule,
    commitChanges,
    resources,
    revalidateCourses,
  } = HomeContext.useContainer();
  const { createNewCourse } = CourseContext.useContainer();

  const classes = useStyles();
  const [activeCourses, setActiveCourses] = useState<string[]>([]);
  const [addingNewCourse, setAddingNewCourse] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');

  useEffect(() => {
    if (schedule && !activeCourses.length) {
      setActiveCourses(data?.flatMap((course) => String(course.id)) || []);
    }
  }, [schedule]);

  const handleToggle = (course: Course) => {
    if (activeCourses.find((id) => id === course.id))
      setActiveCourses(activeCourses.filter((id) => id !== course.id));
    else setActiveCourses([...activeCourses, course.id]);
  };

  const coursesList = data?.flatMap((course) => (
    <ListItem
      key={course.id}
      role={undefined}
      dense
      button
      onClick={() => handleToggle(course)}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={!!activeCourses.find((id) => id === course.id)}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': course.id }}
        />
      </ListItemIcon>
      <ListItemText id={course.id} primary={course.title} />
      <ListItemSecondaryAction>
        <Link to={`/course/${course.id}`}>
          <IconButton edge="end" aria-label="comments">
            <ExitToAppIcon />
          </IconButton>
        </Link>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <Paper className={classes.paper} elevation={1}>
      {isValidating && !data ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4">Кабинет преподавателя</Typography>
          <Box className={classes.container}>
            <Card elevation={6} className={classes.schedule}>
              <Scheduler
                data={schedule?.filter((s) =>
                  activeCourses.find((c) => c === s.courseId),
                )}
                height={700}
              >
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

                <Resources data={resources} mainResourceName="course" />
              </Scheduler>
            </Card>
            <Card elevation={2} className={classes.list}>
              <Typography variant="h5">Активные курсы</Typography>

              <List>
                {coursesList}

                {addingNewCourse ? (
                  <Input
                    fullWidth
                    placeholder="Введите название"
                    className={classes.newCourseName}
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setAddingNewCourse(false);
                            createNewCourse(newCourseTitle).then(() =>
                              revalidateCourses(),
                            );
                          }}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="secondary"
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setAddingNewCourse(false);
                            setNewCourseTitle('');
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                ) : (
                  <ListItem
                    key="add new"
                    role={undefined}
                    dense
                    button
                    // disabled
                    onClick={() => setAddingNewCourse(!addingNewCourse)}
                  >
                    <ListItemIcon>
                      <AddIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Добавить новый курс" />
                  </ListItem>
                )}
              </List>
            </Card>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Home;
