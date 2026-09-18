<template>
  <div class="wrapperSection bg-computer text-secondary px-4 text-center position-relative">
    <div class="py-5">
      <div class="col-lg-6 mx-auto position-absolute bottom-20 start-50 translate-middle-x">
        <h1 class="display-5 fw-bold text-white">IT Systems</h1>
      </div>
    </div>
  </div>
  <div class="wrapperSection py-0 pb-5 bg-lightGrey position-relative text-secondary px-4">
    <div class="title">Projects</div>
    <div class="row pt-5 pb-3">
      <div class="col-lg-12 col-md-12 mx-auto text-center">
        <p>
          This page lists various IT Systems that I've worked on over the years. If you have any
          further questions please feel free to <a href="/#contact">Contact me</a>.
        </p>
      </div>
    </div>
    <div class="row py-0">
      <div class="col-lg-12 col-md-12 mx-auto">
        <div class="album py-5">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 text-dark">
            <div class="col">
              <div class="projectContainer" id="azure">
                <img
                  src="~@/assets/images/azure-datalake.jpg"
                  class="img-fluid rounded"
                  alt="Internal Leave Calendar"
                />
                <div class="overlay">
                  <p class="h4 projectTitle">Microsoft Azure</p>
                  <p>
                    An Azure Data Lake resource is used for CPES archival. This system is built
                    underneath a Virginia Tech Azure subscription and uses the simple Data Lake
                    storage for Azure File Storage. Using the Azure REST API a table on the Support
                    website is updated periodically to provide a simple view for all files contained
                    in this archive.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="projectContainer" id="xibo">
                <img
                  src="~@/assets/images/xibo-docker.png"
                  class="img-fluid rounded"
                  alt="Forms checkout tracker"
                />
                <div class="overlay">
                  <p class="h4 projectTitle">Docker/Xibo</p>
                  <p>
                    The <a href="https://xibosignage.com/">Xibo Digital Signage</a> CMS for CPES is
                    built on a Windows machine loaded with Docker Desktop. This system uses a simple
                    docker container that includes NGINX for a reverse proxy. With this CMS CPES can
                    quickly control any digital signage that we use.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="projectContainer" id="servers">
                <img
                  src="~@/assets/images/cpes-site.png"
                  class="img-fluid rounded"
                  alt="purchasing tracker"
                />
                <div class="overlay">
                  <p class="h4 projectTitle">Web Servers</p>
                  <p>
                    CPES has two main web servers; the Support site, and the
                    <a href="https://cpes.vt.edu/">main CPES website</a>. The Support website uses a
                    PHPCas login system to restrict login to only CPES personell. The main website
                    is open to the public but several files and pages are locked behind a login wall
                    for our member companies.<br />
                    <a href="/rebuild">Internal Website Rebuild</a>
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
  <div
    class="modal fade"
    id="infoModal"
    tabindex="-1"
    aria-labelledby="infoModalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="infoModalTitle"></h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" id="infoModalBody">
          <img class="img-fluid ulShadow mx-auto d-block" />
          <p class="mt-5"></p>
        </div>
      </div>
    </div>
  </div>
</template>
