<template>
  <div class="settings">
    <h1 style="text-align: left">Привет!</h1>
    <br><br>

    <div style="text-align: left;">
      <p>Добро пожаловать на 24 тренировочный день, </p>
      <p>Ваш последний результат - решено 10 из 25.</p>
      <p>Общая точность 80%.</p>
    </div>
    <br><br><br>

    <form onsubmit.prevent="" style="text-align: left;">
      <h2>Настройки</h2>
      <div>
        Длительность 7 минут.
      </div>

      <div>
        Сложность 5.
      </div>

      <ul>
        <li>Суммирование</li>
        <li>Разность</li>
        <li>Умножение</li>
        <li>Деление</li>
        <li>Возведение в степень</li>
      </ul>
      <br><br>
      <p style="text-align: right">
        <v-btn @click="play">Играть!</v-btn>
      </p>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Settings',
  components: {},
  methods: {
    play() {
      if(this.validate())
      this.$router.push('game')
    },
    validate() {
      return true
    }
  }
}
</script>

<style scoped>
  .settings {
    width: 600px;
    margin: 0 auto;
    border: 1px solid lightgray;
    padding: 1rem 2rem;
  }
</style>