import type { TSchedule } from '../store/userSlice';
const schedule: TSchedule = [
  {
    year: 2021,
    sessions: [
      {
        name: 'fall',
        courses: [
          { id: 1, name: 'ECE195' },
          { id: 2, name: 'ECE285' },
          { id: 3, name: 'ECE312' },
          { id: 3, name: 'ECE313' },
        ],
      },
      {
        name: 'winter',
        courses: [
          { id: 1, name: 'ECE445' },
          { id: 2, name: 'ECE327' },
          { id: 3, name: 'ECE318' },
          { id: 3, name: 'ECE319' },
          { id: 3, name: 'ECE321' },
        ],
      },
      {
        name: 'summer',
        courses: [
          { id: 1, name: 'ECE434' },
          { id: 2, name: 'ECE336' },
        ],
      },
    ],
  },
  {
    year: 2022,
    sessions: [
      {
        name: 'fall',
        courses: [
          { id: 1, name: 'ECE414' },
          { id: 2, name: 'ECE386' },
          { id: 3, name: 'ECE211' },
          { id: 2, name: 'ECE126' },
        ],
      },
      {
        name: 'winter',
        courses: [
          { id: 1, name: 'ECE144' },
          { id: 2, name: 'ECE316' },
          { id: 3, name: 'ECE391' },
        ],
      },
    ],
  },
  {
    year: -1,
    sessions: [
      {
        name: 'unassigned',
        courses: [
          { id: 5, name: 'ECE143' },
          { id: 5, name: 'ECE243' },
          { id: 5, name: 'ECE343' },
          { id: 5, name: 'ECE443' },
          { id: 5, name: 'ECE543' },
          { id: 5, name: 'ECE643' },
          { id: 5, name: 'ECE743' },
        ],
      },
    ],
  },
];

export default schedule;
