<template>
  <h6>
    {{ question.title }}
  </h6>
</template>

<script>
export default {
  name: "QuestionView",
  props: ["question"]
};
</script>
