<template>
  <button class="CoolSwitch" type="button" role="switch">
    <span class="check">
      <span class="icon" v-if="$slots.default">
        <slot />
      </span>
    </span>
  </button>
</template>

<style scoped>
.CoolSwitch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  background-color: rgb(var(--theme-surface));
  transition: border-color 0.25s !important;
}

.CoolSwitch:hover {
  border-color: rgb(var(--v-theme-primary));
}

.check {
  position: absolute;
  top: 1px;
  /*rtl:ignore*/
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-surface));
  /* box-shadow: rgb(var(--vp-shadow-1); */
  transition: transform 0.25s !important;
}

.icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.icon :deep([class^='vpi-']) {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  color: rgb(var(--v-theme-on-surface));
}

.dark .icon :deep([class^='vpi-']) {
  color: rgb(var(--v-theme-on-surface));
  transition: opacity 0.25s !important;
}
</style>
