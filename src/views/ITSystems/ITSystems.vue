<script setup>
import ProjectCard from '@/components/ProjectCard/ProjectCard.vue'
import azureDatalakeImage from '@/assets/images/azure-datalake.jpg'
import xiboDockerImage from '@/assets/images/xibo-docker.png'
import cpesSiteImage from '@/assets/images/cpes-site.png'
</script>

<template>
  <div class="wrapperSection section-computer text-secondary px-6 text-center relative">
    <div class="py-12">
      <div class="mx-auto absolute bottom-[20%] left-1/2 -translate-x-1/2 lg:w-1/2">
        <h1 class="display-5 font-bold text-white">IT Systems</h1>
      </div>
    </div>
  </div>
  <div class="wrapperSection section-lightgrey pt-0 pb-12 relative text-secondary px-6">
    <div class="title">Projects</div>
    <div class="flex flex-wrap -mx-3 pt-12 pb-4">
      <div class="w-full shrink-0 px-3 mx-auto text-center">
        <p>
          This page lists various IT Systems that I've worked on over the years. If you have any
          further questions please feel free to <RouterLink to="/#contact">Contact me</RouterLink>.
        </p>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 py-0">
      <div class="w-full shrink-0 px-3 mx-auto">
        <div class="album py-12">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-dark">
            <div>
              <ProjectCard
                id="azure"
                :image="azureDatalakeImage"
                alt="Azure Data Lake"
                title="Microsoft Azure"
              >
                <p>
                  An Azure Data Lake resource is used for CPES archival. This system is built
                  underneath a Virginia Tech Azure subscription and uses the simple Data Lake
                  storage for Azure File Storage. Using the Azure REST API a table on the Support
                  website is updated periodically to provide a simple view for all files contained
                  in this archive.
                </p>
              </ProjectCard>
            </div>
            <div>
              <ProjectCard
                id="xibo"
                :image="xiboDockerImage"
                alt="Xibo digital signage"
                title="Docker/Xibo"
              >
                <p>
                  The <a href="https://xibosignage.com/">Xibo Digital Signage</a> CMS for CPES is
                  built on a Windows machine loaded with Docker Desktop. This system uses a simple
                  docker container that includes NGINX for a reverse proxy. With this CMS CPES can
                  quickly control any digital signage that we use.
                </p>
              </ProjectCard>
            </div>
            <div>
              <ProjectCard
                id="servers"
                :image="cpesSiteImage"
                alt="CPES website"
                title="Web Servers"
              >
                <p>
                  CPES has two main web servers; the Support site, and the
                  <a href="https://cpes.vt.edu/">main CPES website</a>. The Support website uses a
                  PHPCas login system to restrict login to only CPES personell. The main website is
                  open to the public but several files and pages are locked behind a login wall for
                  our member companies.<br />
                  <RouterLink to="/rebuild">Internal Website Rebuild</RouterLink>
                </p>
              </ProjectCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
