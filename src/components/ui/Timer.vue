<script setup lang="ts">
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const now = dayjs()
const target = dayjs(`${now.year()}-12-31T23:59:59`)

const diff = dayjs.duration(target.diff(now))

const months = diff.months()
const days = diff.days()
const hours = diff.hours()
</script>

<template>

  <div class="abs-x text-center top-5 text-lg font-semibold whitespace-nowrap">
    <p>До НГ осталось:</p>
    <p>
      <span v-if="months ">{{months}}мес · </span>
      <span v-if="days">{{days}}дн · </span>
      <span v-if="hours">{{hours}}ч · </span>
      <span>{{diff.minutes()}}мин</span>
    </p>
  </div>

</template>