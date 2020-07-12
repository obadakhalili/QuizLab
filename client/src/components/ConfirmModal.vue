<template>
  <b-modal @ok="modalProcedure" size="sm" hide-header id="emphasization-modal">
    <h5>{{ modalMessage }}?</h5>
    <template v-slot:modal-footer="{ ok, hide }">
      <b-button size="sm" variant="success" @click="ok">
        OK
      </b-button>
      <b-button size="sm" variant="secondary" @click="hide">
        cancel
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "Modal",
  computed: {
    modalMessage() {
      return this.$store.getters.modalInfo("message");
    },
    modalProcedure() {
      return this.$store.getters.modalInfo("procedure");
    }
  }
};
</script>
