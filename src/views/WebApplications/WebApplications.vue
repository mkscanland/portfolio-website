<script setup>
import { ref } from 'vue'
import ProjectCard from '@/components/ProjectCard/ProjectCard.vue'
import computerBgImage from '@/assets/images/computer-bg.jpg'
import lightbulbBgImage from '@/assets/images/lightbulb-bg.jpg'
import { webApplicationProjects } from '@/content/webApplications'

const keyCpesProjects = webApplicationProjects.filter((project) => project.group === 'key')
const otherProjects = webApplicationProjects.filter((project) => project.group === 'other')
const selectedProject = ref(null)

function selectProject(project) {
  selectedProject.value = project
}
</script>

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
          Showcasing my current and recent projects that demonstrate my latest expertise and
          technical capabilities.
        </p>
      </div>
    </div>
    <div class="row py-0">
      <div class="col-lg-12 col-md-12 mx-auto">
        <div class="album py-5">
          <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3 text-dark">
            <div class="col">
              <ProjectCard
                :image="computerBgImage"
                alt="Digital Appraisals Platform"
                title="Digital Appraisals Platform"
              >
                <template #meta>
                  <p class="small">
                    FastAPI, Python, Azure App Service, API Management, Cosmos DB, Azure Functions,
                    Terraform
                  </p>
                </template>
                <p>
                  A vehicle-pricing platform that provides contractual offers from a VIN and
                  selected vehicle information. I help lead the platform and work across FastAPI,
                  Python, Azure API Management, Cosmos DB, Azure Functions, Terraform, and CI/CD.
                </p>
              </ProjectCard>
            </div>
            <div class="col">
              <ProjectCard
                :image="lightbulbBgImage"
                alt="Rules Engine and Self Service"
                title="Rules Engine / Self Service"
              >
                <template #meta>
                  <p class="small">
                    .NET Core, SQL Server, IIS, Azure Functions, Vue, Azure Storage Tables
                  </p>
                </template>
                <p>
                  I lead the Rules Engine work and its evolution into Self Service. The work
                  includes modernizing legacy .NET and SQL systems, improving the UI and search
                  experience, and moving rule management toward a more maintainable architecture.
                </p>
              </ProjectCard>
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
          The following are two significant projects I worked on while at CPES from 2019 through
          2023. These projects showcase my ability to design and develop complex systems from the
          ground up.
        </p>
      </div>
    </div>
    <div class="row py-0">
      <div class="col-lg-12 col-md-12 mx-auto">
        <div class="album py-5">
          <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3 text-dark">
            <div v-for="project in keyCpesProjects" :key="project.id" class="col">
              <ProjectCard
                :id="project.id"
                :image="project.image"
                :alt="project.alt"
                :title="project.title"
                interactive
                data-bs-toggle="modal"
                data-bs-target="#infoModal"
                @select="selectProject(project)"
              >
                <template #meta>
                  <p class="small">{{ project.technologies }}</p>
                </template>
                <p>{{ project.description }}</p>
              </ProjectCard>
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
            <div v-for="project in otherProjects" :key="project.id" class="col">
              <ProjectCard
                :id="project.id"
                :image="project.image"
                :alt="project.alt"
                :title="project.title"
                interactive
                data-bs-toggle="modal"
                data-bs-target="#infoModal"
                @select="selectProject(project)"
              >
                <template #meta>
                  <p class="small">{{ project.technologies }}</p>
                </template>
                <p>{{ project.description }}</p>
              </ProjectCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
          <h3 class="modal-title" id="infoModalTitle">{{ selectedProject?.title }}</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" id="infoModalBody">
          <img
            v-if="selectedProject"
            :src="selectedProject.image"
            :alt="selectedProject.title"
            class="img-fluid ulShadow mx-auto d-block"
          />
          <p class="intro mt-5">{{ selectedProject?.intro || selectedProject?.description }}</p>
          <b>Details:</b>
          <p class="details mt-1">{{ selectedProject?.details }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details {
  white-space: pre-line;
}
</style>
