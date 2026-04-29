<template>
  <div class="works-page">
    <section class="section header-section">
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">作品合集</h1>
          <p class="page-desc">探索图文与视频作品，感受创意与艺术的碰撞</p>
        </div>

        <div class="filter-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="tab-btn"
            :class="{ active: activeTab === tab.value }"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="sort-filter">
          <div class="sort-options">
            <button
              v-for="sort in sorts"
              :key="sort.value"
              class="sort-btn"
              :class="{ active: activeSort === sort.value }"
              @click="activeSort = sort.value"
            >
              {{ sort.label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="section works-section">
      <div class="container">
        <div v-if="filteredWorks.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 19V5C23 4.46957 22.7893 3.96086 22.4142 3.58579C22.0391 3.21071 21.5304 3 21 3H8C7.73478 3 7.48043 3.10536 7.29289 3.29289L2.29289 8.29289C2.10536 8.48043 2 8.73478 2 9V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H21C21.5304 21 22.0391 20.7893 22.4142 20.4142C22.7893 20.0391 23 19.5304 23 19ZM8 4.5V9H3.5L8 4.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="empty-text">暂无相关作品</p>
        </div>

        <div v-else class="works-masonry">
          <div
            v-for="work in filteredWorks"
            :key="work.id"
            class="work-item"
            :class="{ 'two-col': work.hot }"
          >
            <router-link
              :to="`/works/${work.id}`"
              class="work-card card"
            >
              <div class="work-cover">
                <img :src="work.cover" :alt="work.title" class="cover-img" />
                <div class="cover-overlay">
                  <div class="cover-type" v-if="work.type === 'video'">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                    </svg>
                    <span>{{ work.duration }}</span>
                  </div>
                  <div class="cover-hot" v-if="work.hot">热门</div>
                </div>
              </div>
              <div class="work-info">
                <h3 class="work-title">{{ work.title }}</h3>
                <p class="work-desc">{{ work.description }}</p>
                <div class="work-tags">
                  <span
                    v-for="tag in work.tags.slice(0, 3)"
                    :key="tag"
                    class="work-tag"
                  >
                    {{ tag }}
                  </span>
                </div>
                <div class="work-meta">
                  <div class="meta-stats">
                    <span class="meta-item">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      {{ formatNumber(work.views) }}
                    </span>
                    <span class="meta-item">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39463C21.7564 5.72716 21.351 5.12075 20.84 4.61Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      {{ formatNumber(work.likes) }}
                    </span>
                  </div>
                  <span class="meta-date">{{ work.createdAt }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { imageWorks, videoWorks } from '@/data/mockData'

const tabs = [
  { value: 'all', label: '全部作品' },
  { value: 'image', label: '图文作品' },
  { value: 'video', label: '视频作品' }
]

const sorts = [
  { value: 'latest', label: '最新发布' },
  { value: 'hot', label: '热门推荐' }
]

const activeTab = ref('all')
const activeSort = ref('latest')

const allWorks = [...imageWorks, ...videoWorks]

const filteredWorks = computed(() => {
  let works = [...allWorks]

  if (activeTab.value === 'image') {
    works = works.filter(w => w.type === 'image')
  } else if (activeTab.value === 'video') {
    works = works.filter(w => w.type === 'video')
  }

  if (activeSort.value === 'hot') {
    works.sort((a, b) => {
      if (a.hot && !b.hot) return -1
      if (!a.hot && b.hot) return 1
      return (b.views + b.likes) - (a.views + a.likes)
    })
  } else {
    works.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return works
})

function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}
</script>

<style scoped>
.works-page {
  min-height: 100vh;
}

.header-section {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.page-desc {
  font-size: 15px;
  color: var(--text-tertiary);
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}

.tab-btn {
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  transition: var(--transition-fast);
}

.tab-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
  border-color: var(--border-hover);
}

.tab-btn.active {
  color: var(--bg-primary);
  background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-light) 100%);
  border-color: transparent;
}

.sort-filter {
  display: flex;
  justify-content: center;
}

.sort-options {
  display: flex;
  gap: 16px;
  padding: 8px 16px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
}

.sort-btn {
  padding: 8px 16px;
  font-size: 13px;
  color: var(--text-tertiary);
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.sort-btn:hover {
  color: var(--text-secondary);
}

.sort-btn.active {
  color: var(--accent-gold);
  background: rgba(212, 175, 55, 0.1);
}

.works-section {
  padding-top: 40px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  color: var(--text-tertiary);
}

.empty-text {
  font-size: 14px;
  color: var(--text-tertiary);
}

.works-masonry {
  column-count: 3;
  column-gap: 24px;
}

.work-item {
  break-inside: avoid;
  margin-bottom: 24px;
}

.work-card {
  padding: 0;
  overflow: hidden;
  display: block;
}

.work-cover {
  position: relative;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  display: block;
  transition: var(--transition-slow);
}

.work-card:hover .cover-img {
  transform: scale(1.05);
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 40%
  );
  opacity: 0;
  transition: var(--transition-normal);
}

.work-card:hover .cover-overlay {
  opacity: 1;
}

.cover-type {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-md);
  font-size: 12px;
  color: var(--text-primary);
}

.cover-type svg {
  width: 14px;
  height: 14px;
}

.cover-hot {
  padding: 6px 12px;
  background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%);
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 500;
  color: var(--bg-primary);
}

.work-info {
  padding: 20px;
}

.work-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
  transition: var(--transition-fast);
}

.work-card:hover .work-title {
  color: var(--accent-gold);
}

.work-desc {
  font-size: 13px;
  color: var(--text-tertiary);
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.work-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.work-tag {
  padding: 4px 10px;
  font-size: 11px;
  color: var(--text-tertiary);
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
}

.work-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.meta-stats {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-tertiary);
}

.meta-item svg {
  width: 14px;
  height: 14px;
}

.meta-date {
  font-size: 12px;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .works-masonry {
    column-count: 2;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 26px;
  }

  .page-desc {
    font-size: 14px;
  }

  .filter-tabs {
    gap: 6px;
    flex-wrap: wrap;
  }

  .tab-btn {
    padding: 10px 20px;
    font-size: 13px;
  }

  .sort-options {
    gap: 8px;
  }

  .works-masonry {
    column-count: 1;
    column-gap: 16px;
  }

  .work-item {
    margin-bottom: 16px;
  }

  .work-info {
    padding: 16px;
  }
}
</style>
