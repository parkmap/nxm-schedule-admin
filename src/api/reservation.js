import moment from "moment";

export default {
  async getData(url_year, url_month) {
    let buckets = {};
    let url = `https://nxmstudio.com/wp-json/calendar/v1/reservations/month?year=${url_year}&month=${url_month}`;
    let data = await fetch(url).then((response) => response.json());
    // .then((data) => {
    await data.map((i) => {
      let year = i["year"];
      let month = i["month"];
      let day = i["day"];

      if (!buckets[year]) {
        buckets[year] = {};
      }
      if (!buckets[year][month]) {
        buckets[year][month] = {};
      }
      if (!buckets[year][month][day]) {
        buckets[year][month][day] = {};
      }
      let value = i["value"];
      value.xid = i["id"];

      let date = moment(
        `${value.start_ymd} ${value.start_hour}`,
        "YYYYMMDD HH"
      );
      value.dayofweek = date.day();
      // buckets[year][month][day].push(value);
      buckets[year][month][day][value.id] = value;
    });
    return buckets;
  },

  async getExtenralData(url_year, url_month, product_id) {
    let external_url = `https://nxmstudio.com/wp-json/calendar/v1/external_schedules?year=${url_year}&month=${url_month}&product_id=${product_id}`;
    let data = await fetch(external_url).then((response) => response.json());

    let buckets = {};
    await data.map((i) => {
      let value = i;
      value.xid = i["id"];
      value.user_info = {};
      value.user_info.name = i["name"];
      value.external = true;

      let date = moment(
        `${value.start_ymd} ${value.start_hour}`,
        "YYYYMMDD HH"
      );
      let year = date.format("YYYY");
      let month = date.format("M");
      let day = date.format("D");

      if (!buckets[year]) {
        buckets[year] = {};
      }
      if (!buckets[year][month]) {
        buckets[year][month] = {};
      }
      if (!buckets[year][month][day]) {
        buckets[year][month][day] = {};
      }

      value.dayofweek = date.day();
      // buckets[year][month][day].push(value);
      buckets[year][month][day][value.id] = value;
    });

    return buckets;
  }
};
