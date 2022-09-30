<template>
  <div>
    <div>
      <button @click="mode = 'month'">월별보기</button>
      <button @click="mode = 'day'">일별보기</button>
    </div>
    <Calendar v-if="mode == 'month'" />
    <Day v-if="mode == 'day'" />
  </div>
</template>

<script>
import Calendar from "@/components/Calendar/Calendar.vue";
import Day from "@/components/Calendar/Day.vue";
export default {
  components: {
    Calendar,
    Day
  },
  data() {
    return {
      mode: "month"
    };
  }
};
</script>

<style>
</style>