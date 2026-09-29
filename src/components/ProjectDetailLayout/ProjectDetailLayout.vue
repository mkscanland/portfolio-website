<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="wrapperSection section-spotlight tw:text-secondary tw:px-6 tw:text-center">
    <div class="tw:py-12">
      <h1 class="display-5 tw:font-bold tw:text-white">{{ title }}</h1>
      <div class="tw:mx-auto tw:lg:w-1/2" data-testid="project-subtitle">
        <slot name="subtitle" />
      </div>
    </div>
  </div>
  <div class="wrapperSection section-light tw:pt-0 tw:pb-12 tw:relative tw:text-secondary tw:px-6">
    <div class="title">Main Information</div>
    <div
      class="tw:px-6 tw:pt-12 tw:mb-12 tw:border-b tw:border-bs-border"
      data-testid="project-intro"
    >
      <slot name="intro" />
    </div>
    <div class="tw:grid tw:grid-cols-1 tw:md:grid-cols-12 tw:gap-12">
      <div class="tw:md:col-span-4" data-testid="project-sidebar">
        <slot name="sidebar" />
      </div>
      <div class="tw:md:col-span-8">
        <article class="blog-post">
          <slot />
        </article>
      </div>
    </div>
  </div>
</template>
