<template>
  <iframe id="youtube-player" width=100% height=100% src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1" title="YouTube video player" frameborder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
</template>

<style>
#youtube-player {
  height: 100%;
  width: 100%;
  position: absolute;
}

body {
  height: 100%;
}
</style>

<script>
export default {
  name: 'Home'
}
</script>
