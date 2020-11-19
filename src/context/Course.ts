import { createContainer } from 'unstated-next';
import {
  Course as ICourse,
  Curriculum,
  Step,
} from '../shared/interfaces/course';
import { request } from '../shared/utils/api';
import Auth from './Auth';

const useCourse = () => {
  const user = Auth.useContainer().data;

  const createNewCourse = (title: string) => {
    return request(`courses`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        tutors: [user?.id],
      }),
    });
  };

  const toggleStep = (id: string, curriculum: any) => {
    return request(`courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        curriculum,
      }),
    });
  };

  const createStep = (id: string, data: Partial<Step>, course: ICourse) => {
    return request(`courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...course,
        curriculum: {
          ...course.curriculum,
          steps: [...course.curriculum.steps, data],
        },
      } as ICourse),
    });
  };

  return { createNewCourse, toggleStep, createStep };
};

export default createContainer(useCourse);
