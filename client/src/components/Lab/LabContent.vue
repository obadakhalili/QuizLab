<script>
import LabSection from "./LabSection";
import LabQuestion from "./LabQuestion";

export default {
  name: "QuizContent",
  render(createVNode) {
    function createContentVNode(context, _) {
      if (context.content) {
        const isNotFirstSection = _ !== undefined;
        const contentVNode = context.content.map(createContentVNode);
        const section = createVNode(LabSection, {
          props: {
            section: context,
            isNotFirstSection
          }
        });
        contentVNode.unshift(section);
        return createVNode(
          "div",
          { class: isNotFirstSection ? "section-container" : "" },
          contentVNode
        );
      }
      return createVNode(LabQuestion, {
        props: {
          question: context
        }
      });
    }
    return createContentVNode(this.labContent.mainSection);
  },
  props: ["labContent"],
  components: {
    LabSection,
    LabQuestion
  }
};
</script>

<style scoped>
.section-container {
  margin: .5rem 0 0 2.25rem;
}
</style>
