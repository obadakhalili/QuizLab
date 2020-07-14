<script>
import { parse, stringify } from "flatted";
import API from "@/api";
import QuizSection from "@/components/Quiz/QuizLab/QuizSection";
import QuizQestion from "@/components/Quiz/QuizLab/QuizQuestion";

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
      createVNode("div", { class: "mb-2" }, [
        createVNode("BIconInfoCircle"),
        createVNode(
          "small",
          " Do not leave any title empty. Sections titles and choices titles can't have new lines."
        )
      ]),
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
      // request quiz with the same id in params
    }
  },
  data() {
    return {
      quiz: {}
    };
  },
  methods: {
    async submitQuiz() {
      if (this.$route.path === "/new") {
        const response = await API("/quiz", "post", {
          title: this.quiz.mainSection.title,
          quiz: stringify(this.quiz)
        });
        console.log(response);
      } else {
        // update quiz with new content
      }
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
