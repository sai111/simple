<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="300" >
	<filter id="SourceGraphic">
		<feGaussianBlur in="SourceGraphic" stdDeviation="10" />
	</filter>
	<filter id="SourceAlpha">
		<feGaussianBlur in="SourceAlpha" stdDeviation="10" />
	</filter>
	<filter id="BackgroundImage">
		<feGaussianBlur in="BackgroundImage" stdDeviation="10" />
	</filter>
	<filter id="BackgroundAlpha">
		<feGaussianBlur in="BackgroundAlpha" stdDeviation="10" />
	</filter>
	<filter id="FillPaint">
		<feGaussianBlur in="FillPaint" stdDeviation="10" />
	</filter>
	<filter id="StrokePaint">
		<feGaussianBlur in="StrokePaint" stdDeviation="10" />
	</filter>

	<circle cx="60"  cy="60" r="40" fill="green" />
	<circle cx="160" cy="60" r="40" fill="green" filter="url(#SourceGraphic)" />
	<circle cx="260" cy="60" r="40" fill="green" filter="url(#SourceAlpha)" />
	<circle cx="360" cy="60" r="40" fill="green" filter="url(#BackgroundImage)" />
	<circle cx="460" cy="60" r="40" fill="green" filter="url(#BackgroundAlpha)" />
	<circle cx="560" cy="60" r="40" fill="green" filter="url(#FillPaint)" />
	<circle cx="660" cy="60" r="40" fill="green" filter="url(#StrokePaint)" />
	
	<filter id="SourceGraphic2">
		<feGaussianBlur in="SourceGraphic" stdDeviation="2" />
	</filter>
	<filter id="SourceGraphic5">
		<feGaussianBlur in="SourceGraphic" stdDeviation="5" />
	</filter>
	<filter id="SourceGraphic10">
		<feGaussianBlur in="SourceGraphic" stdDeviation="10" />
	</filter>	
	<filter id="SourceGraphic20">
		<feGaussianBlur in="SourceGraphic" stdDeviation="20" />
	</filter>
	<filter id="SourceGraphic50">
		<feGaussianBlur in="SourceGraphic" stdDeviation="50" />
	</filter>
	<filter id="SourceGraphic100">
		<feGaussianBlur in="SourceGraphic" stdDeviation="100" />
	</filter>
	<circle cx="60"  cy="160" r="40" fill="blue" />
	<circle cx="160" cy="160" r="40" fill="blue" filter="url(#SourceGraphic2)" />
	<circle cx="260" cy="160" r="40" fill="blue" filter="url(#SourceGraphic5)" />
	<circle cx="360" cy="160" r="40" fill="blue" filter="url(#SourceGraphic10)" />
	<circle cx="460" cy="160" r="40" fill="blue" filter="url(#SourceGraphic20)" />
	<circle cx="560" cy="160" r="40" fill="blue" filter="url(#SourceGraphic50)" />
	<circle cx="660" cy="160" r="40" fill="blue" filter="url(#SourceGraphic100)" />
</svg>
  </div>
</template>
<script>
export default {
  name: 'filterFeGaussianBlur'
}
</script>
