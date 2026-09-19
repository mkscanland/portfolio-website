<script setup>
import ProjectDetailLayout from '@/components/ProjectDetailLayout/ProjectDetailLayout.vue'
</script>

<template>
  <ProjectDetailLayout title="Digital Appraisals Platform">
    <template #subtitle>
      <p class="fs-5 mb-4">
        Turning vehicle details into contractual offers for internal Sonic applications and external
        partners.
      </p>
    </template>
    <template #intro>
      <div class="col-lg-12 mx-auto">
        <p class="lead mb-4">
          The Digital Appraisals Platform (DAP) is a vehicle-pricing service for the EchoPark line
          of business at Sonic Automotive. It coordinates the information needed to appraise a
          vehicle, runs the completed appraisal through final-offer logic, and returns a contractual
          offer.
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
            I am one of the primary engineers responsible for the DAP API and its releases. I also
            lead the Rules Engine work that supplies prioritized rulesets used during offer
            generation.
          </p>
        </div>
        <div class="p-4 border-bottom bg-light rounded">
          <h4 class="fst-italic">Architecture</h4>
          <p>
            The service is hosted on Azure App Service behind an Azure API Management gateway. Azure
            Cosmos DB is the primary data store for appraisal state while DAP coordinates data from
            third-party sources and other Sonic systems.
          </p>
        </div>
      </div>
    </template>
    <h2 class="blog-post-title">Purpose</h2>
    <p>
      EchoPark primarily deals in used vehicles. DAP gives internal Sonic applications and external
      partners a consistent API for gathering appraisal information and generating a contractual
      vehicle offer.
    </p>
    <hr />
    <h3>Appraisal Workflow</h3>
    <p>
      DAP operates as a state machine. It stores an appraisal as information arrives and advances
      that appraisal until the data required to produce an offer has been collected. The completed
      appraisal then runs through the platform's final-offer logic.
    </p>
    <p>
      Vehicle details come from adjustment questions, third-party data, and other internal Sonic
      systems. A third-party history report can identify accidents, major hail damage, structural
      damage, and rust. Adjustment questions add details such as accident count, whether the vehicle
      is drivable, whether dashboard warning lights are active, and other condition information.
    </p>
    <hr />
    <h3>Scale and Performance</h3>
    <p>
      The platform processes around 10,000 offers per day, representing approximately 200,000 API
      calls. Endpoints average under 300 milliseconds, while the full workflow from the beginning of
      an appraisal to a completed offer takes roughly seven seconds.
    </p>
    <hr />
    <h3>Long-Running Data Collection</h3>
    <p>
      DAP currently uses FastAPI BackgroundTasks for long-running data-gathering work. Because those
      tasks run inside the application process, rare runtime interruptions can prevent unfinished
      work from completing. We are moving that work to a managed Azure message queue so task
      execution no longer depends on the lifetime of an individual API process.
    </p>
    <hr />
    <h3>Rules Integration</h3>
    <p>
      The pipeline that makes rules available to DAP is a separate process within the DAP Data
      Ingestion project. The
      <RouterLink to="/rulesengine">Rules Engine / Self Service</RouterLink> prepares rule priority
      ahead of time, allowing DAP to consume an ordered ruleset instead of calculating priority
      during offer generation.
    </p>
    <hr />
    <h3>Current Direction</h3>
    <p>
      In addition to moving background work to a durable queue, pricing responsibilities are moving
      from DAP into the Rules Engine. This keeps rule definition, prioritization, and distribution
      in the system designed to manage them while DAP remains focused on the appraisal and offer
      workflow.
    </p>
  </ProjectDetailLayout>
</template>
