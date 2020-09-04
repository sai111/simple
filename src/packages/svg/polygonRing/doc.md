<!-- polygonRing文档 -->
https://www.jianshu.com/p/cfe9723637ee

### path绘制圆

  ```
  (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+
    1. rx ry 是椭圆的两个半轴的长度。
    2. x-axis-rotation 是椭圆相对于坐标系的旋转角度，角度数而非弧度数。
    3. large-arc-flag 是标记绘制大弧(1)还是小弧(0)部分。
    4. sweep-flag 是标记向顺时针(1)还是逆时针(0)方向绘制。
    5. x y 是圆弧终点的坐标
  ```


  // 弧长公式
  扇形的弧长=2πr×角度/360
  
### SVG过滤器用来给SVG图形添加特效
  链接: https://www.techbrood.com/h5b2a?p=svg-filters_intro
