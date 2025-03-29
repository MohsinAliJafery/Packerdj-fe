

const JOBCATEGORY: string[] = ['Software Development', 'Engineering', 'Commerce', 'Medical'];
const JOBTYPE: string[] = ['Full Time', 'Part Time', 'Internship'];
const JOBSTATUS: string[] = ['Active', 'Closed'];
const EXPERTISE: string[] = ['Technical', 'Career'];
const FLUENTIN: string[] = ['English', 'Indonesian'];
const SKILLTYPE: string[] = ['Technical Skills', 'Soft Skills', 'English Skills', 'Career Advancement Skills'];

const COACH_CATEGORY = [
  { label: 'Technical Skills Coaching', value: 'Technical' },
  { label: 'Soft Skills Coaching', value: 'Soft' },
  { label: 'English Skill Coaching', value: 'English' },
  { label: 'Career Coaching', value: 'Career' }
]

const technicalSkills = [
  'Software Development',
  'Project/Product Management',
  'Quality Assurance',
  'Sales',
  'Marketing',
  'Customer Service',
  'Accounting/Finance',
  'UI/UX'
];

const softSkills = [
  'Corporate Communication',
  'Analytical Thinking',
  'Problem Solving',
  'Time Management',
  'Networking'
];

const careerSkills = [
  'CV Review',
  'Interview Preparation',
  'Career Advancement'
];

const englishSkills: any[] = []

const COACH_BUDGET = [
  { label: 'IDR 100.000 - 300.000', value: '100.000-300.000' },
  { label: 'IDR 300.001 - 500.000', value: '300.001-500.000' },
  { label: 'IDR 500.001 - 1.000.000', value: '500.001-1.000.000' },
  { label: 'IDR 1.000.001 - 2.000.000', value: '1.000.001-2.000.000' },
  { label: 'Above IDR 2.000.000', value: '2.000.000' },
]
const DAYS: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


export {
  JOBTYPE,
  JOBCATEGORY,
  EXPERTISE,
  FLUENTIN,
  SKILLTYPE,
  COACH_CATEGORY,
  COACH_BUDGET,
  DAYS,
  JOBSTATUS,
  technicalSkills,
  softSkills,
  careerSkills,
  englishSkills
};
