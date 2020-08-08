<template>
  <div>
    <div v-if="nestedSections.length" class="sections-container">
      <label>Sections</label>
      <div
        v-for="(section, index) in nestedSections"
        :key="index"
        @click="$emit('change-viewed-section', section)"
        class="section-card p-2 mb-1"
      >
        <template v-if="section.title">{{ section.title }}</template>
        <span v-else class="text-secondary">Unnamed section</span>
      </div>
    </div>
    <div v-if="nestedQuestions.length" class="questions-container">
      <label>Questions</label>
      <b-row no-gutters>
        <b-col
          cols="2"
          v-for="(question, index) in nestedQuestions"
          :key="index"
          class="question-card text-white text-center py-2 m-1"
        >
          {{ index + 1 }}
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionNavigator",
  props: ["viewedSection"],
  computed: {
    nestedSections() {
      return this.viewedSection.content.filter(context => context.content);
    },
    nestedQuestions() {
      return this.viewedSection.content.filter(
        context => context.weight !== undefined
      );
    }
  }
};
</script>

<style scoped>
.questions-container,
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
.question-card {
  background-color: #4e6b9f;
  cursor: pointer;
}
</style>
