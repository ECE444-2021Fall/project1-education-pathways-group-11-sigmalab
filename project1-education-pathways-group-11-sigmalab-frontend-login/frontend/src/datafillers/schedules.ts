const schedule = [
  {
    year: 2021,
    unLabeled: false,
    semesters: [
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
    unLabeled: false,
    semesters: [
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
    year: null,
    unLabeled: true,
    semesters: [
      {
        name: '',
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
