const schedule = [
  {
    year: 2021,
    isUnassigned: false,
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
    isUnassigned: false,
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
    year: 0,
    isUnassigned: true,
    semesters: [],
  },
];

export default schedule;
