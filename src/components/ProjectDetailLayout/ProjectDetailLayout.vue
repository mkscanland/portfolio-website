<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="wrapperSection section-spotlight text-secondary px-6 text-center">
    <div class="py-12">
      <h1 class="display-5 font-bold text-white">{{ title }}</h1>
      <div class="mx-auto lg:w-1/2" data-testid="project-subtitle">
        <slot name="subtitle" />
      </div>
    </div>
  </div>
  <div class="wrapperSection section-light pt-0 pb-12 relative text-secondary px-6">
    <div class="title">Main Information</div>
    <div
      class="px-6 pt-12 mb-12 border-b border-bs-border"
      data-testid="project-intro"
    >
      <slot name="intro" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
      <div class="md:col-span-4" data-testid="project-sidebar">
        <slot name="sidebar" />
      </div>
      <div class="md:col-span-8">
        <article class="blog-post">
          <slot />
        </article>
      </div>
    </div>
  </div>
</template>
