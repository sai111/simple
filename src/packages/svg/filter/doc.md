<!-- filter文档 -->

### svg

### 资料整理资源
> 0. [链接] https://huang-qing.github.io/svg/2019/01/29/SVG-Filter/
> 1. [链接] http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/201507062179.html
> 2. [链接] https://www.jianshu.com/u/008ef5131004
> 3. [链接] http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/201507062179.html
> 4. [链接] https://blog.csdn.net/chy555chy/article/details/53364310

# Filter 类型标签
<filter>标签用来定义滤镜，滤镜必须含有id属性来标识滤镜。图形元素通过filter=url(#id)来引用滤镜。

  * feBlend:类似于CSS blend modes，描述了图像通过混合模式进行交互
  * feComponentTransfer: 改变个人对RGBA通道的总称（如feFuncG）
  * feComposite:一个原始的过滤器，定义像素图像交互方式
  * feConvolveMatrix ：这个过滤器规定像素与他近邻将关闭交互（如：模糊、锐化）
  * feDiffuseLighting ：定义了一个光源
  * feDisplacementMap : 使用另一个输入值(in2)取代一个图像的像素值(in)
  * feFlood : 完成过滤器的填充区域指定的颜色和alpha等级
  * feGaussianBlur :输入的模糊值和标准值的偏差
  * feImage ：使用其他的过滤器(像feBlend或feComposite)
  * feMerge ： 允许异步过滤效果应用，而不是分层
  * feMorphology : 削弱或扩张源图像
  * feOffset ：用来创建阴影
  * feSpecularLighting : 通过alpha创建凹凸贴图，又将其称之为”镜面”(Phong Reflection Model)
  * feTile : 指图像如何重复填补空间
  * feTurbulence : 允许创建纹理


#### 1. svg模糊效果
> 1. defs和filter
      ```
        filter               id是滤镜的唯一名称
        feGaussianBlur       创建【模糊效果】
        in="SourceGraphic"   定义了整个图案创建效果  【过滤器的输入源】SourceGraphic 使用RGB颜色的作为输入源/sourceAlpha使用alpha通道作为输入源
      ```

#### 高斯模糊 feGaussianBlur
> svg过滤器的输入通常在svg滤镜中[in] 属性中指定
  ```
    <feGaussianBlur stdDeviation="3" in="SourceGraphic" /> 
  ```
> 如果需要将一个SVG过滤器的输出作为另一个过滤器的输入，需要在输出元素上添加一个result属性
  ```
    <feGaussianBlur stdDeviation="3" in="SourceGraphic" result="blur"/>
  ```
> tip: 在另一个过滤器中，可以通过在in属性中设置值为blur来使用它作为输入源
> tip: stdDeviation属性决定图像的模糊尺寸大小。它的数值越大，图像的模糊尺寸越大


#### 过滤器的尺寸
> 1. 一个SVG过滤器的尺寸由 【x、y、width，height】属性来决定
> 2. x和y属性是【相对于】输入源图形的x和y属性来设定。由于过滤器的输出图形通常会比输入图形大（例如对图形添加模糊效果），因此，我们通常需要将x和y属性设置为负值来剪切掉多出的部分。

> 3. width和height属性指定过滤器的宽度和高度，大多数时候你需要指定宽度和高度大于输出图像的尺寸，以便于在剪切后尺寸和原来的图形基本相等

#### 偏移滤镜 feOffset
 > 偏移滤镜会将输入图形进行移动之后作为结果输出，可以上下左右移动图形。通常偏移滤镜都是用于制作drop阴影效果
 

#### 油漆桶工具 feFlood
> 可以看成是油漆桶工具绘制图形
  ```
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <defs>
        <filter id="floodFilter" filterUnits="userSpaceOnUse">
          <feFlood x="50" y="50" width="100" height="100"
              flood-color="green" flood-opacity="0.5"/>
        </filter>
      </defs>

      <use style="filter: url(#floodFilter);"/>
    </svg>
  ```
#### 多重过滤器 feMerge
> 通过 feMerge 元素同时使用多个 svg过滤器

  ```
    <defs>
        <filter id="blurFilter2" y="-10" height="40" x="-10" width="150">
            <feOffset in="SourceAlpha" dx="3" dy="3" result="offset2" />
            <feGaussianBlur in="offset2" stdDeviation="3"  result="blur2"/>
    
            <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>
    
    <ellipse cx="55" cy="60" rx="25" ry="15"
            style="stroke: none; fill: #0000ff; filter: url(#blurFilter2);" /> 

    这个svg过滤器，使用了两个过滤元素 <feOffset> <feGaussianBlur >
    feoffset 偏移滤镜的输入源是椭圆图形的alpha通道
    feGaussianBlur 高斯模糊滤镜的输入源是偏移滤镜的输出
    【先后顺序】
    <feMerge>元素将原始图像和高斯模糊滤镜的输出相结合。在<feMerge>元素中的结合顺序决定了它们的显示顺序，后输入的元素会显示在先输入元素的上面

  ```
