<template>
  <v-card>
    <v-toolbar flat>
      <v-spacer></v-spacer>
      <v-tabs fixed-tabs>
        <v-tab
          href="#mobile-tabs-5-1"
          class="primary--text"
          @click="showing = 1"
        >
          Submission
        </v-tab>

        <v-tab
          active
          href="#mobile-tabs-5-2"
          class="primary--text"
          @click="showing = 2"
        >
          Engatement
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-row>
      <v-col cols="9" class="mt-2">
        <v-tabs>
          <v-tab class="primary--text" @click="calecdarShow = 1"> Daily </v-tab>

          <v-tab class="primary--text" @click="calecdarShow = 2">
            Weekly
          </v-tab>
          <v-tab class="primary--text" @click="calecdarShow = 3">
            Monthy
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="1" class="mt-2">
        <v-icon
          left
          class="mt-3"
          :color="this.chartType == 1 ? 'blue' : ''"
          @click="chartType = 1"
          >mdi-chart-bar</v-icon
        >
      </v-col>
      <v-col cols="1" class="mt-2">
        <v-icon
          left
          class="mt-3"
          :color="this.chartType == 2 ? 'blue' : ''"
          @click="chartType = 2"
          >mdi-view-list</v-icon
        >
      </v-col>
    </v-row>

    <v-card
      class="overflow-y-auto"
      max-height="100%"
      v-show="showing == 2 && calecdarShow == 1"
      elevation="0"
    >
      <v-row class="text-center d-flex flex-column justify-center">
        <v-col cols="12">
          <v-card class="overflow-y-auto mx-1" max-height="100px" flex
            ><v-date-picker no-title :show-week="true"> </v-date-picker>
          </v-card>
        </v-col>
      </v-row>

      <!-- Cards for statistics -->
      <v-row class="mx-4">
        <v-col cols="12">
          <v-row>
            <v-col cols="6"> 18 Dec 2024</v-col>
          </v-row>
        </v-col>

        <v-col cols="6" v-for="item in cardBoards" v-bind:key="item.num">
          <v-card
            outlined
            class="text-center d-flex flex-column justify-center pa-3"
            style="height: 200px"
          >
            <v-card-title class="justify-center">
              <v-icon left>{{ item.icon }}</v-icon>
              {{ item.neme }}
            </v-card-title>
            <v-card-text style="font-size: 40px"> {{ item.num }} </v-card-text>
            <v-card-text> {{ item.nn }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-card
      class="overflow-y-auto"
      max-height="100%"
      v-show="showing == 2 && calecdarShow == 2"
      elevation="0"
    >
      <v-row class="text-center d-flex flex-column justify-center">
        <v-col cols="12">
          <v-card
            class="overflow-y-auto mx-1"
            max-height="100px"
            flex
            elevation="0"
            ><v-date-picker no-title :show-week="true"> </v-date-picker>
          </v-card>
        </v-col>
      </v-row>
      <hr class="mt-3 mb-3" />

      <!-- Cards for statistics -->
      <v-row class="mx-4">
        <v-col cols="12">
          <v-row>
            <v-col cols="6"> 10-16 Dec 2024</v-col>
          </v-row>
        </v-col>
        <v-col
          cols="3"
          v-for="item in cardBoards"
          v-bind:key="item.num"
          class="text-center justify-center d-flex"
        >
          <v-btn
            x-small
            rounded
            :outlined="typeSelect != item.name"
            @click="changeSeriesData(item.name)"
            color="primary"
          >
            <v-icon size="14">{{ item.icon }} </v-icon> &nbsp; {{ item.name }}
          </v-btn>
        </v-col>

        <v-col cols="12" v-show="chartType == 1">
          <apexchart
            type="line"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </v-col>
        <v-col cols="12" v-show="chartType == 2">
          <v-list dense>
            <v-list-item-group
              v-for="(profile, index) in profiles"
              :key="index"
            >
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon size="40">{{
                    `mdi-numeric-${index + 1}-circle`
                  }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-avatar class="mr-5">
                  <v-icon size="50">mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="profile.name"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="profile.title"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon color="blue">{{
                    typeSelect == "Comment"
                      ? "mdi-comment-outline"
                      : "mdi-thumb-up"
                  }}</v-icon>
                  <span v-text="profile.comments"></span>
                </v-list-item-action>
              </v-list-item>
              <hr />
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
    <BottomMenu></BottomMenu>
  </v-card>
</template>

<script>
// import { auth, googleProvider, facebookProvider } from "~/plugins/firebase";

import BottomMenu from "~/components/BottomMenu.vue";
export default {
  components: {
    BottomMenu,
  },
  methods: {
    setAxSe(axmax, se, type) {
      this.series = [
        {
          name: type,
          data: se,
        },
      ];
      this.chartOptions = {
        ...this.chartOptions,
        yaxis: {
          title: {
            text: type,
          },
          min: 0, // Adjust the minimum value if needed
          max: axmax, // Adjust the maximum value if needed
          labels: {
            formatter: (val) => `${val.toFixed(0)} `, // Example of adding a formatter
          },
        },
      };
    },
    changeSeriesData(type) {
      if (type == "Comment") {
        this.typeSelect = type;
        const axmax = 80;
        const se = [35, 45, 40, 50, 80, 35, 65];
        this.setAxSe(axmax, se, type);
      } else if (type == "Point") {
        this.typeSelect = type;
        const axmax = 800;
        const se = [100, 150, 700, 200, 300, 200, 250];
        this.setAxSe(axmax, se, type);
      } else {
        this.typeSelect = type;
        const axmax = 80;
        const se = [41, 40, 50, 60, 50, 55, 54];
        this.setAxSe(axmax, se, type);
      }
    },
  },
  data() {
    return {
      profiles: [
        {
          name: "Amanda Ray",
          title: "HR",
          comments: 40,
        },
        {
          name: "Amanda Ray",
          title: "HR",
          comments: 40,
        },
        {
          name: "Amanda Ray",
          title: "HR",
          comments: 40,
        },
        {
          name: "Amanda Ray",
          title: "HR",
          comments: 40,
        },
        {
          name: "Amanda Ray",
          title: "HR",
          comments: 40,
        },
        {
          name: "Amanda Ray",
          title: "HR",
          comments: 40,
        },
        {
          name: "Amanda Ray",
          title: "HR",
          comments: 40,
        },
        // ... other profiles
      ],
      chartOptions: {
        chart: {
          id: "chartLike",
        },
        xaxis: {
          categories: [10, 11, 12, 13, 14, 15, 16],
        },
        yaxis: {
          min: 0, // Set the minimum value
          max: 80, // Set the maximum value
          labels: {
            formatter: function (val) {
              return val; // Customize label format
            },
          },
        },
      },
      series: [
        {
          name: "Likes",
          data: [41, 40, 50, 60, 50, 55, 54],
        },
      ],
      cardBoards: [
        {
          icon: "mdi-thumb-up",
          name: "Like",
          num: 34,
          nn: "Likes",
        },
        {
          icon: "mdi-comment",
          name: "Comment",
          num: 56,
          nn: "Comments",
        },
        {
          icon: "mdi-gift",
          name: "Point",
          num: 56,
          nn: "Points",
        },

        {
          icon: "mdi-diamond-stone",
          name: "Diamond",
          num: 40,
          nn: "Diamond",
        },
      ],
      tab: null,
      showing: 2,
      carlendarOptions: [
        {
          name: "Daily",
          key: 1,
        },
        {
          name: "Weekly",
          key: 2,
        },
        {
          name: "Monthy",
          key: 3,
        },
      ],
      calecdarShow: 1,
      chartType: 1,
      typeSelect: "Like",
    };
  },
  name: "IndexPage",
  middleware: "auth",
};
</script>
