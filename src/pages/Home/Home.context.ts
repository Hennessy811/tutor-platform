import {
  AppointmentModel,
  ChangeSet,
  Resource,
  ResourceInstance,
} from '@devexpress/dx-react-scheduler';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { createContainer } from 'unstated-next';
import { uniqBy } from 'lodash';
import Auth from '../../context/Auth';
import { Course } from '../../shared/interfaces/course';
import { request } from '../../shared/utils/api';

const useHome = () => {
  const user = Auth.useContainer().data;
  const { data, isValidating, revalidate } = useSWR<Course[]>(
    `courses?tutors.id=${user?.id}`,
    request,
  );

  useEffect(() => {
    const freeSchedule = data?.find((i) => i.title === 'Свободное расписание');
    if (
      user &&
      (data?.length || data?.length === 0) &&
      !isValidating &&
      !freeSchedule
    ) {
      request('courses', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Свободное расписание',
          // eslint-disable-next-line no-underscore-dangle
          tutors: [user?.id],
        }),
      });
    }
  }, [data]);

  const schedule: AppointmentModel[] | undefined =
    data &&
    data.flatMap((course) =>
      course?.schedule.map((i) => {
        const item = {
          ...i,
          courseTitle: course.title,
          courseId: course.id,
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
      }).then(() => revalidate());
    }
    if (changed) {
      const id = Object.keys(changed)[0];
      console.log(changed[id]);

      request(`schedules/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...changed[id],
        }),
      }).then(() => revalidate());
    }
    if (deleted) {
      request(`schedules/${deleted}`, {
        method: 'DELETE',
      }).then(() => revalidate());
    }
  };

  const instances: ResourceInstance[] = useMemo(
    () =>
      data?.flatMap((course) => ({ id: course.id, text: course.title })) || [],
    [data],
  );

  const resources: Resource[] = [
    {
      fieldName: 'course',
      instances,
      allowMultiple: false,
      title: 'Курс',
    },
  ];

  return {
    data,
    schedule,
    commitChanges,
    isValidating,
    resources,
    revalidateCourses: revalidate,
  };
};

export default createContainer(useHome);
