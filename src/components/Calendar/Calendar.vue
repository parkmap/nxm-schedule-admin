<template>
  <div class="calender-wrap">
    {{ count }}
    <h1>{{ calendarYear }}. {{ calendarMonth + 1 }}.</h1>
    <div>
      <button @click="prevMonth">전달</button>
      <button @click="todayMonth">오늘</button>
      <button @click="nextMonth">다음달</button>
    </div>
    <div>
      filter
      <select name="" id="">
        <option value="">전체</option>
        <option value="">이벤트</option>
        <option value="">디렉터</option>
        <option value="">데이문</option>
      </select>
    </div>
    <div class="">
      <div class="week">
        <div v-for="title in dayofweek" :key="title">{{ title }}</div>
      </div>

      <div class="week" v-for="week in dayArray" :key="week">
        <div class="day" v-for="day in week" :key="day">
          <h3 class="day-label">{{ day }}</h3>
          <template
            v-if="
              gridKey[calendarYear] &&
              gridKey[calendarYear][calendarMonth + 1] &&
              gridKey[calendarYear][calendarMonth + 1][day]
            "
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
              v-for="reservation in gridKey[calendarYear][calendarMonth + 1][
                day
              ]"
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
      </div>
    </div>
  </div>
</template>

<script>
// import moment from "moment";
// import { useStore } from "vuex";

// { "id": 3619512, "start_ymd": "20220807", "end_ymd": "20220807", "start_hour": "16", "end_hour": "20", "RSV_STAT_CD": "RSCMP", "PAY_STAT_CD": "PAYCP", "price": 75000, "unread": true, "PRD_TP_CD": "TIME", "space": { "id": 14751, "space_name": "NXM Studio", "product_name": "2.Director's Room", "RSV_TP_CD": "TIME", "SPC_TP_CD": "MEET" }, "user_info": { "id": "1658117232", "name": "조예진 ", "email": "banajini@naver.com", "contact": "01066088304" }

// https://nxmstudio.com/wp-json/calendar/v1/reservations?v=fewfewfew
// id	:	1
// sid	:	14751
// rid	:	3656394
// created	:	0000-00-00 00:00:00
// year	:	2022
// month	:	8
// day	:	26
// value	:	{\"id\":3656394,\"start_ymd\":\"20220826\",\"end_ymd\":\"20220827\",\"start_hour\":\"20\",\"end_hour\":\"9\",\"RSV_STAT_CD\":\"RSCMP\",\"PAY_STAT_CD\":\"PAYCP\",\"price\":140000,\"unread\":true,\"PRD_TP_CD\":\"PKG\",\"space\":{\"id\":14751,\"space_name\":\"NXM Studio\",\"product_name\":\"1.Event Page\",\"RSV_TP_CD\":\"TIME\",\"SPC_TP_CD\":\"MEET\"},\"user_info\":{\"id\":\"1658973331\",\"name\":\"\\uc774\\uc218\\ube48\",\"email\":\"tnqlsdl_ss@naver.com\",\"contact\":\"01033520610\"}}
// uid	:	1658973331
// phone	:	01033520610
const space_name = {
  // id: name
  23091: "",
  24935: "",
  59015: "을지로"
};

export default {
  name: "Calendar",
  props: {},

  data() {
    return {
      reservations: {},
      dayofweek: ["일", "월", "화", "수", "목", "금", "토"],
      dayArray: {},
      startofweekday: "",
      calendarYear: new Date().getFullYear(),
      calendarMonth: new Date().getMonth()
    };
  },
  computed: {
    count() {
      return this.$store.state.calendar.count;
    },
    gridKey() {
      return this.$store.state.reservation.gridKey;
    }
  },
  methods: {
    todayMonth() {
      let date = new Date();
      this.calendarMonth = date.getMonth();
      this.calendarYear = date.getFullYear();
      this.startDate();
      this.getData();
    },
    prevMonth() {
      if (this.calendarMonth === 0) {
        this.calendarMonth = 11;
        this.calendarYear -= 1;
      } else {
        this.calendarMonth -= 1;
      }

      this.startDate();
      this.getData();
    },
    nextMonth() {
      if (this.calendarMonth === 11) {
        this.calendarMonth = 0;
        this.calendarYear += 1;
      } else {
        this.calendarMonth += 1;
      }

      this.startDate();
      this.getData();
    },
    getData() {
      let url_year = this.calendarYear;
      let url_month = this.calendarMonth + 1;
      this.$store.dispatch("reservation/getData", { url_year, url_month });
    },

    startDate() {
      let calendarPos = 0;
      let calendarDay = 0;

      let calendarYear = this.calendarYear;
      let calendarMonth = this.calendarMonth;
      let monthLastDate = new Date(calendarYear, calendarMonth + 1, 0);
      let calendarMonthLastDate = monthLastDate.getDate();
      let monthStartDay = new Date(calendarYear, calendarMonth, 1);

      let calendarMonthStartDay = monthStartDay.getDay();

      let calendarWeekCount = Math.ceil(
        (calendarMonthStartDay + calendarMonthLastDate) / 7
      );

      this.calendarWeekCounts = calendarWeekCount;
      this.calendarMonthStartDays = calendarMonthStartDay;
      this.calendarMonthLastDates = calendarMonthLastDate;

      let arr = [];
      for (var index1 = 0; index1 < calendarWeekCount; index1++) {
        arr.push([]);
        for (var index2 = 0; index2 < 7; index2++) {
          if (
            calendarMonthStartDay <= calendarPos &&
            calendarDay < calendarMonthLastDate
          ) {
            calendarDay++;
            arr[index1].push(calendarDay);
          } else {
            arr[index1].push(0);
          }
          calendarPos++;
        }
      }

      this.dayArray = arr;
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    let date = new Date();
    this.calendarMonth = date.getMonth();
    this.calendarYear = date.getFullYear();
    this.startDate();
  }
};
</script>
<style scoped>
</style>