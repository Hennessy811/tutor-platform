import { Box, Button, Input, Typography } from '@material-ui/core';
import { DoneAll } from '@material-ui/icons';
import React, { FC, useState } from 'react';

interface TabPanelProps {
  index: any;
  value: any;
  title: string;
  description: string;
  completed: boolean;
  duration: number;
  toggleStep?: () => void;
  onCreate?: (step: any) => void;
}

const TabPanel: FC<TabPanelProps> = (props) => {
  const {
    children,
    value,
    index,
    completed,
    description,
    duration,
    title,
    toggleStep,
    onCreate,
    ...other
  } = props;
  const [editTab, setEditTab] = useState(!!onCreate);

  const [etitle, setTitle] = useState('');
  const [eduration, setDuration] = useState<number | string>('');
  const [edescription, setDescription] = useState('');

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && (
        <Box px={3}>
          <Box display="flex" alignItems="center">
            {editTab ? (
              <Input
                fullWidth
                value={etitle}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название этапа"
              />
            ) : (
              <Typography variant="h5">{title}</Typography>
            )}
            <Box mx={3}>
              {editTab ? (
                <Input
                  fullWidth
                  type="number"
                  value={eduration}
                  onChange={(e) =>
                    Number(e.target.value) >= 0 &&
                    setDuration(Number(e.target.value))
                  }
                  placeholder="ак.ч."
                />
              ) : (
                <Typography variant="subtitle1">
                  ~<i>{duration}</i> ак.ч.
                </Typography>
              )}
            </Box>
          </Box>

          <Box my={3}>
            <Typography variant="h6">Доп. материалы:</Typography>
            {editTab ? (
              <Input
                multiline
                fullWidth
                value={edescription}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Введите текст"
              />
            ) : (
              description
            )}
          </Box>

          <Box display="flex" alignItems="center">
            {toggleStep && (
              <Button
                size="small"
                variant={!completed ? 'contained' : 'outlined'}
                color="primary"
                endIcon={<DoneAll />}
                onClick={toggleStep}
              >
                {!completed
                  ? 'Завершить этап'
                  : 'Пометить этап как незавершенный'}
              </Button>
            )}
            {onCreate && (
              <Button
                size="small"
                variant="contained"
                color="primary"
                endIcon={<DoneAll />}
                onClick={() =>
                  onCreate({
                    title: etitle,
                    duration: eduration,
                    description: edescription,
                  })
                }
              >
                Сохранить
              </Button>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
