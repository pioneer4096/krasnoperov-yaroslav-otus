<template>
    <div class="settings">
        <h1 style="text-align: left">Привет!</h1>
        <br><br>

        <div style="text-align: left;">
            <p>Добро пожаловать на {{playDay}} тренировочный день, </p>
            <p>Ваш последний результат - решено {{correctSolved}} из {{all}}.</p>
            <p>Общая точность {{accuracy}}%.</p>
        </div>
        <br><br><br>

        <form onsubmit.prevent="" style="text-align: left;">
            <h2>Настройки</h2>
            <div class="slider-container">
                <v-slider
                        v-model="duration.value"
                        :max="duration.max"
                        :min="duration.min"
                        hide-details
                        class="align-center"
                >
                    <template v-slot:prepend>
                        <span>{{duration.min}}</span>
                    </template>
                    <template v-slot:append>
                        <span>{{duration.max}}</span>
                    </template>
                </v-slider>
                Длительность {{duration.value}} минут.
            </div>

            <div class="slider-container">
                <v-slider
                        v-model="complexity.value"
                        :max="complexity.max"
                        :min="complexity.min"
                        hide-details
                        class="align-center"
                >
                    <template v-slot:prepend>
                        <span>{{complexity.min}}</span>
                    </template>
                    <template v-slot:append>
                        <span>{{complexity.max}}</span>
                    </template>
                </v-slider>

                Сложность {{complexity.value}}.
            </div>

            <div>
                <v-checkbox
                        v-model="options.sum"
                        label="Суммирование"
                ></v-checkbox>

                <v-checkbox
                        v-model="options.sub"
                        label="Разность"
                ></v-checkbox>

                <v-checkbox
                        v-model="options.mul"
                        label="Умножение"
                ></v-checkbox>

                <v-checkbox
                        v-model="options.div"
                        label="Деление"
                ></v-checkbox>

                <v-checkbox
                        v-model="options.degree"
                        label="Возведение в степень"
                ></v-checkbox>
            </div>
            <br><br>
            <p style="text-align: right">
                <v-btn @click="play">Играть!</v-btn>
            </p>
        </form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Settings',
        data() {
            return {
                duration: {
                    value: 1,
                    min: 1,
                    max: 15
                },
                complexity: {
                    value: 1,
                    min: 1,
                    max: 10
                },
                options: {
                    sum: true,
                    sub: false,
                    mul: false,
                    div: false,
                    degree: false
                }
            }
        },
        components: {},
        methods: {
            play() {
                if(this.validate()) {
                    this.$store.commit('startGame', {
                        duration: this.duration.value,
                        complexity: this.complexity.value,
                        options: Object.keys(this.options).map(key => this.options[key] ? key : null).filter(k => k)
                    })
                    this.$router.push('game')
                }
            },
            validate() {
                const options = Object.values(this.options).filter(o => o)
                const valid = Boolean(options.length)
                if(!valid) {
                    alert('Укажите хотя бы одну опцию')
                }

                return valid
            }
        },
        computed: {
            ...mapGetters(['playDay', 'accuracy', 'correctSolved', 'all'])
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

    .slider-container {
        width: 300px;
    }
</style>
