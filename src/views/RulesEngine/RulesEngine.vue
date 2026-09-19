<script setup>
import ProjectDetailLayout from '@/components/ProjectDetailLayout/ProjectDetailLayout.vue'
</script>

<template>
  <ProjectDetailLayout title="Rules Engine / Self Service">
    <template #subtitle>
      <p class="fs-5 mb-4">Managing, prioritizing, and distributing vehicle business rules.</p>
    </template>
    <template #intro>
      <div class="col-lg-12 mx-auto">
        <p class="lead mb-4">
          The Rules Engine stores and manages pricing, fee, and vehicle-segmentation rules. It does
          not apply those rules itself; it prepares them so DAP and other consuming systems can use
          a prioritized ruleset efficiently.
        </p>
      </div>
    </template>
    <template #sidebar>
      <div>
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic">Technology</h4>
          <p>
            .NET Core, SQL Server, IIS, Azure Functions, Windows Server, Vue, and Azure Storage
            Tables.
          </p>
        </div>
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic">Role</h4>
          <p>
            I lead the Rules Engine work and its evolution into Self Service, including rule
            determination improvements and the current Vue interface modernization.
          </p>
        </div>
        <div class="p-4 border-bottom bg-light rounded">
          <h4 class="fst-italic">System Direction</h4>
          <p>
            The current modernization effort focuses on the Self Service UI. Longer-term work will
            improve the broader architecture and support more dynamic rule-policy creation.
          </p>
        </div>
      </div>
    </template>
    <h2 class="blog-post-title">Rules Engine</h2>
    <p>
      The Rules Engine provides a central place for business policies that influence vehicle
      pricing, fees, and segmentation. Its responsibility is to store, organize, and distribute the
      rules; DAP and other integrations remain responsible for applying the resulting ruleset.
    </p>
    <p>
      The legacy system is hosted on on-premises Windows servers, uses Microsoft SQL Server for
      primary data storage, and serves its API through IIS. Azure Functions support the migration of
      rules to Azure Storage Tables.
    </p>
    <hr />
    <h3>Preprocessed Rule Priority</h3>
    <p>
      The migration process calculates rule priority based on how each rule will be applied before
      publishing the rules to Azure Storage Tables. DAP can then consume an ordered ruleset instead
      of sorting and prioritizing rules during an appraisal.
    </p>
    <p>
      I redesigned this rule-determination path after taking ownership of the project, reducing its
      processing time from roughly four seconds to under 300 milliseconds.
    </p>
    <hr />
    <h3>Self Service</h3>
    <p>
      Business users use Self Service to create, view, validate, search, and manage rules. The
      current modernization work is focused on replacing and improving that interface with Vue so
      users can work with the rule catalog more efficiently.
    </p>
    <hr />
    <h3>Current Direction</h3>
    <p>
      Pricing logic is being moved out of DAP and into the Rules Engine because that logic fits the
      Rules Engine's role. Planned architectural work will make rule-policy creation more dynamic
      and give rule management and consumption a clearer, more maintainable home.
    </p>
    <p>
      AI-agent support for rule management is also on the radar, but it remains in the planning
      phase and has not been implemented.
    </p>
  </ProjectDetailLayout>
</template>
