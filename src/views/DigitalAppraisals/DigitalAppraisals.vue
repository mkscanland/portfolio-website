<script setup>
import ProjectDetailLayout from '@/components/ProjectDetailLayout/ProjectDetailLayout.vue'
</script>

<template>
  <ProjectDetailLayout title="Digital Appraisals Platform">
    <template #subtitle>
      <p class="fs-5 mb-4">
        Contractual vehicle offers from a VIN and selected vehicle information.
      </p>
    </template>
    <template #intro>
      <div class="col-lg-12 mx-auto">
        <p class="lead mb-4">
          The Digital Appraisals Platform (DAP) is a vehicle-pricing service for the EchoPark line
          of business at Sonic Automotive. It provides a contractual offer for a vehicle based on
          its VIN and selected vehicle information.
        </p>
      </div>
    </template>
    <template #sidebar>
      <div>
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic">Technology</h4>
          <p>
            FastAPI, Python, Azure App Service, Azure API Management, Azure Cosmos DB, Azure
            Functions, Terraform, and CI/CD.
          </p>
        </div>
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic">Role</h4>
          <p>
            I help lead DAP and work across backend services, API design, cloud infrastructure, and
            project delivery.
          </p>
        </div>
        <div class="p-4 border-bottom bg-light rounded">
          <h4 class="fst-italic">Architecture</h4>
          <p>
            The service is hosted on Azure App Service behind an Azure API Management gateway. Azure
            Cosmos DB is the primary data store, and Azure Storage Tables support rule
            determination.
          </p>
        </div>
      </div>
    </template>
    <h2 class="blog-post-title">Purpose</h2>
    <p>
      EchoPark primarily deals in used vehicles. DAP provides a service that prices a vehicle using
      its VIN and selected vehicle information, allowing partners to obtain a contractual offer
      through an API.
    </p>
    <hr />
    <h3>Current Direction</h3>
    <p>
      DAP is being updated as pricing responsibilities move into the
      <a href="/rulesengine">Rules Engine / Self Service</a>. This places rule management and
      related Azure Storage Table integrations in the system responsible for storing and serving
      those rules.
    </p>
    <hr />
    <h3>Technical Focus</h3>
    <p>
      Working on DAP has given me experience with FastAPI, Python, RESTful APIs, Azure API
      Management, Azure Cosmos DB, Azure Functions, Terraform, and CI/CD.
    </p>
  </ProjectDetailLayout>
</template>
