const profiles = [
  {
    name: 'My Main Profile',
    courses: [
      { id: 1, name: 'ECE444' },
      { id: 2, name: 'ECE326' },
      { id: 3, name: 'ECE311' },
    ],
    numOfCourses: 12,
    numOfSemesters: 4,
    isDefault: true,
    isEditing: true,
  },
  {
    name: 'Second Profile',
    courses: [
      { id: 4, name: 'MIE325' },
      { id: 5, name: 'MIE521' },
    ],
    numOfCourses: 16,
    numOfSemesters: 4,
    isDefault: false,
    isEditing: false,
  },
];

export default profiles;
