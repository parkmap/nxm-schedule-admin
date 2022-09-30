<template>
  <div class="info-wrap">
    <div class="list-conts">
      <div class="list-wrap">
        <div class="list-header">
          <strong>test 예약 내용</strong>
          <span>
            예약번호:
            <span class="color-purple">{{ reservation.rid }}</span>
          </span>
        </div>
        <ul>
          <li>
            <dt>공간명</dt>
            <dd>{{ reservation.value.space.product_name }}</dd>
          </li>
          <li>
            <dt>예약내용</dt>
            <dd>
              <!-- {{
                `${reservation.year}.${reservation.month}.${reservation.day} ${reservation.value.start_hour}시 ~ ${reservation.value.end_hour}시`
              }} -->
              {{ reservation.value.start_ymd }}
            </dd>
          </li>
          <li>
            <dt>인원수</dt>
            <dd>5명</dd>
          </li>
          <li>
            <dt>요청사항</dt>
            <dd>-</dd>
          </li>
          <li>
            <dt>사용목적</dt>
            <dd>모임 및 빔으로영상보기</dd>
          </li>
        </ul>
      </div>
      <div class="list-wrap">
        <div class="list-header">
          <strong>예약자 정보</strong>
        </div>
        <ul>
          <li>
            <dt>예약자명</dt>
            <dd>{{ reservation.value.user_info.name }}</dd>
          </li>
          <li>
            <dt>연락처</dt>
            <dd>
              <a :href="`tel:${reservation.value.user_info.contact}`">{{
                reservation.value.user_info.contact
              }}</a>
            </dd>
          </li>
          <li>
            <dt>이메일</dt>
            <dd>{{ reservation.value.user_info.email }}</dd>
          </li>
        </ul>
      </div>
    </div>
    <div class="pay-info">
      <ul>
        <li>
          <strong>결제정보</strong>
        </li>
        <li>
          <span>결제금액</span>
          <span class="color-purple">{{ reservation.value.price }}원</span>
        </li>
        <li>
          <span>결제수단</span>
          <span class="color-purple">신용카드</span>
        </li>
      </ul>
      <button class="cancel-btn">예약취소</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reservation: {
        value: {
          space: {},
          user_info: {}
        }
      }
    };
  },
  props: {
    id: {
      type: String
    }
    // reservation: {
    //   type: Object
    // }
  },
  methods: {},
  beforeCreate() {
    // https://v3-docs.vuejs-korea.org/
    // https://v3-docs.vuejs-korea.org/guide/essentials/lifecycle.html#lifecycle-diagram
    // https://vuejs.org/guide/essentials/lifecycle.html#registering-lifecycle-hooks
    // fetch data
    // fetch("https://nxmstudio.com/wp-json/calendar/v1/reservation/" + this.id)
    //   .then((resopnse) => {
    //     return resopnse.json();
    //   })
    //   .then((json) => {
    //     this.reservation = json;
    //     var a = () => {
    //       if (
    //         this.reservation.value.start_ymd == this.reservation.value.end_ymd
    //       ) {
    //         this.reservation.value.start_ymd =
    //           this.reservation.value.start_ymd.substr(0, 4) +
    //           "." +
    //           this.reservation.value.start_ymd.substr(4, 2) +
    //           "." +
    //           this.reservation.value.start_ymd.substr(6, 2) +
    //           " " +
    //           this.reservation.value.start_hour +
    //           "시 ~ " +
    //           this.reservation.value.end_hour +
    //           "시";
    //       } else {
    //         this.reservation.value.start_ymd =
    //           this.reservation.value.start_ymd.substr(0, 4) +
    //           "." +
    //           this.reservation.value.start_ymd.substr(4, 2) +
    //           "." +
    //           this.reservation.value.start_ymd.substr(6, 2) +
    //           " " +
    //           this.reservation.value.start_hour +
    //           "시 ~ " +
    //           this.reservation.value.end_ymd.substr(0, 4) +
    //           "." +
    //           this.reservation.value.end_ymd.substr(4, 2) +
    //           "." +
    //           this.reservation.value.end_ymd.substr(6, 2) +
    //           " " +
    //           this.reservation.value.end_hour +
    //           "시";
    //       }
    //     };
    //     a();
    //   });
  }
};
</script>

<style>
</style>