import type { TSchedule } from '../store/userSlice';
const schedule: TSchedule = [
  {
    year: 2021,
    sessions: [
      {
        name: 'fall',
        courses: [
          { id: 1, name: 'ECE444' },
          { id: 2, name: 'ECE326' },
          { id: 3, name: 'ECE311' },
          { id: 3, name: 'ECE311' },
        ],
      },
      {
        name: 'winter',
        courses: [
          { id: 1, name: 'ECE444' },
          { id: 2, name: 'ECE326' },
          { id: 3, name: 'ECE311' },
          { id: 3, name: 'ECE311' },
          { id: 3, name: 'ECE311' },
        ],
      },
      {
        name: 'summer',
        courses: [
          { id: 1, name: 'ECE444' },
          { id: 2, name: 'ECE326' },
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
          { id: 1, name: 'ECE444' },
          { id: 2, name: 'ECE326' },
          { id: 3, name: 'ECE311' },
          { id: 2, name: 'ECE326' },
        ],
      },
      {
        name: 'winter',
        courses: [
          { id: 1, name: 'ECE444' },
          { id: 2, name: 'ECE326' },
          { id: 3, name: 'ECE311' },
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
          { id: 5, name: 'ECE543' },
          { id: 5, name: 'ECE543' },
          { id: 5, name: 'ECE543' },
          { id: 5, name: 'ECE543' },
          { id: 5, name: 'ECE543' },
          { id: 5, name: 'ECE543' },
          { id: 5, name: 'ECE543' },
        ],
      },
    ],
  },
];

export default schedule;
