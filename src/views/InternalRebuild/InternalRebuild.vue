<script setup>
import ProjectDetailLayout from '@/components/ProjectDetailLayout/ProjectDetailLayout.vue'
</script>

<template>
  <ProjectDetailLayout title="Internal Website Rebuild">
    <template #subtitle>
      <p class="fs-5 mb-4">Supporting CPES staff, students, and faculty</p>
    </template>
    <template #intro>
      <div class="overflow-hidden" style="max-height: 30vh">
        <div class="container px-5 text-center">
          <img
            src="~@/assets/images/support-site-navbar.png"
            class="img-fluid border rounded-3 shadow-lg mb-4"
            alt="Example image"
            loading="lazy"
          />
        </div>
      </div>
      <div class="col-lg-12 mx-auto">
        <p class="lead mb-4">
          From 2019 to 2023, I designed and expanded this internal support website for CPES at
          Virginia Tech. It began as a simple HTML site for housing forms. I imported the core code
          from the main CPES website and modified it for the support site, implementing a MySQL
          database along with PHP, jQuery, and JavaScript. I also rebuilt the existing functionality
          and removed the Google Apps Script dependencies.<br />
          As CPES personnel's needs grew, I worked with students, faculty, and staff to identify
          weak points in operations and create web applications to address them.<br />
          To increase security, I implemented a two-factor phpCAS system tied to Virginia Tech. The
          support site became an interconnected web application with functionality for purchases,
          leave requests, reservations, and other administrative workflows.
        </p>
      </div>
    </template>
    <template #sidebar>
      <div>
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic">Development</h4>
          <p>
            The internal support website was developed on an Apache server using a MySQL database
            that interacted with a PHP SQL connection. The design used a base Bootstrap 3 CSS and
            custom elements created by the team. UI elements were controlled by jQuery and
            JavaScript.
          </p>
        </div>
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic">The Team</h4>
          <ol class="list-unstyled">
            <li>
              <b>Matthew Scanland</b><br />
              In charge of planning, analysis, design, implementation, and maintenance.
            </li>
            <li>
              <b>Students, Faculty, and Staff</b><br />
              In charge of planning, analysis, design, implementation, and maintenance.
            </li>
          </ol>
        </div>
        <div class="p-4 border-bottom bg-light rounded">
          <h4 class="fst-italic">Implementation Decisions</h4>
          <p>
            <b>Back-end</b><br />
            MySQL can handle large datasets and has fast query processing. The main website was
            built on PHP so importing the core functionality was simple. PHP is also very simple to
            use and is fairly reliable. phpCAS was used for extra security. It required little setup
            since Virginia Tech already provides the 2-factor authentication.
          </p>
        </div>
        <div class="p-4 border-bottom bg-light rounded">
          <p>
            <b>Front-end</b><br />
            Bootstrap, JQuery, and Javascript is free and we already had a rough custom-built
            website around it's design. I greatly improved the imported functionality so that web
            applications could be created with ease.
          </p>
        </div>
        <div class="p-4 border-bottom bg-light rounded">
          <p>
            <b>Ease-of-use</b><br />
            Designing the web applications to be easy to use is a primary goal. These applications
            are meant to make life easier, not harder.
          </p>
        </div>
        <div class="p-4 border-bottom bg-light rounded">
          <p>
            <b>Forward compatibility</b><br />
            I designed the systems with future changes in mind so that they could last as long as
            CPES needed them with few modifications.
          </p>
        </div>
        <div class="p-4 border-bottom bg-light rounded">
          <p>
            <b>Project Outcome</b><br />
            The support website connected the applications and made it easier for CPES personnel to
            complete common administrative tasks.
          </p>
        </div>
      </div>
    </template>
    <h2 class="blog-post-title">Reformatting</h2>
    <p>
      In order to easily add various applications I removed all pre-existing Google Apps Script
      code. I also modified the main website MVC (model, view, controller) design pattern to fit a
      more on-demand query structure.
    </p>
    <hr />
    <h3>Design</h3>
    <div class="overflow-hidden" style="max-height: 40vh">
      <div class="container px-5 text-center">
        <img
          src="~@/assets/images/support-site-home.png"
          class="img-fluid border rounded-3 shadow-lg mb-4"
          alt="Example image"
          loading="lazy"
        />
      </div>
    </div>
    <p class="pt-4">
      The website was built similarly to other web applications, as shown in the censored image
      above. It had a navigational menu at the top that took users to different sections. Each page
      contained applications or information. The design was made to be simple and intuitive while
      still providing powerful functionality.
    </p>
    <hr />
    <h3>Functionality</h3>
    <div class="overflow-hidden" style="max-height: 40vh">
      <div class="container px-5 text-center">
        <img
          src="~@/assets/images/lab-validations-help.png"
          class="img-fluid border rounded-3 shadow-lg mb-4"
          alt="Example image"
          loading="lazy"
        />
      </div>
    </div>
    <p class="pt-4">
      The functionality of an application is just as important, if not moreso, than the design. The
      internal website is designed to function as a set of separate systems that can be tied
      together if needed.<br />
      The main goal of the site is to make life easier for everyone. This could be inputting a
      vacation, clocking time into the labs, making a purchase, or many other things. To have all of
      these function in a reasonable time there has to be a lot of planning put into their
      implementation.
    </p>
    <hr />
    <h3>Applications</h3>
    <p>
      You can see more information about the support website (and other) applications in other pages
      on the <a href="/webapps">Web Apps Page</a>.
    </p>
  </ProjectDetailLayout>
</template>
