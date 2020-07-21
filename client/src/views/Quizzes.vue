<template>
  <div>
    <Controllers />
    <MyQuizzes class="mt-5" />
  </div>
</template>

<script>
import Controllers from "@/components/Quizzes/Controllers";
import MyQuizzes from "@/components/Quizzes/MyQuizzes";

export default {
  name: "Quizzes",
  components: {
    MyQuizzes,
    Controllers
  }
};
</script>
