<script setup lang="ts">
import SnowFall from "@ui/SnowFall.vue";
import OrientationBlock from "@ui/OrientationBlock.vue";
import Loading from "@ui/Loading.vue";
import Timer from "@ui/Timer.vue";
</script>

<template>

  <Suspense timeout="0">
    <template #default>
      <div class="h-full">
        <OrientationBlock/>

        <SnowFall/>

        <Timer/>

        <RouterView/>
      </div>
    </template>

    <template #fallback>
      <Loading class="abs-center"/>
    </template>
  </Suspense>

</template>
