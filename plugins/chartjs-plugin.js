// plugins/chartjs-plugin.js
import Vue from "vue";
import Chart from "chart.js";
import VueChartJs from "vue-chartjs";

Vue.use(VueChartJs);
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;
