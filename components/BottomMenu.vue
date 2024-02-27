<template>
  <!-- Bottom Navigation -->
  <v-footer fixed padless class="white">
    <v-bottom-navigation
      :absolute="false"
      :value="true"
      background-color="white"
      class="mb-1"
    >
      <v-btn>
        <span>Approval</span>
        <v-icon>mdi-check-circle</v-icon>
      </v-btn>
      <v-btn>
        <span>Reports</span>
        <v-icon>mdi-file-document</v-icon>
      </v-btn>
      <v-btn>
        <span actions>Statistic</span>
        <v-icon color="blue">mdi-chart-box</v-icon>
      </v-btn>
      <v-btn>
        <span>Settings</span>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-footer>
</template>

<script>
export default {
  name: "BottomMenu",
};
</script>
