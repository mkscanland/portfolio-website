<script setup>
import ProjectCard from '@/components/ProjectCard/ProjectCard.vue'
import azureDatalakeImage from '@/assets/images/azure-datalake.jpg'
import xiboDockerImage from '@/assets/images/xibo-docker.png'
import cpesSiteImage from '@/assets/images/cpes-site.png'
</script>

<template>
  <div class="wrapperSection section-computer tw:text-secondary tw:px-6 tw:text-center tw:relative">
    <div class="tw:py-12">
      <div class="tw:mx-auto tw:absolute tw:bottom-[20%] tw:left-1/2 tw:-translate-x-1/2 tw:lg:w-1/2">
        <h1 class="display-5 tw:font-bold tw:text-white">IT Systems</h1>
      </div>
    </div>
  </div>
  <div class="wrapperSection section-lightgrey tw:pt-0 tw:pb-12 tw:relative tw:text-secondary tw:px-6">
    <div class="title">Projects</div>
    <div class="tw:flex tw:flex-wrap tw:-mx-3 tw:pt-12 tw:pb-4">
      <div class="tw:w-full tw:shrink-0 tw:px-3 tw:mx-auto tw:text-center">
        <p>
          This page lists various IT Systems that I've worked on over the years. If you have any
          further questions please feel free to <RouterLink to="/#contact">Contact me</RouterLink>.
        </p>
      </div>
    </div>
    <div class="tw:flex tw:flex-wrap tw:-mx-3 tw:py-0">
      <div class="tw:w-full tw:shrink-0 tw:px-3 tw:mx-auto">
        <div class="album tw:py-12">
          <div class="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:md:grid-cols-3 tw:gap-4 tw:text-dark">
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
