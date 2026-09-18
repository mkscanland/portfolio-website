<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="wrapperSection bg-spotlight text-secondary px-4 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">{{ title }}</h1>
      <div class="col-lg-6 mx-auto">
        <slot name="subtitle" />
      </div>
    </div>
  </div>
  <div class="wrapperSection py-0 pb-5 bg-light position-relative text-secondary px-4">
    <div class="title">Main Information</div>
    <div class="px-4 pt-5 mb-5 border-bottom">
      <slot name="intro" />
    </div>
    <div class="row g-5">
      <div class="col-md-4">
        <slot name="sidebar" />
      </div>
      <div class="col-md-8">
        <article class="blog-post">
          <slot />
        </article>
      </div>
    </div>
  </div>
</template>
