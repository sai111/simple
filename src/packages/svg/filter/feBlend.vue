<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <filter id="feBlend1">
        <feFlood result="floodFill" x="0" y="0" width="100%" height="100%" flood-color="green" flood-opacity="0.9"/>
        <feBlend in="SourceGraphic" in2="floodFill" mode="normal"/>
      </filter>
      <filter id="feBlend2">
        <feFlood result="floodFill" x="0" y="0" width="100%" height="100%" flood-color="green" flood-opacity="0.9"/>
        <feBlend in="floodFill" in2="SourceGraphic" mode="normal"/>
      </filter>
      <circle cx="50" cy="50" r="40" fill="red" filter="url(#feBlend1)" />
      <circle cx="150" cy="50" r="40" fill="red" filter="url(#feBlend2)"/>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'filterFeBlend'
}
</script>
