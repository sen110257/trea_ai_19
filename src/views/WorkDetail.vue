<template>
  <div class="work-detail-page">
    <div class="container">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        返回作品列表
      </button>

      <div v-if="work" class="detail-content">
        <div class="detail-header">
          <h1 class="detail-title">{{ work.title }}</h1>
          <div class="detail-meta-top">
            <div class="meta-tags">
              <span class="type-badge" :class="work.type">
                {{ work.type === 'video' ? '视频作品' : '图文作品' }}
              </span>
              <span
                v-for="tag in work.tags"
                :key="tag"
                class="meta-tag"
              >
                {{ tag }}
              </span>
            </div>
            <div class="meta-stats">
              <span class="stat">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ formatNumber(work.views) }} 浏览
              </span>
              <span class="stat">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39463C21.7564 5.72716 21.351 5.12075 20.84 4.61Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ formatNumber(work.likes) }} 点赞
              </span>
              <span class="stat">{{ work.createdAt }}</span>
            </div>
          </div>
        </div>

        <div v-if="work.type === 'video'" class="video-player">
          <div v-if="work.videoUrl" class="video-wrapper">
            <video
              ref="videoRef"
              :src="work.videoUrl"
              :poster="work.cover"
              controls
              class="video-element"
            ></video>
          </div>
          <div v-else class="video-placeholder">
            <img :src="work.cover" :alt="work.title" class="placeholder-image" />
            <div class="placeholder-overlay">
              <div class="play-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z"/>
                </svg>
              </div>
              <span class="placeholder-text">视频预览</span>
            </div>
          </div>
          <div class="video-info">
            <span class="video-duration">时长: {{ work.duration }}</span>
          </div>
        </div>

        <div v-else class="gallery-section">
          <div class="gallery-main">
            <img
              :src="currentImage"
              :alt="work.title"
              class="main-image"
            />
            <div class="image-counter">
              {{ currentIndex + 1 }} / {{ allImages.length }}
            </div>
            <button
              v-if="currentIndex > 0"
              class="gallery-nav prev"
              @click="currentIndex--"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              v-if="currentIndex < allImages.length - 1"
              class="gallery-nav next"
              @click="currentIndex++"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="gallery-thumbs">
            <button
              v-for="(img, index) in allImages"
              :key="index"
              class="thumb-btn"
              :class="{ active: currentIndex === index }"
              @click="currentIndex = index"
            >
              <img :src="img" :alt="`图片 ${index + 1}`" class="thumb-img" />
            </button>
          </div>
        </div>

        <div class="detail-description card">
          <h2 class="section-subtitle">作品简介</h2>
          <p class="description-text">{{ work.description }}</p>
        </div>

        <div class="action-bar">
          <button class="action-btn like" :class="{ liked: isLiked }" @click="toggleLike">
            <svg v-if="!isLiked" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39463C21.7564 5.72716 21.351 5.12075 20.84 4.61Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39463C21.7564 5.72716 21.351 5.12075 20.84 4.61Z"/>
            </svg>
            {{ isLiked ? '已点赞' : '点赞' }}
          </button>
          <button class="action-btn share">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 6L12 2L8 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 2V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            分享
          </button>
        </div>
      </div>

      <div v-else class="not-found">
        <p>作品不存在或已被删除</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'
import { useToastStore } from '@/stores/toast'
import SmartImage from '@/components/SmartImage.vue'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()
const toastStore = useToastStore()

const videoRef = ref(null)
const work = ref(null)
const currentIndex = ref(0)
const isLiked = ref(false)

const allImages = computed(() => {
  if (work.value && work.value.type === 'image') {
    return [work.value.cover, ...(work.value.images || [])]
  }
  return work.value?.images || []
})

const currentImage = computed(() => allImages.value[currentIndex.value] || '')

function loadWorkData() {
  const workId = route.params.id
  const foundWork = dataStore.findWorkById(workId)
  if (foundWork) {
    work.value = { ...foundWork }
    isLiked.value = foundWork.userLiked || false
    currentIndex.value = 0
  } else {
    work.value = null
  }
}

function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

function goBack() {
  router.back()
}

function toggleLike() {
  if (!work.value) return
  const liked = dataStore.toggleWorkLike(work.value.id)
  isLiked.value = liked
  work.value.likes += liked ? 1 : -1
  toastStore.showToast(liked ? '点赞成功' : '已取消点赞', 'success')
}

watch(() => route.params.id, () => {
  loadWorkData()
}, { immediate: true })

onMounted(() => {
  loadWorkData()
})
</script>

<style scoped>
.work-detail-page {
  min-height: 100vh;
  padding: 40px 0;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: 32px;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.back-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.back-btn svg {
  width: 16px;
  height: 16px;
}

.detail-content {
  max-width: 900px;
  margin: 0 auto;
}

.detail-header {
  margin-bottom: 32px;
}

.detail-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.detail-meta-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.meta-tags {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.type-badge {
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  border-radius: var(--radius-md);
}

.type-badge.video {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.type-badge.image {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.meta-tag {
  padding: 4px 12px;
  font-size: 12px;
  color: var(--text-tertiary);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
}

.meta-stats {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-tertiary);
}

.stat svg {
  width: 16px;
  height: 16px;
}

.video-player {
  margin-bottom: 32px;
}

.video-wrapper {
  width: 100%;
}

.video-element {
  width: 100%;
  border-radius: var(--radius-lg);
  background: #000;
}

.video-placeholder {
  position: relative;
  width: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-secondary);
}

.placeholder-image {
  width: 100%;
  display: block;
  object-fit: cover;
}

.placeholder-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}

.play-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 175, 55, 0.9);
  border-radius: 50%;
  color: #fff;
  margin-bottom: 12px;
}

.play-icon svg {
  width: 32px;
  height: 32px;
  margin-left: 4px;
}

.placeholder-text {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
}

.video-info {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.video-duration {
  font-size: 13px;
  color: var(--text-tertiary);
}

.gallery-section {
  margin-bottom: 32px;
}

.gallery-main {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-secondary);
}

.main-image {
  width: 100%;
  display: block;
  object-fit: cover;
}

.image-counter {
  position: absolute;
  bottom: 16px;
  right: 16px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--text-primary);
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  color: var(--text-primary);
  transition: var(--transition-fast);
}

.gallery-nav:hover {
  background: rgba(212, 175, 55, 0.8);
}

.gallery-nav.prev {
  left: 16px;
}

.gallery-nav.next {
  right: 16px;
}

.gallery-nav svg {
  width: 24px;
  height: 24px;
}

.gallery-thumbs {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.thumb-btn {
  flex-shrink: 0;
  width: 100px;
  height: 70px;
  border-radius: var(--radius-md);
  overflow: hidden;
  opacity: 0.5;
  transition: var(--transition-fast);
}

.thumb-btn:hover {
  opacity: 0.8;
}

.thumb-btn.active {
  opacity: 1;
  border: 2px solid var(--accent-gold);
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-description {
  margin-bottom: 32px;
}

.section-subtitle {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.description-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.action-bar {
  display: flex;
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

.action-btn.like {
  color: var(--text-secondary);
}

.action-btn.like:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.action-btn.like.liked {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.action-btn.share {
  color: var(--text-secondary);
}

.action-btn.share:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
  background: rgba(212, 175, 55, 0.05);
}

.not-found {
  text-align: center;
  padding: 80px 0;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .work-detail-page {
    padding: 24px 0;
  }

  .detail-title {
    font-size: 24px;
  }

  .detail-meta-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .meta-stats {
    gap: 12px;
    flex-wrap: wrap;
  }

  .gallery-nav {
    width: 40px;
    height: 40px;
  }

  .gallery-nav svg {
    width: 20px;
    height: 20px;
  }

  .thumb-btn {
    width: 80px;
    height: 56px;
  }

  .action-bar {
    flex-direction: column;
  }

  .action-btn {
    justify-content: center;
  }
}
</style>
