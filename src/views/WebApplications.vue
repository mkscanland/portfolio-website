<template>
  <div class="wrapperSection bg-lightbulb text-secondary px-4 text-center position-relative">
    <div class="py-5">
      <div class="col-lg-6 mx-auto position-absolute bottom-20 start-50 translate-middle-x">
        <h1 class="display-5 fw-bold text-white">Web Applications Archive</h1>
      </div>
    </div>
  </div>
  <div class="wrapperSection py-0 pb-5 bg-white position-relative text-secondary px-4">
    <div class="title">Key Current Projects</div>
    <div class="row pt-5 pb-3">
      <div class="col-lg-12 col-md-12 mx-auto text-center">
        <p>
          Showcasing my current and recent projects that demonstrate my latest expertise and technical capabilities.
        </p>
      </div>
    </div>
    <div class="row py-0">
      <div class="col-lg-12 col-md-12 mx-auto">
        <div class="album py-5">
          <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3 text-dark">
            <div class="col">
              <div class="projectContainer">
                <img src="~@/assets/images/computer-bg.jpg" class="img-fluid rounded"
                  alt="Digital Appraisals Platform" />
                <div class="overlay">
                  <p class="small">FastAPI, Python, Azure App Service, API Management, Cosmos DB, Azure Functions, Terraform</p>
                  <p class="h4 projectTitle">Digital Appraisals Platform</p>
                  <p>
                    A vehicle-pricing platform that provides contractual offers from a VIN and selected vehicle
                    information. I help lead the platform and work across FastAPI, Python, Azure API Management, Cosmos
                    DB, Azure Functions, Terraform, and CI/CD.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="projectContainer">
                <img src="~@/assets/images/lightbulb-bg.jpg" class="img-fluid rounded"
                  alt="Rules Engine and Self Service" />
                <div class="overlay">
                  <p class="small">.NET Core, SQL Server, IIS, Azure Functions, Vue, Azure Storage Tables</p>
                  <p class="h4 projectTitle">Rules Engine / Self Service</p>
                  <p>
                    I lead the Rules Engine work and its evolution into Self Service. The work includes modernizing
                    legacy .NET and SQL systems, improving the UI and search experience, and moving rule management
                    toward a more maintainable architecture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="wrapperSection py-0 pb-5 bg-lightGrey position-relative text-secondary px-4">
    <div class="title">Key CPES Projects</div>
    <div class="row pt-5 pb-3">
      <div class="col-lg-12 col-md-12 mx-auto text-center">
        <p>
          The following are two significant projects I worked on while at CPES from 2019 through 2023. These projects
          showcase my ability to design and develop complex systems from the ground up.
        </p>
      </div>
    </div>
    <div class="row py-0">
      <div class="col-lg-12 col-md-12 mx-auto">
        <div class="album py-5">
          <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3 text-dark">
            <div class="col">
              <div class="projectContainer hasMore" id="internalRebuild" data-bs-toggle="modal"
                data-bs-target="#infoModal">
                <img src="~@/assets/images/internal-rebuild-hero.jpg" class="img-fluid rounded"
                  alt="Internal Website Rebuild" />
                <div class="overlay">
                  <p class="small">Architecture, Leadership, API Design</p>
                  <p class="h4 projectTitle">Internal Website Rebuild</p>
                  <p>
                    From 2019 to 2023, I designed and expanded this internal support website for CPES. It helped
                    students, faculty, staff, and visiting scholars access information and communicate more efficiently.
                    It housed multiple web applications that coordinated purchases, leave requests, and administrative
                    workflows.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="projectContainer hasMore" id="labValidation" data-bs-toggle="modal"
                data-bs-target="#infoModal">
                <img src="~@/assets/images/lab-validation-hero.jpg" class="img-fluid rounded"
                  alt="Lab Validation System" />
                <div class="overlay">
                  <p class="small">Full-Stack Development, Database Design</p>
                  <p class="h4 projectTitle">Lab Validation System</p>
                  <p>
                    Complete build of the internal Lab Validation System. This system tracks student hours, accounts,
                    holidays, vacations, and other administrative facets. An administrator interface allows manipulation
                    of data, statistical analysis, data export, and comprehensive reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="wrapperSection py-0 pb-5 bg-grey position-relative text-secondary px-4">
    <div class="title">Other Projects</div>
    <div class="row pt-5 pb-3">
      <div class="col-lg-12 col-md-12 mx-auto text-center">
        <p>
          Please enjoy various web applications that I've created throughout the years! If you have
          any further questions please feel free to <a href="/#contact">Contact me</a>.
        </p>
      </div>
    </div>
    <div class="row py-0">
      <div class="col-lg-12 col-md-12 mx-auto">
        <div class="album py-5">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 text-dark">
            <div class="col">
              <div class="projectContainer hasMore" id="leave" data-bs-toggle="modal" data-bs-target="#infoModal">
                <img src="~@/assets/images/internal-leave-calendar.png" class="img-fluid rounded"
                  alt="Internal Leave Calendar" />
                <div class="overlay">
                  <p class="small">SQL, PHP, JS, JQuery</p>
                  <p class="h4 projectTitle">Internal Leave</p>
                  <p>
                    The Internal Leave system allows students to quickly input vacation and business
                    travel requests for advisor approval. Once approved, staff can search, sort,
                    modify, and delete any requests without page reloads. The system also calculates
                    individual leave for each student and determines if they are over their maximum
                    allowed leave for that leave period.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="projectContainer hasMore" id="checkout" data-bs-toggle="modal" data-bs-target="#infoModal">
                <img src="~@/assets/images/checkout-forms.png" class="img-fluid rounded" alt="Forms checkout tracker" />
                <div class="overlay">
                  <p class="small">SQL, PHP, JS, JQuery</p>
                  <p class="h4 projectTitle">Checkout Tracker</p>
                  <p>
                    The Checkout Tracker allows staff and faculty an instant view of where a student
                    is in the process of leaving CPES. Some necessary information from the student
                    is collected upon submission. The system is simple and checks the latest status
                    of a checkout to show which step it is on. A query to the model shows if a
                    student has submitted their Thesis/Dissertation to the uploading system.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="projectContainer hasMore" id="purchasing" data-bs-toggle="modal" data-bs-target="#infoModal">
                <img src="~@/assets/images/purchasing-tracker.png" class="img-fluid rounded" alt="purchasing tracker" />
                <div class="overlay">
                  <p class="small">SQL, PHP, JS, JQuery</p>
                  <p class="h4 projectTitle">Purchasing/Reimbursements</p>
                  <p>
                    The Purchasing system included three functionalities: Purchases, Reimbursements,
                    and Travel Reimbursements. Each system was similarly built. Users submitted requests
                    that went through a chain of approvals. The tracker for each function had several
                    stages that a request could be at. These requests could be searched and sorted. The
                    system processed over 10k requests a year.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="projectContainer hasMore" id="reservations" data-bs-toggle="modal"
                data-bs-target="#infoModal">
                <img src="~@/assets/images/room-reservations.png" class="img-fluid rounded"
                  alt="reservations calendar" />
                <div class="overlay">
                  <p class="small">SQL, PHP, JS, JQuery</p>
                  <p class="h4 projectTitle">Room/HPC Reservations</p>
                  <p>
                    Room Reservations and HPC Reservations both use the FullCalendar Event Calendar.
                    Users can reserve a time in a conference room or time on our HPCs (High
                    Performance Computers). A user can reserve a single day, or recurring days for a
                    specific time period. All reservations are stored in the database and pulled
                    dynamically depending on which date is selected. If the Zoom Room (143) is
                    selected a meeting link is added to the Zoom Room Google Calendar to easily
                    start the meeting.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="projectContainer hasMore" id="uploading" data-bs-toggle="modal" data-bs-target="#infoModal">
                <img src="~@/assets/images/upload-archives.png" class="img-fluid rounded" alt="upload archives" />
                <div class="overlay">
                  <p class="small">SQL, PHP, JS, JQuery</p>
                  <p class="h4 projectTitle">Uploading System</p>
                  <p>
                    Students and Faculty can upload their publications to the uploading system for
                    easy archiving. Once uploaded any user can view the archives by using the search
                    functionality. Using a fuzzy search the user can select any date, category, or
                    specific metadata to fine tune their search. If a user makes a mistake and needs
                    to re-upload a document, that can be done on any individual archive page.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="projectContainer hasMore" id="documents" data-bs-toggle="modal" data-bs-target="#infoModal">
                <img src="~@/assets/images/documents-mariadb.png" class="img-fluid rounded" alt="upload archives" />
                <div class="overlay">
                  <p class="small">SQL, PHP, JS, JQuery</p>
                  <p class="h4 projectTitle">Document Retrieval and Insertion</p>
                  <p>
                    Document info is uploaded via XMLHttpRequests which is handeled by common PHP
                    and JS classes for all documents on the Support website. These documents are
                    retrieved and served via PHP after checking user authentication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="infoModalTitle"></h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="infoModalBody">
          <img class="img-fluid ulShadow mx-auto d-block" />
          <p class="intro mt-5"></p>
          <b>Details:</b>
          <p class="details mt-1"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'

const infoBodies = {
  internalRebuild: {
    intro:
      'From 2019 to 2023, I designed and expanded this internal support website for CPES. It helped students, faculty, staff, and visiting scholars access information and communicate more efficiently. It housed multiple web applications that coordinated purchases, leave requests, and administrative workflows.',
    details:
      "This platform was built and expanded over multiple years. It integrated applications including Internal Leave, Purchasing/Reimbursements, Room Reservations, and more. I worked independently on system design, backend architecture, APIs, and maintenance while coordinating requirements with CPES students, faculty, and staff.",
  },
  labValidation: {
    intro:
      'Complete build of the internal Lab Validation System. This system tracks student hours, accounts, holidays, vacations, and other administrative facets. An administrator interface allows manipulation of data, statistical analysis, data export, and comprehensive reporting.',
    details:
      "This system was built from the ground up as a comprehensive solution for managing lab administration. It tracks multiple data facets including student hours, account information, holiday schedules, vacation requests, and other administrative requirements. The system features a robust administrator interface that provides data manipulation capabilities, detailed statistical analysis, and flexible data export functionality. The architecture ensures data integrity through relational database design and provides role-based access control for different user types. This project demonstrated my ability to analyze requirements, design complete systems, and deliver a fully functional application that improved administrative efficiency.",
  },
  leave: {
    intro:
      'The Internal Leave system allows students to quickly input vacation and business travel requests for advisor approval. Once approved, staff can search, sort, modify, and delete any requests without page reloads. The system also calculates individual leave for each student and determines if they are over their maximum allowed leave for that leave period.',
    details:
      "This system uses several tables with relational connections. One table stores the definitions for each student. Including, but not limited to; their advisor's user ID, leave period and maximum allowed leave. Another table stores individual vacations and stores those values in specific columns based on the user inputs.\nThere is a separate view for Faculty, Students, and Staff. Faculty can only see approved/unapproved leave for their assigned students. Students can only see their personal leave and input leave. Staff can see all students' unapproved and approved leave, along with some generic statistics based on each user and their leave.",
  },
  checkout: {
    intro:
      'The Checkout Tracker allows staff and faculty an instant view of where a student is in the process of leaving CPES. Some necessary information from the student is collected upon submission. The system is simple and checks the latest status of a checkout to show which step it is on. A query to the model shows if a student has submitted their Thesis/Dissertation to the uploading system.',
    details:
      "This system is relatively simple. One table stores the dynamic checkout information which is shown on page load. Another table stores the users' progress into the checkout process. This status is determined by the latest insertion into the <q>status</q> table. When a Staff/Faculty approves the current step in the checkout process an email is sent to necessary users and the following status is inserted into this table.\nEach user has the same view, but only the appropriate users can approve the current progress and trigger the next step.",
  },
  purchasing: {
    intro:
      'The Purchasing system currently has three functionalities: Purchases, Reimbursements, and Travel Reimbursements. Each system is similarly built. The user inputs a request for one of the previously mentioned functions and that requests goes through a chain of approvals. The tracker for each function has several stages that a request can be at. These requests can be searched and sorted. The system processes over 10k requests a year.',
    details:
      "When a user submits their request it is stored in a few tables; requests, items, status. The Requests table stores the generic information of a request. For example, the vendor quote file document ID, etc. The Items table stores each individual item, quantity, price, etc. And finally the Status simply stores which step in the process this request is at.\nStudents and Faculty can only see/search their individual requests and its' status. Staff are able to see/search/sort all current requests and their status.",
  },
  reservations: {
    intro:
      'Room Reservations and HPC Reservations both use the FullCalendar Event Calendar. Users can reserve a time in a conference room or time on our HPCs (High Performance Computers). A user can reserve a single day, or recurring days for a specific time period. All reservations are stored in the database and pulled dynamically depending on which date is selected. If the Zoom Room (143) is selected a meeting link is added to the Zoom Room Google Calendar to easily start the meeting.',
    details:
      'This system is pretty simple and its difficultes mainly lie in the initial planning and UI. Reservations are stored in two tables. One table stores the general information for the reservation and another table stores each day. The UI allows users to select multiple days, a specific day of the week, or any recurring reservations. This information is then parsed and inserted into the database.',
  },
  uploading: {
    intro:
      'Students and Faculty can upload their publications to the uploading system for easy archiving. Once uploaded any user can view the archives by using the search functionality. Using a fuzzy search the user can select any date, category, or specific metadata to fine tune their search. If a user makes a mistake and needs to re-upload a document, that can be done on any individual archive page.',
    details:
      'When a user submits a publication to the system they select the type and fill in general information based on that type. This information is stored in three tables; publications, publications(TYPE), and publicationFiles. The Publications table stores the generic information found in each publication. For example, the title, abstract, etc. The publications(TYPE) table is separated into several tables based on the type of publication. This houses the generic information for that specific publication type. And finally the publicationFiles table stores each file for that specific publication and its document ID.',
  },
  documents: {
    intro:
      'Document info is uploaded via XMLHttpRequests which is handeled by common PHP and JS classes for all documents on the Support website. These documents are retrieved and served via PHP after checking user authentication.',
    details:
      "A centralized Javascript class controls all uploads on the support website. The class sends the uploads to another centalized PHP class which checks the file mime type and other various security checks before it's finally uploaded to the server. Once uploaded a ClamAV script checks the file for viruses and then stores it in the documents directory.\nThe document information is stored in a single table, which functions as a housing utility for generic document information. Title, requestURL, timestamps, access level, etc. are stored on this table to provide a little more context on what the process was to upload this file.",
  },
}

export default {
  mounted() {
    $('.projectContainer.hasMore')
      .not('a')
      .on('click', function () {
        var imgSrc = $(this).find('img').attr('src')
        var projectTitle = $(this).find('.projectTitle').text()
        var projectId = $(this).attr('id')
        $('#infoModalTitle').html(projectTitle)
        $('#infoModal .modal-body .intro').html(infoBodies[projectId]['intro'].replace(/\n/g, '<br>'))
        $('#infoModal .modal-body .details').html(
          infoBodies[projectId]['details'].replace(/\n/g, '<br>'),
        )
        $('#infoModalBody img').attr('src', imgSrc)
      })
  },
}
</script>
