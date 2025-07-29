export const genderOptions = ["male", "female", "other"];

export const StudentFormDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: new Date(Date.now()),
  gender: 'male' as Gender,
  address: '',
  occupation: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  primaryAdmissionsOfficer: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedication: '',
  familyMedicalHistory: '',
  pastMedicalHistory: '',
  identificationType: 'Birth Certificate',
  identificationNumber: '',
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const AdmissionsOfficers = [
  {
    image: '/assets/images/dr-green.png',
    name: 'Ahmed Firdews',
  },
  {
    image: '/assets/images/dr-cameron.png',
    name: 'Erzhigit Kasymbaev',
  },
  {
    image: '/assets/images/dr-livingston.png',
    name: 'Aizhan Kairatova',
  },
  {
    image: '/assets/images/samagan.png',
    name: 'Samagan Nurdinov',
  },
  {
    image: '/assets/images/dr-powell.png',
    name: 'Mehmed Izol',
  },
  {
    image: '/assets/images/dr-remirez.png',
    name: 'Saikal Dzhakypova',
  },
  {
    image: '/assets/images/dr-lee.png',
    name: 'Meerim Beishebaevam',
  },
  {
    image: '/assets/images/dr-cruz.png',
    name: 'Aiperi Kudaibergenova',
  },
  {
    image: '/assets/images/dr-sharma.png',
    name: 'Asel Kadyrova',
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};