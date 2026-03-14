<template>
  <div class="wrapperSection bg-spotlight text-secondary px-4 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">Matthew Scanland</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">
          Welcome to my portfolio website. Please take a look around.<br />
          For any questions feel free to <a href="/#contact">Contact Me</a>.
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold" href="#significantProjects">My Portfolio</a>
          <a class="btn btn-outline-light btn-lg px-4" href="/files/Scanland-Matthew_Resume.pdf"><i
              class="fa fa-file-pdf"></i> Resume</a>
        </div>
      </div>
    </div>
  </div>
  <div class="wrapperSection bg-orange position-relative text-white px-4 text-center">
    <div class="title">Career</div>
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto whiteBox">
        <h1>Software Engineer</h1>
        <p class="lead mb-2">
          6+ years building back-end systems and leading cross-functional teams.
        </p>
        <p>
          <span class="small">Bachelor's degree in Computer Science from Virginia Tech</span>
        </p>
        <a class="btn btn-outline-light btn-lg px-4" href="/files/Scanland-Matthew_Resume.pdf"><i
            class="fa fa-file-pdf"></i> Resume</a>
      </div>
    </div>
  </div>
  <div class="wrapperSection bg-light position-relative text-dark px-4">
    <div class="title">About Me</div>
    <div class="row py-lg-5">
      <div class="col-lg-8 col-md-10 mx-auto">
        <img src="~@/assets/images/scanland_matthew.jpg" class="img-fluid rounded mx-auto d-block"
          alt="Headshot of Matthew Scanland" />
        <br />
        <ul class="text-muted list-unstyled mx-5">
          <li>
            <strong>Core strengths:</strong> backend architecture, API design, and translating business needs into
            technical solutions.
          </li>
          <li>
            <strong>Leadership:</strong> technical lead on the
            <a href="/rulesengine">Rules Engine</a>; mentor and collaborator across engineering and
            business teams.
          </li>
          <li>
            <strong>Current focus:</strong> modernizing systems and expanding cloud experience
            (Azure, AWS); improving CI/CD for personal projects.
          </li>
        </ul>

        <p class="text-muted mx-5">
          I'm recognized for exceeding goals and delivering maintainable solutions for complex
          problems. At Sonic Automotive I design and develop back-end services (and some front-end
          features). I try to lend a hand to anyone that is struggling and explain any topics they
          might be having trouble with. As technical lead of the
          <a href="/rulesengine">Rules Engine project</a>, I design services and APIs consumed by
          multiple teams. I also contribute to initiatives for the
          <a href="/dap">Digital Appraisals Platform</a>. Some significant projects are showcased on
          this site - if you'd like more details, <a href="#contact">reach out</a>.
        </p>

        <p class="text-muted mx-5" style="font-weight: bold">
          I'm updating this site as part of a CI/CD initiative to reflect recent work; new content
          will be added soon. I apologize for any outdated information or broken links!
        </p>
      </div>
    </div>
  </div>
  <a id="significantProjects"></a>
  <div class="wrapperSection bg-grey position-relative text-dark px-4 pb-0">
    <div class="title">Significant Projects</div>
    <div class="row py-lg-5">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="container px-4">
          <h2 class="pb-2 border-bottom">Web Applications</h2>
          <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div class="col d-flex align-items-start">
              <div>
                <h2><i class="fa fa-server small"></i> Internal Website Rebuild</h2>
                <p>
                  <span class="small">Sep 2019 - Now</span><br />
                  A complete overhaul of a previous version of the internal support website and
                  continued development. This website is designed to help our students, faculty,
                  staff, and visiting scholars access information and communicate with each other
                  more efficiently. It houses several web apps that help coordinate purchases,
                  internal leave, and other administrative workflows.
                </p>
                <a href="/rebuild" class="btn btn-info"> Read More </a>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div>
                <h2><i class="fa fa-calendar small"></i> Lab Validation System</h2>
                <p>
                  <span class="small">Aug 2019 - Dec 2019</span><br />
                  Complete build of the internal Lab Validation System. This system tracks student
                  hours, accounts, holidays, vacations, and other facets. An interface for admin
                  staff allows the manipulation of data, view of statistics, export of data, etc.
                </p>
                <a href="/validations" class="btn btn-info"> Read More </a>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div>
                <h2><i class="fa fa-book-open small"></i> Other Web Applications</h2>
                <p>
                  <span class="small">April 2019 - Now</span><br />
                  Throughout my time at CPES I have created several requested web apps. These
                  include: Purchasing, Lab Validations, Internal Vacations, Conference Room
                  Reservations, and more.
                </p>
                <a href="/webapps" class="btn btn-info">
                  See all other Support Website applications
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-lightGrey position-relative text-dark px-4 pb-5">
    <div class="row py-lg-5">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="container px-4">
          <h2 class="pb-2 border-bottom">Current Projects</h2>
          <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div class="col d-flex align-items-start">
              <div>
                <h2><i class="fa fa-brain small"></i> Self Improvement</h2>
                <p>
                  This website is a pet project to learn AWS and Vue. I'll be updating it
                  when I have the time.<br />
                  I also research various IT and software subjects for my job. Most of the time I
                  try to learn best practices before I contribute to any projects. Preparing for
                  most situations and truly learning a subject before implementing a new system has
                  saved a lot of time and man-hours in the future.<br />
                  Having a good life outside of work is also important. I try to learn a new skill
                  every year and spend as much time with my loved ones as I can.
                </p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div>
                <h2><i class="fa fa-object-group small"></i> Tie the Support Back-end Together</h2>
                <p>
                  As I develop more applications on the support, CPES internal, website the back-end
                  is beginning to grow exponentially. While designing these applications I have been
                  accounting for this growth by looking for ways to tie these systems together when
                  applicable.
                </p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div>
                <h2><i class="fa fa-cloud small"></i> AWS/Azure</h2>
                <p>
                  I plan on using AWS as a main cloud provider for personal projects.<br />
                  <b>Work:</b> I am fairly proficient with Azure; in the past (at Virginia Tech)
                  many of the systems I worked on were on-prem or in Azure. At Sonic, the main
                  projects I work on are also on-prem or in Azure. We have initiatives moving to
                  AWS, so I expect to gain hands-on AWS experience as well.<br />
                  <b>Personal:</b> I plan on using a few PaaS/SaaS resources to build my
                  portfolio.<br />
                  I'm currently designing a PVP/PVE game involving dice rolls that will integrate
                  with Twitch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-dark position-relative text-light px-4 pb-5">
    <div class="title">Important Practices &amp; Goals</div>
    <div class="row py-lg-5">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="container px-4 py-5">
          <h2 class="pb-2 border-bottom">Practices</h2>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 py-2">
            <div class="col d-flex align-items-start">
              <div>
                <h4 class="fw-bold mb-0"><i class="fa fa-eye small"></i> Readability</h4>
                <p>
                  Writing code that others are able to understand and read easily is one of my
                  biggest goals. With my code I can ensure future updates are more easily
                  implemented and bugs are fixed quickly.
                </p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div>
                <h4 class="fw-bold mb-0">
                  <i class="fa fa-list-check small"></i> Project Management
                </h4>
                <p>
                  Two of the most important practices to have a project run smoothly is coordination
                  and organization. Having these two skills will make or break a project.
                </p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div>
                <h4 class="fw-bold mb-0"><i class="fa fa-comments small"></i> Communication</h4>
                <p>
                  Working with a team comes into play in nearly every aspect of Software
                  Development. Great communication skills drastically improve morale, coordination,
                  direction, engagement, and productivity.
                </p>
              </div>
            </div>
          </div>
          <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 g-4 py-4">
            <div class="col d-flex align-items-start">
              <div>
                <h4 class="fw-bold mb-0"><i class="fa fa-robot small"></i> AI/ML</h4>
                <p>
                  As AI (machine learning) becomes more prevelant in my career I try to stay
                  up-to-date on the latest developments. I believe that AI is a good <b>tool</b> to
                  use in certain situations. I mainly use AI for boilerplate, proofreading, finding
                  functionality in documentation, and brainstorming. I feel that blindly accepting
                  what AI generates leads to skill loss and, in most situations, isn't the best
                  solution considering the various nuances that arise in my field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row py-0">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="container px-4">
          <h2 class="pb-2 border-bottom">Goals</h2>
          <div class="album py-5">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 text-dark">
              <div class="col">
                <div class="card shadow-sm">
                  <img src="~@/assets/images/problem-solving.png" class="img-fluid"
                    alt="Problem solving illustration" />
                  <div class="card-body">
                    <p class="card-text">
                      <b>Problem Solving</b><br />
                      Finding a solution can be easy but finding a solution that works well, fits
                      the constraints of the project, and is efficient takes a lot of knowledge
                      and/or skill. Problem solving is used in nearly every aspect of Engineering.
                      Without problems there wouldn't be a need for any new applications or
                      software. I do all I can to ensure that my code is concise but solves the
                      problem at its core.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <img src="~@/assets/images/marble.png" class="img-fluid" alt="Attention to detail illustration" />
                  <div class="card-body">
                    <p class="card-text">
                      <b>Attention to Detail</b><br />
                      When working on a project I am sure to be thorough and accurate while handling
                      complex code and documents. Writing, whether that is code or documents, should
                      be as clear as possible. If I am not around to explain any of my writing the
                      person reading it should be able to know precisely what is meant to be
                      conveyed.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <img src="~@/assets/images/analysis.png" class="img-fluid" alt="Analysis illustration" />
                  <div class="card-body">
                    <p class="card-text">
                      <b>Analysis</b><br />
                      Analyzing and predicting the requirements of a project and understanding those
                      requirements is critical to the success of the team. Information should be
                      examined to determine, recommend, and plan the correct course of action in any
                      situation. A proper analysis is an investment of time that will pay off
                      greatly in the end.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <img src="~@/assets/images/reactiveness-hand.png" class="img-fluid"
                    alt="Responsiveness illustration" />
                  <div class="card-body">
                    <p class="card-text">
                      <b>Usability</b><br />
                      Programs should be simple enough to use without being forced to read a
                      manual.<br />
                      Users should be able to become familiar with the product, but they should also
                      be able to use the product easily right away. There's nothing more frustrating
                      than trying to reach a specific part of an application or website, only to
                      have to click through buttons for three minutes. Shortcuts should be present
                      while not being intrusive. I ensure that my programs are intuitive throughout
                      their usage.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <img src="~@/assets/images/ux-feeling.png" class="img-fluid" alt="Patterns illustration" />
                  <div class="card-body">
                    <p class="card-text">
                      <b>Patterns</b><br />
                      Programming patterns can make or break a project. <br />
                      A lot of developers fall into the trap that you <i>must</i> use a pattern in
                      all situations, even if it doesn't fit the situation. The hard part is slowing
                      down for a little bit and thinking over the problem before you start your
                      work. Take a breath and think about the outcome you desire before you start
                      work.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm">
                  <img src="~@/assets/images/usability-coming-together.png" class="img-fluid"
                    alt="Usability and responsiveness illustration" />
                  <div class="card-body">
                    <p class="card-text">
                      <b>Responsiveness</b><br />
                      Responding to user input is critical in developing easy-to-use applications.
                      Working with the user rather than for the user can improve their experience.
                      For example, users should be able to see when the application is processing
                      data or when a button has been clicked. Showing that the program is working
                      through a task can help with impatience and has a calming effect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <a id="contact"></a>
  <div class="wrapperSection bg-grey position-relative text-dark px-4 pb-0">
    <div class="title">Contact Info</div>
    <div class="row py-lg-5">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="container px-4 py-5">
          <h2 class="pb-2 border-bottom">Feel Free to Use Any!</h2>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 g-4 py-5">
            <div class="col d-flex align-items-start">
              <div>
                <h4 class="fw-bold mb-0">
                  <a href="https://www.linkedin.com/in/matthew-scanland/"><i class="fa-brands fa-linkedin small"></i>
                    LinkedIn</a>
                </h4>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div>
                <h4 class="fw-bold mb-0"><i class="fa fa-inbox small"></i> Email</h4>
                <p>
                  <a href="mailto:mkscanland@gmail.com">mkscanland@gmail.com</a>
                </p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div>
                <h4 class="fw-bold mb-0"><i class="fa fa-phone small"></i> Phone</h4>
                <p>(540) 267-5538</p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div>
                <h4 class="fw-bold mb-0"><i class="fa fa-crow small"></i> Carrier Pigeon</h4>
                <p>Send to <q>The Bird Man</q>. He will relay the message shortly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
