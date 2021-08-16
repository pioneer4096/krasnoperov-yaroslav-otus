<template>
  <div class="game">
    <div style="text-align: left;">
      <v-btn @click="cancel">Отмена</v-btn>

      <p style="float:right;">4:37</p>
    </div>
    <br><br><br>
    <div class="calc-btn-wrapper">
      <v-row>
        <v-col class="xl3">
          <v-btn
                  fab
                  dark
                  class="mx-2 calc-btn pa-2"
                  color="pink"
          >
            1
          </v-btn>
        </v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn pa-2"
                  fab
                  dark
                  color="primary"
          >
            2
          </v-btn>
        </v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn"
                  fab
                  dark

                  color="primary"
          >
            3
          </v-btn>
        </v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn-last"
                  fab
                  dark

                  color="primary"
          >
            &lt;
          </v-btn>
        </v-col>

      </v-row>

      <v-row>
        <v-col class="xl3">
          <v-btn
                  fab
                  dark
                  class="mx-2 calc-btn pa-2"
                  color="pink"
          >
            4
          </v-btn>
        </v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn pa-2"
                  fab
                  dark
                  color="primary"
          >
            5
          </v-btn>
        </v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn"
                  fab
                  dark

                  color="primary"
          >
            6
          </v-btn>
        </v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn-last"
                  fab
                  dark

                  color="primary"
          >
            &gt;
          </v-btn>
        </v-col>

      </v-row>

      <v-row>
        <v-col class="xl3">
          <v-btn
                  fab
                  dark
                  class="mx-2 calc-btn pa-2"
                  color="pink"
          >
            7
          </v-btn>
        </v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn pa-2"
                  fab
                  dark
                  color="primary"
          >
            8
          </v-btn>
        </v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn"
                  fab
                  dark

                  color="primary"
          >
            9
          </v-btn>
        </v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn-last"
                  fab
                  dark

                  color="primary"
          >
            ?
          </v-btn>
        </v-col>

      </v-row>

      <v-row>
        <v-col class="xl3"></v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn pa-2"
                  fab
                  dark
                  color="primary"
          >
            0
          </v-btn>
        </v-col>
        <v-col class="xl3"></v-col>
        <v-col class="xl3">
          <v-btn
                  class="mx-2 calc-btn-last"
                  fab
                  dark

                  color="primary"
          >
            =
          </v-btn>
        </v-col>

      </v-row>

    </div>
    <br><br>
  </div>
</template>

<script>
  export default {
    name: 'Settings',
    methods: {
      cancel() {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .game {
    width: 600px;
    margin: 0 auto;
    border: 1px solid lightgray;
    padding: 1rem 2rem;
  }

  .calc-btn-wrapper {
    width: 80%;
    margin: 0 auto;
  }

  .calc-btn {
    background: tomato !important;
    margin-right: 1rem;
  }

  .calc-btn-last {
    background: #aaaaaa !important;
  }

  .btn-row {
    margin-bottom: 2rem;
  }
</style>