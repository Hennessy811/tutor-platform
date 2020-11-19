import {
  Box,
  CircularProgress,
  createStyles,
  Divider,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
import { sum } from 'lodash';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import CourseContext from '../../context/Course';
import EditableText from '../../shared/components/EditableText';
import { Course, Step } from '../../shared/interfaces/course';
import { request } from '../../shared/utils/api';
import TabPanel from './components/TabPanel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(5),
      padding: theme.spacing(2),
    },
    courseTitle: {
      fontWeight: 'bold',
      width: 'fit-content',
    },
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 360,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }),
);

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);

const defaultTab: Partial<Step> = {
  description: 'descr',
  duration: 1,
  title: 'title',
};

const CoursePage = () => {
  const classes = useStyles();
  const { toggleStep, createStep } = CourseContext.useContainer();

  const [activeTab, setActiveTab] = useState(0);
  const [newTab, setNewTab] = useState<Partial<Step>>(defaultTab);
  const { id } = useParams<{ id: string }>();
  const { data, revalidate, isValidating } = useSWR<Course>(
    `courses/${id}`,
    request,
  );

  const handleChangeTitle = (i: string) => {
    if (!i || i === data?.title) return;
    request(`courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: i,
      }),
    }).then(() => revalidate());
  };

  const completeness = useMemo(() => {
    const completedSteps = data?.curriculum?.steps.map((i) =>
      i.completed ? 1 : 0,
    );
    const allSteps = data?.curriculum?.steps?.length || 0;
    return Math.floor((sum(completedSteps) / allSteps) * 100);
  }, [data?.curriculum?.steps]);

  const handleToggleStep = (step: Step) => {
    toggleStep(id, {
      ...data?.curriculum,
      steps: data?.curriculum?.steps.map((i) => {
        if (i.id === step.id)
          return {
            ...i,
            completed: !step.completed,
          };
        return i;
      }),
    }).then(() => revalidate());
  };

  if (!data && isValidating)
    return (
      <Paper className={classes.paper}>
        <CircularProgress />
      </Paper>
    );

  return (
    <Paper className={classes.paper}>
      <Grid container alignItems="center">
        <Typography variant="h4">Учебный план</Typography>

        <Box mx={2} />
        <Divider orientation="vertical" flexItem />
        <Box mx={2} />
        <Typography>
          Преподаватель: {data?.tutors.map((i) => i.username).join(', ')}
        </Typography>
        <Box mx={2} />
        <Typography>
          Студент: {data?.students.map((i) => i.username).join(', ')}
        </Typography>
      </Grid>

      <Box display="flex" my={2} alignItems="center">
        <EditableText
          onChange={handleChangeTitle}
          text={data?.title}
          typography={{ variant: 'h5' }}
          className={classes.courseTitle}
        />

        <Box width="200px" mx={5}>
          <Typography variant="subtitle2">
            Пройдено на {completeness}%
          </Typography>
          <BorderLinearProgress value={completeness} variant="determinate" />
        </Box>
      </Box>

      <Box className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={activeTab}
          onChange={(e, newValue) => {
            setActiveTab(newValue);
          }}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {data?.curriculum?.steps.map((step) => (
            <Tab
              key={step.id}
              label={step.completed ? `${step.title} - ✅` : step.title}
            />
          ))}
          <Tab label="Добавить этап 📝" />
        </Tabs>
        {data?.curriculum?.steps.map((step, idx) => (
          <TabPanel
            key={step.id}
            value={activeTab}
            index={idx}
            title={step.title}
            completed={step.completed}
            description={step.description}
            duration={step.duration}
            toggleStep={() => handleToggleStep(step)}
          />
        ))}
        {data && (
          <TabPanel
            value={activeTab}
            index={data?.curriculum?.steps.length}
            title={newTab.title!}
            completed={false}
            description={newTab.description!}
            duration={newTab.duration!}
            onCreate={(e) => {
              createStep(data.id, e, data).then(() => revalidate());
            }}
          />
        )}
      </Box>
    </Paper>
  );
};

export default CoursePage;
