<template>
  <div class="columns-page">
    <section class="section header-section">
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">付费专栏</h1>
          <p class="page-desc">系统学习，深度成长，精选优质内容助你提升</p>
        </div>
      </div>
    </section>

    <section class="section columns-section">
      <div class="container">
        <div class="columns-grid">
          <router-link
            v-for="column in columns"
            :key="column.id"
            :to="`/columns/${column.id}`"
            class="column-card card"
          >
            <div class="column-cover">
              <img :src="column.cover" :alt="column.title" class="cover-img" />
              <div class="cover-badge">
                <span v-if="column.status === 'completed'" class="badge completed">已完结</span>
                <span v-else class="badge updating">更新中</span>
              </div>
              <div class="cover-price">
                <span class="price-current">¥{{ column.price }}</span>
                <span class="price-original">¥{{ column.originalPrice }}</span>
              </div>
            </div>

            <div class="column-info">
              <h3 class="column-title">{{ column.title }}</h3>
              <p class="column-desc">{{ column.description }}</p>

              <div class="column-meta">
                <div class="meta-row">
                  <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{ column.chapters.length }} 章节
                  </span>
                  <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20.005 15.132" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 3.13C16.8604 3.35028 17.623 3.85068 18.1676 4.55232C18.7122 5.25395 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75605 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{ formatNumber(column.students) }} 人学习
                  </span>
                </div>
                <div class="rating-row">
                  <div class="stars">
                    <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :fill="i <= Math.floor(column.rating) ? 'currentColor' : 'none'" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <span class="rating-text">{{ column.rating }}</span>
                </div>
              </div>

              <div class="preview-tags">
                <span class="free-tag">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  支持免费试看
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { columns } from '@/data/mockData'

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
.columns-page {
  min-height: 100vh;
}

.header-section {
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

.page-header {
  text-align: center;
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

.columns-section {
  padding-top: 40px;
}

.columns-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.column-card {
  padding: 0;
  overflow: hidden;
  display: block;
}

.column-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-slow);
}

.column-card:hover .cover-img {
  transform: scale(1.05);
}

.cover-badge {
  position: absolute;
  top: 16px;
  left: 16px;
}

.badge {
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  border-radius: var(--radius-sm);
}

.badge.completed {
  background: rgba(34, 197, 94, 0.9);
  color: var(--bg-primary);
}

.badge.updating {
  background: rgba(249, 115, 22, 0.9);
  color: var(--bg-primary);
}

.cover-price {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-md);
}

.price-current {
  font-size: 18px;
  font-weight: 700;
  color: var(--accent-gold);
}

.price-original {
  font-size: 12px;
  color: var(--text-muted);
  text-decoration: line-through;
}

.column-info {
  padding: 24px;
}

.column-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  transition: var(--transition-fast);
}

.column-card:hover .column-title {
  color: var(--accent-gold);
}

.column-desc {
  font-size: 13px;
  color: var(--text-tertiary);
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.column-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 16px;
}

.meta-row {
  display: flex;
  gap: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-tertiary);
}

.meta-item svg {
  width: 16px;
  height: 16px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  display: flex;
  gap: 2px;
  color: var(--accent-gold);
}

.stars svg {
  width: 14px;
  height: 14px;
}

.rating-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-gold);
}

.preview-tags {
  display: flex;
}

.free-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 12px;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
  border-radius: var(--radius-md);
}

.free-tag svg {
  width: 14px;
  height: 14px;
}

@media (max-width: 1024px) {
  .columns-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 26px;
  }

  .page-desc {
    font-size: 14px;
  }

  .columns-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .column-cover {
    height: 180px;
  }

  .column-info {
    padding: 20px;
  }
}
</style>
