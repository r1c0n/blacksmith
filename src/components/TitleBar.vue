<template>
  <div :class="['title-bar', { inactive: inactive }]">
    <div class="title-bar-text">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    inactive: Boolean
  }
}
</script>
