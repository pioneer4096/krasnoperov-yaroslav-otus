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

        <div class="game-field-wrapper">
            <div v-if="areValidGameOptions" class="correct-game-options">
                <div v-if="!gameOver" class="game-active">
                    <br><br><br>
                    <div v-if="example" style="text-align: center;" class="example">
                        <span v-for="(operand, index) in example.operands"
                            :key="`op_${index}`">{{operand}}  {{example.operation | operationSignFilter}}
                        </span>
                        <v-text-field class="x-field" v-model="x"></v-text-field>
                        = {{result}}
                        <span v-if="answerStatus !== null" class="answer-status ml-3">
                            <span v-if="answerStatus === true" class="correct-answer">верно</span>
                            <span v-else class="incorrect-answer">неправильно</span>
                        </span>
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
                                        @click="pressBtn('<')"
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
                                        @click="pressBtn('>')"
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
                                        @click="pressBtn('?')"
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
                                        @click="pressBtn('=')"
                                >
                                    =
                                </v-btn>
                            </v-col>

                        </v-row>

                    </div>
                    <br><br>
                </div>
                <div v-else class="game-over">
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
            <div v-else class="incorrect-game-options">
                <v-alert class="mt-10 game-over-alert"
                         outlined
                         type="error"
                >
                    ОШИБКА: некорректные настройки игры, попробуйте вернуться на страницу настроек, проверить их
                    корректность и перезапустить игру
                </v-alert>
            </div>
        </div>

        <v-dialog
                v-model="showHelpDialog"
                max-width="700"
                class="help-dialog"
        >
            <v-card>
                <v-card-title class="text-h5">
                    Справочная информация об игре "вычисли значение"
                </v-card-title>

                <v-card-text>
                    <p class="text-left">
                        Игра состоит в том, чтобы решать примеры на время.
                    </p>
                    <p class="text-left">
                        Игра идет пока таймер обратного отсчета не равен нулю или пользователь не нажал кнопку "Отмена".
                    </p>
                    <p class="text-left">
                        Введите число, нажмите знак '=', после чего будет указано, верный ответ или нет.
                    </p>
                    <p class="text-left">
                        Кнопка '&lt;' декрементирует введенное число.
                    </p>
                    <p class="text-left">
                        Кнопка '&gt;' инкрементирует введенное число.
                    </p>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="showHelpDialog = false"
                    >
                        OK
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import {generate, checkExample} from '../utils/generate.example'
    import {operationSign} from '../reference/operations'

    export default {
        name: 'Settings',
        mounted() {
            this.init()
        },
        data() {
            return {
                gameOptions: null,
                areValidGameOptions: false,
                timer: {
                    start: false,
                    startTime: null,
                    endTime: null
                },
                showHelpDialog: false,
                answerStatus: '',
                gameOver: false,
                x: '',
                result: 0,
                example: null
            }
        },
        methods: {
            init() {
                const gameOptions = this.$store.getters.getGameOptions
                const isValid = this.validateOptions(gameOptions)
                if (isValid) {
                    this.areValidGameOptions = true
                    this.gameOptions = gameOptions
                    this.startPlay(gameOptions)
                } else {
                    this.areValidGameOptions = false
                }
            },
            startPlay(gameOptions) {
                this.$store.commit('newGameStarted')
                this.generateExample(gameOptions)
                this.startTimer(gameOptions.duration)
            },
            validateOptions(gameOptions) {
                if (gameOptions) {
                    const validDuration = gameOptions.duration && (typeof gameOptions.duration === 'number')
                    const validComplexity = gameOptions.complexity && (typeof gameOptions.duration === 'number')
                    const validOptions = Array.isArray(gameOptions.options) && gameOptions.options.length

                    return validDuration && validComplexity && validOptions
                }
                return false
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
            generateExample(options) {  // создать пример
                this.answerStatus = null
                this.example = generate(options)
                this.x = ''
                this.result = this.example.result
            },
            checkExample() {
                if (this.x) {
                    const isCorrect = checkExample(this.example, +this.x)
                    this.highlightResult(isCorrect)
                    this.$store.commit('updateStat', isCorrect)

                    setTimeout(() => {
                        this.generateExample(this.gameOptions)
                    }, 1000)
                }
            },
            highlightResult(isCorrect) {
                this.answerStatus =  Boolean(isCorrect)
            },
            pressBtn(val) {
                if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(val)) {
                    this.x += val
                }
                else if(val === '<') {
                    const x = +this.x
                    if(!isNaN(x) && (x > 0)) {
                        this.x = x - 1
                    }
                }
                else if(val === '>') {
                    const x = +this.x
                    if(!isNaN(x)) {
                        this.x = x + 1
                    }
                }
                else if(val === '?') {
                    this.showHelpDialog = true
                }
                else if(val === '=') {
                    this.checkExample()
                }
            },
            timerStopped() {
                this.gameOver = true
                this.timer.start = false
            },
            restart() {
                this.gameOver = false
                this.startPlay(this.gameOptions)
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

    .answer-status {
        font-weight: bold;
        transition: 1s all ease;
        position: absolute;
        margin-top: 20px;
    }

    .correct-answer {
       color: green;
    }

    .incorrect-answer {
        color: red;
    }

    .help-dialog p{
        text-align: left;
    }
</style>
