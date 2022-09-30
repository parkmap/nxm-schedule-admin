// store.js

import { createStore, createLogger } from "vuex";
import calendar from "./modules/calendar";
import reservation from "./modules/reservation";

const debug = true;

// Create a new store instance.
const store = createStore({
  modules: {
    calendar,
    reservation
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

export default store;
