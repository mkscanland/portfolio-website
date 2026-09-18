import internalRebuildHeroImage from '@/assets/images/internal-rebuild-hero.jpg'
import labValidationHeroImage from '@/assets/images/lab-validation-hero.jpg'
import internalLeaveCalendarImage from '@/assets/images/internal-leave-calendar.png'
import checkoutFormsImage from '@/assets/images/checkout-forms.png'
import purchasingTrackerImage from '@/assets/images/purchasing-tracker.png'
import roomReservationsImage from '@/assets/images/room-reservations.png'
import uploadArchivesImage from '@/assets/images/upload-archives.png'
import documentsMariadbImage from '@/assets/images/documents-mariadb.png'

export const webApplicationProjects = [
  {
    id: 'internalRebuild',
    group: 'key',
    image: internalRebuildHeroImage,
    alt: 'Internal Website Rebuild',
    title: 'Internal Website Rebuild',
    technologies: 'Architecture, Leadership, API Design',
    description:
      'From 2019 to 2023, I designed and expanded this internal support website for CPES. It helped students, faculty, staff, and visiting scholars access information and communicate more efficiently. It housed multiple web applications that coordinated purchases, leave requests, and administrative workflows.',
    details:
      'This platform was built and expanded over multiple years. It integrated applications including Internal Leave, Purchasing/Reimbursements, Room Reservations, and more. I worked independently on system design, backend architecture, APIs, and maintenance while coordinating requirements with CPES students, faculty, and staff.',
  },
  {
    id: 'labValidation',
    group: 'key',
    image: labValidationHeroImage,
    alt: 'Lab Validation System',
    title: 'Lab Validation System',
    technologies: 'Full-Stack Development, Database Design',
    description:
      'Complete build of the internal Lab Validation System. This system tracks student hours, accounts, holidays, vacations, and other administrative facets. An administrator interface allows manipulation of data, statistical analysis, data export, and comprehensive reporting.',
    details:
      'This system was built from the ground up as a comprehensive solution for managing lab administration. It tracks multiple data facets including student hours, account information, holiday schedules, vacation requests, and other administrative requirements. The system features a robust administrator interface that provides data manipulation capabilities, detailed statistical analysis, and flexible data export functionality. The architecture ensures data integrity through relational database design and provides role-based access control for different user types. This project demonstrated my ability to analyze requirements, design complete systems, and deliver a fully functional application that improved administrative efficiency.',
  },
  {
    id: 'leave',
    group: 'other',
    image: internalLeaveCalendarImage,
    alt: 'Internal Leave Calendar',
    title: 'Internal Leave',
    technologies: 'SQL, PHP, JS, JQuery',
    description:
      'The Internal Leave system allows students to quickly input vacation and business travel requests for advisor approval. Once approved, staff can search, sort, modify, and delete any requests without page reloads. The system also calculates individual leave for each student and determines if they are over their maximum allowed leave for that leave period.',
    details:
      "This system uses several tables with relational connections. One table stores the definitions for each student. Including, but not limited to; their advisor's user ID, leave period and maximum allowed leave. Another table stores individual vacations and stores those values in specific columns based on the user inputs.\nThere is a separate view for Faculty, Students, and Staff. Faculty can only see approved/unapproved leave for their assigned students. Students can only see their personal leave and input leave. Staff can see all students' unapproved and approved leave, along with some generic statistics based on each user and their leave.",
  },
  {
    id: 'checkout',
    group: 'other',
    image: checkoutFormsImage,
    alt: 'Forms checkout tracker',
    title: 'Checkout Tracker',
    technologies: 'SQL, PHP, JS, JQuery',
    description:
      'The Checkout Tracker allows staff and faculty an instant view of where a student is in the process of leaving CPES. Some necessary information from the student is collected upon submission. The system is simple and checks the latest status of a checkout to show which step it is on. A query to the model shows if a student has submitted their Thesis/Dissertation to the uploading system.',
    details:
      "This system is relatively simple. One table stores the dynamic checkout information which is shown on page load. Another table stores the users' progress into the checkout process. This status is determined by the latest insertion into the “status” table. When a Staff/Faculty approves the current step in the checkout process an email is sent to necessary users and the following status is inserted into this table.\nEach user has the same view, but only the appropriate users can approve the current progress and trigger the next status.",
  },
  {
    id: 'purchasing',
    group: 'other',
    image: purchasingTrackerImage,
    alt: 'Purchasing tracker',
    title: 'Purchasing/Reimbursements',
    technologies: 'SQL, PHP, JS, JQuery',
    description:
      'The Purchasing system included three functionalities: Purchases, Reimbursements, and Travel Reimbursements. Each system was similarly built. Users submitted requests that went through a chain of approvals. The tracker for each function had several stages that a request could be at. These requests could be searched and sorted. The system processed over 10k requests a year.',
    intro:
      'The Purchasing system currently has three functionalities: Purchases, Reimbursements, and Travel Reimbursements. Each system is similarly built. The user inputs a request for one of the previously mentioned functions and that requests goes through a chain of approvals. The tracker for each function has several stages that a request can be at. These requests can be searched and sorted. The system processes over 10k requests a year.',
    details:
      "When a user submits their request it is stored in a few tables; requests, items, status. The Requests table stores the generic information of a request. For example, the vendor quote file document ID, etc. The Items table stores each individual item, quantity, price, etc. And finally the Status simply stores which step in the process this request is at.\nStudents and Faculty can only see/search their individual requests and its' status. Staff are able to see/search/sort all current requests and their status.",
  },
  {
    id: 'reservations',
    group: 'other',
    image: roomReservationsImage,
    alt: 'Reservations calendar',
    title: 'Room/HPC Reservations',
    technologies: 'SQL, PHP, JS, JQuery',
    description:
      'Room Reservations and HPC Reservations both use the FullCalendar Event Calendar. Users can reserve a time in a conference room or time on our HPCs (High Performance Computers). A user can reserve a single day, or recurring days for a specific time period. All reservations are stored in the database and pulled dynamically depending on which date is selected. If the Zoom Room (143) is selected a meeting link is added to the Zoom Room Google Calendar to easily start the meeting.',
    details:
      'This system is pretty simple and its difficultes mainly lie in the initial planning and UI. Reservations are stored in two tables. One table stores the general information for the reservation and another table stores each day. The UI allows users to select multiple days, a specific day of the week, or any recurring reservations. This information is then parsed and inserted into the database.',
  },
  {
    id: 'uploading',
    group: 'other',
    image: uploadArchivesImage,
    alt: 'Upload archives',
    title: 'Uploading System',
    technologies: 'SQL, PHP, JS, JQuery',
    description:
      'Students and Faculty can upload their publications to the uploading system for easy archiving. Once uploaded any user can view the archives by using the search functionality. Using a fuzzy search the user can select any date, category, or specific metadata to fine tune their search. If a user makes a mistake and needs to re-upload a document, that can be done on any individual archive page.',
    details:
      'When a user submits a publication to the system they select the type and fill in general information based on that type. This information is stored in three tables; publications, publications(TYPE), and publicationFiles. The Publications table stores the generic information found in each publication. For example, the title, abstract, etc. The publications(TYPE) table is separated into several tables based on the type of publication. This houses the generic information for that specific publication type. And finally the publicationFiles table stores each file for that specific publication and its document ID.',
  },
  {
    id: 'documents',
    group: 'other',
    image: documentsMariadbImage,
    alt: 'Document archive',
    title: 'Document Retrieval and Insertion',
    technologies: 'SQL, PHP, JS, JQuery',
    description:
      'Document info is uploaded via XMLHttpRequests which is handeled by common PHP and JS classes for all documents on the Support website. These documents are retrieved and served via PHP after checking user authentication.',
    details:
      "A centralized Javascript class controls all uploads on the support website. The class sends the uploads to another centalized PHP class which checks the file mime type and other various security checks before it's finally uploaded to the server. Once uploaded a ClamAV script checks the file for viruses and then stores it in the documents directory.\nThe document information is stored in a single table, which functions as a housing utility for generic document information. Title, requestURL, timestamps, access level, etc. are stored on this table to provide a little more context on what the process was to upload this file.",
  },
]
