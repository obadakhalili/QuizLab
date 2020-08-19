<template>
  <div class="sections-container">
    <label>Sections</label>
    <div
      v-for="(section, index) in sections"
      :key="index"
      @click="$emit('change-viewed-section', section)"
      class="section-card p-2 mb-1"
    >
      <template v-if="section.title">{{ section.title }}</template>
      <span v-else class="text-secondary">Unnamed section</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionsNavigator",
  props: ["sections"]
};
</script>

<style scoped>
.sections-container {
  max-height: 500px;
  overflow-y: auto;
}
.section-card {
  background-color: #e5e5e5;
  border-radius: 2px;
  cursor: pointer;
}
.section-card:hover {
  background-color: #d9d7d7;
}
</style>
