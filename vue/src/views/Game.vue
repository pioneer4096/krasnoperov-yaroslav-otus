<template>
    <div class="game">
        <div style="text-align: left;">
            <v-btn @click="cancel">Отмена</v-btn>

            <div v-if="timer.start" style="float:right; height: 36px;">
                <vue-countdown-timer
                        @end_callback="timerStopped()"
                        style="line-height: 36px;"
                        :start-time="timer.startTime"
                        :end-time="timer.endTime"
                        :interval="1000"
                        end-text="00:00"
                        label-position="begin"
                >
                    <template slot="countdown" slot-scope="scope">
                        <span>{{scope.props.minutes}}</span>:<span>{{scope.props.seconds}}</span>
                    </template>
                </vue-countdown-timer>
            </div>
        </div>
        <div v-if="!gameOver">
            <br><br><br>
            <div v-if="example" style="text-align: center;" class="example">
            <span v-for="(operand, index) in example.operands"
                  :key="`op_${index}`">{{operand}}  {{example.operation | operationSignFilter}}</span>
                <v-text-field class="x-field" v-model="x"></v-text-field> = {{result}}
            </div>
            <br><br><br>
            <div class="calc-btn-wrapper">
                <v-row>
                    <v-col class="xl3">
                        <v-btn
                                @click="pressBtn('1')"
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
                                @click="pressBtn('2')"
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
                                @click="pressBtn('3')"
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
                                @click="backspace"
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
                                @click="pressBtn('4')"
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
                                @click="pressBtn('5')"
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
                                @click="pressBtn('6')"
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
                                @click="pressBtn('7')"
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
                                @click="pressBtn('8')"
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
                                @click="pressBtn('9')"
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
                                @click="pressBtn('0')"
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
                                @click="check()"
                        >
                            =
                        </v-btn>
                    </v-col>

                </v-row>

            </div>
            <br><br>
        </div>
        <div v-else>
            <v-alert class="mt-10 game-over-alert"
                    outlined
                    type="error"
            >
                Игра окончена
            </v-alert>

            <br>
            <v-btn @click="restart" color="primary">
                Перезапустить
                <v-icon
                        right
                        dark
                >
                    mdi-restart
                </v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import {generate} from '../utils/generate.example'
    import {operationSign} from '../reference/operations'

    export default {
        name: 'Settings',
        mounted() {
            const gameOptions = this.$store.getters.getGameOptions
            const isValid = this.validateOptions(gameOptions)
            if(isValid) {
                this.gameOptions = gameOptions
                this.generate(gameOptions)
            }
        },
        data() {
            return {
                gameOptions: null,
                timer: {
                    start: false,
                    startTime: null,
                    endTime: null
                },
                gameOver: false,
                x: '',
                result: 0,
                example: null
            }
        },
        methods: {
            validateOptions() {
                return true
            },
            cancel() {
                this.$router.push('/')
            },
            startTimer(duration = 0) {
                const now = Date.now()
                this.timer.startTime = now
                this.timer.endTime = now + duration * 60 * 1000
                this.timer.start = true
            },
            generate(options) {  // создать пример
                this.example = generate(options)
                this.x = ''
                this.result = this.example.result
                this.startTimer(options.duration)
            },
            check() {
                if(this.x) {
                    const isCorrect = (+this.x === this.example.x)
                    const msg = isCorrect ? 'Верно' : 'Ошибка'
                    alert(msg)
                    this.$store.commit('updateStat', isCorrect)
                    this.generate()
                }
            },
            pressBtn(val) {
                if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ].includes(val)) {
                    this.x += val
                }
            },
            backspace() {
                if(this.x.length) {
                    this.x = this.x.slice(0, -1)
                }
            },
            timerStopped() {
                this.gameOver = true
                this.timer.start = false
            },
            restart() {
                this.gameOver = false
                this.generate(this.gameOptions)
            }
        },
        filters: {
            operationSignFilter(operation) {
                return operationSign[operation] || `--${operation}--`
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

    .x-field {
        width: 50px;
        display: inline-block;
    }

    .game-over-alert {
        font-weight: bold;
        font-size: 1.2rem;
    }
</style>
