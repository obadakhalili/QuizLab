<template>
  <b-alert class="my-3" :variant="alert.color" show>
    <button @click="deleteAlert(index)" type="button" class="close">
      ×
    </button>
    {{ alert.message }}
  </b-alert>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AlertBox",
  methods: mapActions(["deleteAlert"]),
  props: ["alert", "index"]
};
</script>
