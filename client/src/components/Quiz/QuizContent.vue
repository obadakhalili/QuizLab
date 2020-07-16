<script>
import QuizSection from "@/components/Quiz/ContentSection";
import QuizQestion from "@/components/Quiz/ContentQuestion";

export default {
  name: "QuizContent",
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
    return createContentVNode(this.quiz.mainSection);
  },
  props: ["quiz"],
  components: {
    QuizSection,
    QuizQestion
  }
};
</script>
