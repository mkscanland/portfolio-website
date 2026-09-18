<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  interactive: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select'])

function select() {
  emit('select', { title: props.title, image: props.image })
}

function activateFromKeyboard(event) {
  event.preventDefault()
  event.currentTarget.click()
}
</script>

<template>
  <div
    class="projectContainer"
    :class="{ hasMore: interactive }"
    :role="interactive ? 'button' : undefined"
    :tabindex="interactive ? 0 : undefined"
    @click="interactive && select()"
    @keydown.enter="interactive && activateFromKeyboard($event)"
    @keydown.space="interactive && activateFromKeyboard($event)"
  >
    <img :src="image" class="img-fluid rounded" :alt="alt" />
    <div class="overlay">
      <slot name="meta" />
      <p class="h4 projectTitle">{{ title }}</p>
      <slot />
    </div>
  </div>
</template>
