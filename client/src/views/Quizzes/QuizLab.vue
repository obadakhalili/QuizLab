<script>
import { parse, stringify } from "flatted";
import API from "@/api";
import QuizSection from "@/components/Quiz/QuizSection";
import QuizQestion from "@/components/Quiz/QuizQuestion";

export default {
  name: "QuizLab",
  render(createVNode) {
    function createContentVNode(context, index) {
      if (context.content) {
        const isNotFirstSection = index !== undefined;
        const contentVNode = context.content.map(createContentVNode);
        const section = createVNode(QuizSection, {
          props: {
            section: context,
            isNotFirstSection
          }
        });
        contentVNode.unshift(section);
        return createVNode(
          "div",
          { class: isNotFirstSection ? "ml-4 mt-2" : "" },
          contentVNode
        );
      }
      return createVNode(QuizQestion, {
        props: {
          question: context
        }
      });
    }
    return createVNode("div", { class: "lab mt-5 mx-auto" }, [
      createContentVNode(this.quiz.mainSection),
      createVNode(
        "b-button",
        {
          class: "submit-btn float-right mt-3 mb-5",
          on: { click: this.submitQuiz }
        },
        "Submit Quiz"
      )
    ]);
  },
  created() {
    if (this.$route.path === "/new") {
      this.quiz.options = {
        shuffled: false,
        blocked: false
        // etc ...
      };
      this.quiz.mainSection = {
        title: "Quiz Title",
        content: []
      };
    } else {
      this.getQuiz();
      this.quiz.options = {
        shuffled: false,
        blocked: false
        // etc ...
      };
      this.quiz.mainSection = {
        title: "Quiz Title",
        content: []
      };
    }
  },
  data() {
    return {
      quiz: {}
    };
  },
  methods: {
    submitQuiz() {
      if (this.$route.path === "/new") {
        this.insertNewQuiz();
      } else {
        // update quiz with new content
      }
    },
    async insertNewQuiz() {
      try {
        await API("/quiz", "post", {
          title: this.quiz.mainSection.title,
          quiz: stringify(this.quiz)
        });
        this.$store.dispatch("updateAlerts", {
          message: "Quiz was submitted",
          color: "success"
        });
      } catch (e) {
        this.$store.dispatch("updateAlerts", e.response.data.errors.map(message => {
          return {
            message,
            color: "danger"
          }
        }));
      }
    },
    async getQuiz() {
      const response = await API("/quiz/" + this.$route.params.id, "get");

      this.quiz = parse(response.data[0].quiz);
    }
  },
  components: {
    QuizSection,
    QuizQestion
  }
};
</script>

<style scoped>
.lab {
  max-width: 700px;
}
.submit-btn {
  background-color: #343a40;
}
</style>
