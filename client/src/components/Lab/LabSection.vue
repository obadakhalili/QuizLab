<template>
  <div class="section">
    <button
      v-if="isNotFirstSection"
      @click="deleteSection"
      type="button"
      class="close mr-2"
    >
      ×
    </button>
    <b-input
      v-model="section.title"
      :placeholder="isNotFirstSection ? 'Section title' : 'Quiz title'"
      size="sm"
      class="col-10"
    ></b-input>
    <div class="noselect">
      <a @click="addQuestion" class="mr-2">New Question</a>
      <a @click="addSection">New Section</a>
    </div>
  </div>
</template>

<script>
import ObjectId from "bson-objectid";

export default {
  name: "QuizSection",
  props: ["section", "isNotFirstSection"],
  methods: {
    changeSectionTitle({ target }) {
      if (/^.+$/.test(target.innerText)) {
        this.section.title = target.innerText;
      } else {
        target.innerText = "Not a Valid Title";
      }
    },
    deleteSection() {
      const parentSectionContent = this.section.parentSection.content;
      const sectionIndex = parentSectionContent.findIndex(
        context => context === this.section
      );
      parentSectionContent.splice(sectionIndex, 1);
      this.$parent.$forceUpdate();
    },
    addSection() {
      this.section.content.unshift({
        title: "",
        content: [],
        parentSection: this.section,
        id: ObjectId.generate()
      });
      this.$parent.$forceUpdate();
    },
    addQuestion() {
      this.section.content.push({
        title: "",
        weight: "",
        isBonus: false,
        viewed: false,
        choices: [
          {
            title: "",
            correct: false,
            id: ObjectId.generate()
          },
          {
            title: "",
            correct: true,
            id: ObjectId.generate()
          }
        ],
        id: ObjectId.generate(),
        selected: null,
        isMultipleAnswer: false,
        parentSection: this.section
      });
      this.$parent.$forceUpdate();
    }
  }
};
</script>

<style scoped>
.section {
  background-color: #f1f1f1;
  padding: 10px 0 5px 15px;
  min-height: 70px;
}
</style>
