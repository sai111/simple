<template>
    <div ref="wordCloud" class="wordCloud">
        wordCloud组件
        <div id="chart"></div>
    </div>
</template>
<script>
import { B2wordcloud } from './lib/index.js'
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
            let options = {
                list: words,
                color: '#15a4fa',
                // shape: 'star',
                maskImage: require('./assets/img/logo.png'),
                // imageShape: 'assets/img/logo.png',
                ellipticity: 1,
                gridSize: 2,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowBlur: 2,
                weightFactor: 5,
                fontWeight: 'normal',
                fontFamily: 'Times, serif',
                color: 'random-light',
                backgroundColor: '#fff',
                // rotateRatio: -10, // 设置旋转字体的比例
                // minRotation: -90,
                // maxRotation: 90,
                // drawOutOfBound: false,
                tooltip: {
                    show: true,
                    formatter: function(item) {
                        return item[0] + ': ' + item[1] + '<br>' + '词云图'
                    }
                }
            }
            var canvas = document.getElementById('chart')
            var wordCloud = new B2wordcloud(canvas, options)
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
        // background: url('./assets/img/logo.png') no-repeat;
        // background-size: 100% 100%;
    }
}
</style>
