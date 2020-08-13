<template>
  <h3>PreviousAttempts</h3>
</template>

<script>
import API from "@/api";

export default {
  name: "PreviousAttempts",
  async created() {
    const response = await API("/records", "get");

    console.log(response);
  }
};
</script>
