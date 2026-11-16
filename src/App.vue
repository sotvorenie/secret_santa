<script setup lang="ts">
import SnowFall from "@ui/SnowFall.vue";
import OrientationBlock from "@ui/OrientationBlock.vue";
import Loading from "@ui/Loading.vue";
import Timer from "@ui/Timer.vue";
</script>

<template>

  <OrientationBlock/>

  <SnowFall/>

  <Timer/>

  <Suspense>
    <template #default>
      <RouterView/>
    </template>

    <template #fallback>
      <Loading/>
    </template>
  </Suspense>

</template>
