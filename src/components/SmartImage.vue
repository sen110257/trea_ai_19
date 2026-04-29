<template>
  <div class="smart-image-wrapper" :class="{ 'image-loaded': isLoaded, 'image-error': hasError }">
    <div v-if="!isLoaded && !hasError" class="image-skeleton">
      <div class="skeleton-content"></div>
    </div>
    <img
      v-show="isLoaded && !hasError"
      :src="src"
      :alt="alt"
      :class="imgClass"
      :style="imgStyle"
      @load="handleLoad"
      @error="handleError"
      loading="lazy"
    />
    <div v-if="hasError" class="error-placeholder">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16L14.5 5.5L18.5 9.5L8 20H4V16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.5 5.5L18.5 9.5L21 7L17 3L14.5 5.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18.5 9.5L14.5 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="error-text">图片加载中</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  imgClass: {
    type: String,
    default: ''
  },
  imgStyle: {
    type: Object,
    default: () => ({})
  }
})

const isLoaded = ref(false)
const hasError = ref(false)
const currentSrc = ref(props.src)

watch(() => props.src, (newSrc) => {
  if (newSrc !== currentSrc.value) {
    isLoaded.value = false
    hasError.value = false
    currentSrc.value = newSrc
  }
})

function handleLoad() {
  isLoaded.value = true
  hasError.value = false
}

function handleError() {
  isLoaded.value = false
  hasError.value = true
}
</script>

<style scoped>
.smart-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--bg-tertiary);
}

.image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skeleton-content {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 25%,
    var(--bg-hover) 50%,
    var(--bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.error-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
}

.error-placeholder svg {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.error-text {
  font-size: 12px;
  opacity: 0.7;
}

.image-loaded .image-skeleton,
.image-loaded .error-placeholder {
  display: none;
}

.image-error .image-skeleton {
  display: none;
}
</style>
