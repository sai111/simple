<template>
    <div ref="wordCloud" class="wordCloud">
        wordCloud组件
        <div id="chart"></div>
    </div>
</template>
<script>
import * as wordCloud from './lib/wordcloud2.min.js'
export default {
    name: 'wordCloud',
    props: {},
    data() {
        return {
            chart: null,
            keywords: {
                test: 122,
                你好: 20,
                中国: 100
            }
        }
    },
    computed: {},
    watch: {},
    mounted() {
        // this.drawChart()
    },
    methods: {
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
    #main {
        width: 100%;
        height: 100%;
        border: 1px solid red;
    }
}
</style>
