<template>
  <div class="wrapperSection bg-spotlight text-secondary px-4 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">Internal Website Rebuild</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">Helping the staff, students, and Faculty</p>
      </div>
    </div>
  </div>
  <div class="wrapperSection py-0 pb-5 bg-light position-relative text-secondary px-4">
    <div class="title">Main Information</div>
    <div class="px-4 pt-5 mb-5 border-bottom">
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
          The internal support site at CPES started from a simple html website to house forms. In
          2016 the former CPES webmaster improved upon it by adding in Google Script functionality.
          The website and CPES personnel evolved more needs and she began adding simple programs.<br />
          After I took over thier position at CPES I imported the main website (cpes.vt.edu) core
          code and modified it to suit our needs for the support website. I implemented a MySQL
          database along with PHP, JQuery, and javascript. I then re-built the previous code to suit
          the new site. To keep everything under our control I also removed all Google Script
          functionality.<br />
          As things usually go, CPES personnel's needs continued to grow and I enjoy coding so my
          supervisor gave the green light to do whatever I wanted. With the help from students,
          faculty, and some staff I found several weak points in our operations and created some web
          apps to solve those needs.<br />
          To increase security I implemented a 2-factor PHPCas system that is tied into Virginia
          Tech. The support site is now an interconnected web application that is tied together on
          various levels. I continue to work with some fantastic coworkers to add new functionality
          and hopefully make everyone's job easier.
        </p>
      </div>
    </div>
    <div class="row g-5">
      <div class="col-md-4">
        <div>
          <div class="p-4 mb-3 bg-light rounded">
            <h4 class="fst-italic">Development</h4>
            <p>
              The internal support website is currently developed on an Apache server using a MySQL
              database that interacts with a PHP sql connection. Design is left to a base Bootstrap
              3 css and some custom elements that the team created. UI elements are controlled by
              JQuery and Javascript.
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
              built on PHP so importing the core functionality was simple. PHP is also very simple
              to use and is fairly reliable. phpCAS was used for extra security. It required little
              setup since Virginia Tech already provides the 2-factor authentication.
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
              <b>Forward compatability</b><br />
              I've kept in mind that many systems will change over time. I hope that the systems
              will be able to last as long as we need them with few modifications.
            </p>
          </div>
          <div class="p-4 border-bottom bg-light rounded">
            <p>
              <b>Future</b><br />
              The future of the support website seems bright. I will continue to add functionality
              and tie the systems together.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <article class="blog-post">
          <h2 class="blog-post-title">Reformatting</h2>
          <p>
            In order to easily add various applications I removed all pre-existing Google Apps
            Script code. I also modified the main website MVC (model, view, controller) design
            pattern to fit a more on-demand query structure.
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
            The website is built similar to any other, see the censored image above. It has a
            navigational menu at the top that will take you to different sections. Under each page
            there are different applications or information. The design was made to be simple and
            intuitive while also providing a powerful functionality for each page.
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
            The functionality of an application is just as important, if not moreso, than the
            design. The internal website is designed to function as a set of separate systems that
            can be tied together if needed.<br />
            The main goal of the site is to make life easier for everyone. This could be inputting a
            vacation, clocking time into the labs, making a purchase, or many other things. To have
            all of these function in a reasonable time there has to be a lot of planning put into
            their implementation.
          </p>
          <hr />
          <h3>Applications</h3>
          <p>
            You can see more information about the support website (and other) applications in other
            pages on the <a href="/webapps">Web Apps Page</a>.
          </p>
        </article>
      </div>
    </div>
  </div>
</template>
