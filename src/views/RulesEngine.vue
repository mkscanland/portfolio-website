<template>
  <div class="wrapperSection bg-spotlight text-secondary px-4 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">Rules Engine / Self Service</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">Managing vehicle business rules and modernizing legacy systems.</p>
      </div>
    </div>
  </div>
  <div class="wrapperSection py-0 pb-5 bg-light position-relative text-secondary px-4">
    <div class="title">Main Information</div>
    <div class="px-4 pt-5 mb-5 border-bottom">
      <div class="col-lg-12 mx-auto">
        <p class="lead mb-4">
          The Rules Engine provides a way to store and manage business rules for vehicles based on specific attributes.
          It does not apply the rules itself; its primary purpose is to make those rules available to other systems.
        </p>
      </div>
    </div>
    <div class="row g-5">
      <div class="col-md-4">
        <div>
          <div class="p-4 mb-3 bg-light rounded">
            <h4 class="fst-italic">Technology</h4>
            <p>
              .NET Core, SQL Server, IIS, Azure Functions, Windows Server, Vue, and Azure Storage Tables.
            </p>
          </div>
          <div class="p-4 mb-3 bg-light rounded">
            <h4 class="fst-italic">Role</h4>
            <p>
              I lead the Rules Engine work and its evolution into Self Service, including backend modernization and the
              Vue user interface.
            </p>
          </div>
          <div class="p-4 border-bottom bg-light rounded">
            <h4 class="fst-italic">System Direction</h4>
            <p>
              Pricing logic is moving from DAP into the Rules Engine so that rule management and rule consumption have a
              clearer and more maintainable home.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <article class="blog-post">
          <h2 class="blog-post-title">Rules Engine</h2>
          <p>
            The Rules Engine stores business policies and logic for vehicles based on specific vehicle attributes. Rules
            are migrated to Azure Storage Tables so that integrators can consume them while determining the appropriate
            result for a vehicle.
          </p>
          <p>
            The legacy system is hosted on on-premises Windows servers, uses Microsoft SQL Server for primary data
            storage, and serves its API through IIS. Azure Functions support the migration of rules to Azure Storage
            Tables.
          </p>
          <hr />
          <h3>Self Service</h3>
          <p>
            Self Service evolved from the Rules Engine design. It gives users a more efficient interface for working with
            the rules and improves the search experience. The Vue interface and backend refactoring move the system
            toward a more maintainable architecture.
          </p>
          <hr />
          <h3>Current Direction</h3>
          <p>
            Pricing logic is being moved out of DAP and into the Rules Engine because that logic fits the Rules Engine's
            role. This creates a clearer path for managing rules and supporting the systems that consume them.
          </p>
        </article>
      </div>
    </div>
  </div>
</template>
