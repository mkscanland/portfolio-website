<script setup>
import { ref } from 'vue'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import ProjectCard from '@/components/ProjectCard/ProjectCard.vue'
import computerBgImage from '@/assets/images/computer-bg.jpg'
import lightbulbBgImage from '@/assets/images/lightbulb-bg.jpg'
import { webApplicationProjects } from '@/content/webApplications'

const keyCpesProjects = webApplicationProjects.filter((project) => project.group === 'key')
const otherProjects = webApplicationProjects.filter((project) => project.group === 'other')
const selectedProject = ref(null)
const modalOpen = ref(false)
let pointerStartedOnBackdrop = false

function selectProject(project) {
  selectedProject.value = project
  modalOpen.value = true
}

// Match Bootstrap: focus the dialog container, not the close button (which would show a focus ring).
function focusModal(event) {
  event.preventDefault()
  document.getElementById('infoModal')?.focus()
}

function trackBackdropPress(event) {
  pointerStartedOnBackdrop = event.target === event.currentTarget
}

function closeOnBackdropClick(event) {
  if (pointerStartedOnBackdrop && event.target === event.currentTarget) modalOpen.value = false
  pointerStartedOnBackdrop = false
}
</script>

<template>
  <div class="wrapperSection section-lightbulb text-secondary px-6 text-center relative">
    <div class="py-12">
      <div class="mx-auto absolute bottom-[20%] left-1/2 -translate-x-1/2 lg:w-1/2">
        <h1 class="display-5 font-bold text-white">Web Applications Archive</h1>
      </div>
    </div>
  </div>
  <div class="wrapperSection section-white pt-0 pb-12 relative text-secondary px-6">
    <div class="title">Key Current Projects</div>
    <div class="flex flex-wrap -mx-3 pt-12 pb-4">
      <div class="w-full shrink-0 px-3 mx-auto text-center">
        <p>
          Showcasing my current and recent projects that demonstrate my latest expertise and
          technical capabilities.
        </p>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 py-0">
      <div class="w-full shrink-0 px-3 mx-auto">
        <div class="album py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-dark">
            <div>
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
            <div>
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
  <div class="wrapperSection section-lightgrey pt-0 pb-12 relative text-secondary px-6">
    <div class="title">Key CPES Projects</div>
    <div class="flex flex-wrap -mx-3 pt-12 pb-4">
      <div class="w-full shrink-0 px-3 mx-auto text-center">
        <p>
          The following are two significant projects I worked on while at CPES from 2019 through
          2023. These projects showcase my ability to design and develop complex systems from the
          ground up.
        </p>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 py-0">
      <div class="w-full shrink-0 px-3 mx-auto">
        <div class="album py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-dark">
            <div v-for="project in keyCpesProjects" :key="project.id">
              <ProjectCard
                :id="project.id"
                :image="project.image"
                :alt="project.alt"
                :title="project.title"
                interactive
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
  <div class="wrapperSection section-grey pt-0 pb-12 relative text-secondary px-6">
    <div class="title">Other Projects</div>
    <div class="flex flex-wrap -mx-3 pt-12 pb-4">
      <div class="w-full shrink-0 px-3 mx-auto text-center">
        <p>
          Please enjoy various web applications that I've created throughout the years! If you have
          any further questions please feel free to <RouterLink to="/#contact">Contact me</RouterLink>.
        </p>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 py-0">
      <div class="w-full shrink-0 px-3 mx-auto">
        <div class="album py-12">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-dark">
            <div v-for="project in otherProjects" :key="project.id">
              <ProjectCard
                :id="project.id"
                :image="project.image"
                :alt="project.alt"
                :title="project.title"
                interactive
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
  <DialogRoot v-model:open="modalOpen">
    <DialogPortal>
      <DialogOverlay class="modal-backdrop show" />
      <DialogContent
        id="infoModal"
        class="modal show"
        style="display: block"
        @open-auto-focus="focusModal"
        @pointerdown="trackBackdropPress"
        @click.self="closeOnBackdropClick"
      >
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <DialogTitle as="h3" class="modal-title">
                {{ selectedProject?.title }}
              </DialogTitle>
              <DialogClose class="btn-close" aria-label="Close" />
            </div>
            <div class="modal-body" id="infoModalBody">
              <img
                v-if="selectedProject"
                :src="selectedProject.image"
                :alt="selectedProject.title"
                class="ulShadow mx-auto block"
              />
              <DialogDescription class="intro mt-12">
                {{ selectedProject?.intro || selectedProject?.description }}
              </DialogDescription>
              <b>Details:</b>
              <p class="details mt-1">{{ selectedProject?.details }}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.details {
  white-space: pre-line;
}
</style>
