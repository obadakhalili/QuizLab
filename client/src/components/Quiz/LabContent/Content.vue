<script>
import QuizSection from "./LabSection";
import QuizQestion from "./LabQuestion";

export default {
  name: "QuizContent",
  render(createVNode) {
    function createContentVNode(context, _) {
      if (context.content) {
        const isNotFirstSection = _ !== undefined;
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
          { class: isNotFirstSection ? "ml-5 mt-2" : "" },
          contentVNode
        );
      }
      return createVNode(QuizQestion, {
        props: {
          question: context
        }
      });
    }
    return createContentVNode(this.labContent.mainSection);
  },
  props: ["labContent"],
  components: {
    QuizSection,
    QuizQestion
  }
};
</script>
