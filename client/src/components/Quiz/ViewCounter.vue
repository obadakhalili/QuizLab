<template>
  <strong>
    <template>{{ hoursLeft }}</template
    >:<template>{{ minutesLeft }}</template
    >:<template>{{ secondsLeft }}</template>
  </strong>
</template>

<script>
export default {
  name: "ViewCounter",
  created() {
    this.timer = setInterval(() => (this.timeLimitLeft -= 1000), 1000);
  },
  props: ["timeLimit"],
  data() {
    return {
      timeLimitLeft: this.timeLimit,
      hoursLeft: "",
      minutesLeft: "",
      secondsLeft: "",
      timer: null
    };
  },
  watch: {
    timeLimitLeft: {
      immediate: true,
      handler: function(timeLeft) {
        this.hoursLeft = this.countHoursLeft(timeLeft);
        this.minutesLeft = this.countMinutesLeft(timeLeft % 3600000);
        this.secondsLeft = this.countSecondsLeft(timeLeft % 60000);
        if (timeLeft <= 0) {
          this.$emit("timeUp");
          return clearInterval(this.timer);
        }
      }
    }
  },
  methods: {
    countHoursLeft(timeLeft) {
      const hours = Math.trunc(timeLeft / 3600000);
      return hours > 9 ? hours : "0" + hours;
    },
    countMinutesLeft(timeLeft) {
      const minutes = Math.trunc(timeLeft / 60000);
      return minutes > 9 ? minutes : "0" + minutes;
    },
    countSecondsLeft(timeLeft) {
      const seconds = Math.trunc(timeLeft / 1000);
      return seconds > 9 ? seconds : "0" + seconds;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
