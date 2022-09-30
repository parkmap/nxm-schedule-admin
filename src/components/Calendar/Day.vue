<template>
  <div>{{ year }}.{{ month }}.{{ day }}</div>
  <div>
    <button>전날</button>
    <button @click="setToday()">오늘</button>
    <button>다음날</button>
  </div>

  <div>
    <template
      v-if="gridKey[year] && gridKey[year][month] && gridKey[year][month][day]"
    >
      <router-link
        :to="{
          name: reservation.external ? 'ExternalDetail' : 'Detail',
          params: {
            id: reservation.xid,
            data: reservation
          }
        }"
        class="event event-start event-end"
        :data-span="reservation.end_ymd - reservation.start_ymd + 1"
        v-for="reservation in gridKey[year][month][day]"
        :key="reservation.id"
      >
        <!-- TODO: 오늘인 경우 처리 -->
        <!-- TODO: 일요일인지 확인... -->
        <!-- 일요일인 경우 -->
        <!-- reservation source 예약받은 곳.. -->
        {{ reservation.start_hour }} ~
        {{ parseInt(reservation.end_hour) + 1 }}
        {{ reservation.user_info.name }}
        <!-- {{ reservation.user_info.name }} -->
      </router-link>
      <!-- <span> <i class="schedule-state add"></i> 0 - 12, 이름*</span> -->
    </template>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      year: 2022,
      month: 9,
      day: 8
    };
  },
  methods: {
    setToday() {
      let date = moment();
      this.year = date.format("YYYY");
      this.month = date.format("M") + 1;
      this.day = date.format("D");
    }
  },
  created() {
    // set today.
    this.setToday();
  }
};
</script>

<style>
</style>