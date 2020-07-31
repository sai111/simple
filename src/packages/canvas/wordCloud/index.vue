<template>
    <div ref="wordCloud" class="wordCloud">
        wordCloud组件
        <div id="chart"></div>
        <!-- <canvas id="canvas" width="400px" height="400px"></canvas> -->
    </div>
</template>
<script>
import './lib/js2wordcloud.min.js'
export default {
    name: 'wordCloud',
    props: {},
    data() {
        return {
            chart: null,
            keywords: {
                test: 122,
                你好: 20,
                中国: 100,
                测试: 10,
                周五: 90,
                周四: 40,
                周三: 35,
                周二: 30,
                周一: 55,
                周末: 90,
                蘑菇: 80,
                penggu: 200,
                sai: 34,
                shikong: 24,
                tokui: 62,
                sokui: 25,
                loukst: 35,
                tukio: 66
            }
        }
    },
    computed: {},
    watch: {},
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            let words = []
            for (let i in this.keywords) {
                words.push([i, Math.sqrt(this.keywords[i])])
            }
            let options = eval({
                list: words,
                color: '#15a4fa',
                imageShape: require('./assets/img/logo.png'),
                ellipticity: 1,
                shape: 'circle',
                gridSize: 2,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowBlur: 2,
                weightFactor: 5,
                fontWeight: 'normal',
                fontFamily: 'Times, serif',
                color: 'random-light',
                // backgroundColor: '#333',
                rotateRatio: -10,
                minRotation: -90,
                maxRotation: 90,
                drawOutOfBound: false,
                tooltip: {
                    show: true,
                    formatter: function(item) {
                        return item[0] + ': ' + item[1] + '<br>' + '词云图'
                    }
                }
            })
            var canvas = document.getElementById('chart')
            WordCloud(canvas, options)
        },
        drawChart() {
            let words = []
            for (let i in this.keywords) {
                words.push({
                    name: i,
                    value: this.keywords[i]
                })
            }
            var wordCloud = new wordCloud(document.getElementById("chart"), {
            list: words,
            tooltip: {
                formatter: function(item) {
                    return '<div>' + item[0] + '</div>' + '<div>' + item[1] + '</div>'
                }
            },
            color: [
                ['#39fdff', '#009aff'],
                ['#c584ff', '#9842ff'],
                ['#ffe674', '#ffa200'],
                ['#1bd967', '#0d7b21'],
                ['#7dc1ff', '#366af4'],
            ],
            drawOutOfBound: false,
            minRotation: -90,
            maxRotation: 90,
            rotationSteps: 45,
            gridSize: 2,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowBlur: 2,
            shadowColor: 'rgba(0,0,0,0.8)',
            maskImage: './src/logo.png',
            backgroundColor: '#fff'
        })
        window.addEventListener('resize', function() {
            wordCloud.resize()
        })
       }
    }
}
</script>
<style lang="scss" scoped>
.wordCloud {
    width: 100%;
    height: 100%;
    #chart {
        width: 400px;
        height: 400px;
        background: url('./assets/img/logo.png') no-repeat;
        background-size: 100% 100%;
    }
}
</style>
