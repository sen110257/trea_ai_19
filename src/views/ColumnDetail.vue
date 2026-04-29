<template>
  <div class="column-detail-page">
    <div class="container">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        返回专栏列表
      </button>

      <div v-if="column" class="detail-content">
        <div class="detail-header card">
          <div class="header-content">
            <div class="title-section">
              <span class="status-badge" :class="column.status">
                {{ column.status === 'completed' ? '已完结' : '更新中' }}
              </span>
              <h1 class="detail-title">{{ column.title }}</h1>
              <p class="detail-desc">{{ column.description }}</p>
            </div>

            <div class="meta-section">
              <div class="author-info">
                <span class="author-label">讲师</span>
                <span class="author-name">{{ column.author }}</span>
              </div>
              <div class="stats-row">
                <div class="stat-item">
                  <span class="stat-value">{{ column.chapters.length }}</span>
                  <span class="stat-label">章节</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ formatNumber(column.students) }}</span>
                  <span class="stat-label">学员</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ column.rating }}</span>
                  <span class="stat-label">评分</span>
                </div>
              </div>
            </div>
          </div>

          <div class="price-section">
            <div class="price-display" v-if="!column.purchased">
              <span class="price-current">¥{{ column.price }}</span>
              <span class="price-original">¥{{ column.originalPrice }}</span>
              <span class="discount-tag">限时 {{ Math.round((1 - column.price / column.originalPrice) * 100) }}% 折扣</span>
            </div>
            <div class="purchased-badge" v-else>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              已购买
            </div>

            <div class="action-buttons">
              <button
                v-if="!column.purchased"
                class="btn btn-primary purchase-btn"
                @click="purchaseColumn"
              >
                立即购买
              </button>
              <button
                v-if="!column.purchased"
                class="btn btn-outline trial-btn"
                @click="startTrial"
              >
                免费试看
              </button>
              <button
                v-else
                class="btn btn-primary continue-btn"
                @click="continueLearning"
              >
                继续学习
              </button>
            </div>
          </div>
        </div>

        <div class="chapters-section card">
          <div class="section-header">
            <h2 class="section-title">章节目录</h2>
            <div class="chapter-stats">
              <span class="free-count">{{ freeChaptersCount }} 节免费试看</span>
              <span class="total-count">共 {{ column.chapters.length }} 节</span>
            </div>
          </div>

          <div class="chapters-list">
            <div
              v-for="(chapter, index) in column.chapters"
              :key="chapter.id"
              class="chapter-item"
              :class="{
                active: selectedChapter?.id === chapter.id,
                locked: !canAccessChapter(chapter)
              }"
              @click="selectChapter(chapter)"
            >
              <div class="chapter-left">
                <div class="chapter-number">
                  <span class="num-text">{{ String(index + 1).padStart(2, '0') }}</span>
                  <div class="lock-icon" v-if="!canAccessChapter(chapter)">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div class="chapter-info">
                  <h3 class="chapter-title">{{ chapter.title }}</h3>
                  <span class="chapter-duration">{{ chapter.duration }}</span>
                </div>
              </div>
              <div class="chapter-right">
                <span v-if="chapter.free" class="free-badge">免费</span>
                <svg v-else-if="!canAccessChapter(chapter)" class="lock-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M17 11H5C4.44772 11 4 11.4477 4 12V18C4 18.5523 4.44772 19 5 19H17C17.5523 19 18 18.5523 18 18V12C18 11.4477 17.5523 11 17 11Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M8 11V8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8V11" stroke="currentColor" stroke-width="2"/>
                </svg>
                <svg v-else class="play-svg" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedChapter" class="content-section card">
          <div class="content-header">
            <h3 class="content-title">{{ selectedChapter.title }}</h3>
            <div class="content-meta">
              <span class="content-duration">{{ selectedChapter.duration }}</span>
              <span v-if="selectedChapter.free" class="content-free">免费章节</span>
              <span v-else-if="column.purchased" class="content-purchased">已解锁</span>
            </div>
          </div>

          <div v-if="canAccessChapter(selectedChapter)" class="content-body">
            <p class="content-text">{{ selectedChapter.content }}</p>

            <div class="content-extra">
              <div class="learning-tip">
                <h4>学习提示</h4>
                <p>建议在学习过程中做好笔记，遇到问题可以在留言区提问。</p>
              </div>
            </div>
          </div>

          <div v-else class="content-locked">
            <div class="locked-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M17 11H5C4.44772 11 4 11.4477 4 12V18C4 18.5523 4.44772 19 5 19H17C17.5523 19 18 18.5523 18 18V12C18 11.4477 17.5523 11 17 11Z" stroke="currentColor" stroke-width="2"/>
                <path d="M8 11V8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8V11" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h4 class="locked-title">章节未解锁</h4>
            <p class="locked-desc">该章节需要购买专栏后才能查看完整内容</p>
            <button class="btn btn-primary" @click="purchaseColumn">
              立即购买解锁
            </button>
          </div>
        </div>
      </div>

      <div v-else class="not-found">
        <p>专栏不存在或已被下架</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { columns } from '@/data/mockData'
import { useToastStore } from '@/stores/toast'

const route = useRoute()
const router = useRouter()
const toastStore = useToastStore()

const column = ref(null)
const selectedChapter = ref(null)

const freeChaptersCount = computed(() => {
  return column.value?.chapters.filter(c => c.free).length || 0
})

function goBack() {
  router.back()
}

function canAccessChapter(chapter) {
  if (!column.value) return false
  return chapter.free || column.value.purchased
}

function selectChapter(chapter) {
  selectedChapter.value = chapter
  if (!canAccessChapter(chapter)) {
    toastStore.showToast('该章节需要购买后才能查看', 'info')
  }
}

function purchaseColumn() {
  if (!column.value) return
  column.value.purchased = true
  toastStore.showToast('购买成功！已解锁全部章节', 'success')
}

function startTrial() {
  if (!column.value) return
  const freeChapter = column.value.chapters.find(c => c.free)
  if (freeChapter) {
    selectedChapter.value = freeChapter
    toastStore.showToast('开始免费试看', 'success')
  }
}

function continueLearning() {
  if (!column.value) return
  const firstChapter = column.value.chapters[0]
  if (firstChapter) {
    selectedChapter.value = firstChapter
    toastStore.showToast('继续学习中...', 'info')
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

onMounted(() => {
  const columnId = parseInt(route.params.id)
  column.value = columns.find(c => c.id === columnId) || null
  if (column.value) {
    selectedChapter.value = column.value.chapters[0]
  }
})
</script>

<style scoped>
.column-detail-page {
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
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
}

.header-content {
  flex: 1;
}

.title-section {
  margin-bottom: 24px;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: var(--radius-sm);
  margin-bottom: 16px;
}

.status-badge.completed {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.status-badge.updating {
  background: rgba(249, 115, 22, 0.15);
  color: #f97316;
}

.detail-title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.detail-desc {
  font-size: 14px;
  color: var(--text-tertiary);
  line-height: 1.8;
}

.meta-section {
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.author-label {
  font-size: 13px;
  color: var(--text-tertiary);
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-gold);
}

.stats-row {
  display: flex;
  gap: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.price-section {
  width: 240px;
  padding: 24px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}

.price-display {
  text-align: center;
  margin-bottom: 24px;
}

.price-current {
  font-size: 36px;
  font-weight: 700;
  color: var(--accent-gold);
}

.price-original {
  font-size: 14px;
  color: var(--text-muted);
  text-decoration: line-through;
  margin-left: 8px;
}

.discount-tag {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 8px;
}

.purchased-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: rgba(34, 197, 94, 0.1);
  border-radius: var(--radius-md);
  color: #22c55e;
  font-weight: 600;
  margin-bottom: 24px;
}

.purchased-badge svg {
  width: 20px;
  height: 20px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-buttons .btn {
  width: 100%;
}

.chapters-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
}

.chapter-stats {
  display: flex;
  gap: 16px;
  font-size: 13px;
}

.free-count {
  color: #22c55e;
}

.total-count {
  color: var(--text-tertiary);
}

.chapters-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chapter-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-fast);
  border: 1px solid transparent;
}

.chapter-item:hover {
  background: var(--bg-hover);
}

.chapter-item.active {
  background: rgba(212, 175, 55, 0.1);
  border-color: rgba(212, 175, 55, 0.3);
}

.chapter-item.locked .chapter-title {
  color: var(--text-muted);
}

.chapter-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.chapter-number {
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.num-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.chapter-item.active .num-text {
  color: var(--accent-gold);
}

.lock-icon {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  border-radius: 50%;
  color: var(--text-muted);
}

.lock-icon svg {
  width: 12px;
  height: 12px;
}

.chapter-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chapter-title {
  font-size: 14px;
  font-weight: 500;
}

.chapter-duration {
  font-size: 12px;
  color: var(--text-tertiary);
}

.chapter-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.free-badge {
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border-radius: var(--radius-sm);
}

.play-svg {
  width: 20px;
  height: 20px;
  color: var(--accent-gold);
  opacity: 0;
  transition: var(--transition-fast);
}

.chapter-item:hover .play-svg,
.chapter-item.active .play-svg {
  opacity: 1;
}

.lock-svg {
  width: 20px;
  height: 20px;
  color: var(--text-muted);
}

.content-section {
  padding: 24px;
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.content-title {
  font-size: 16px;
  font-weight: 600;
}

.content-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.content-duration {
  font-size: 13px;
  color: var(--text-tertiary);
}

.content-free {
  padding: 4px 10px;
  font-size: 12px;
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border-radius: var(--radius-sm);
}

.content-purchased {
  padding: 4px 10px;
  font-size: 12px;
  background: rgba(212, 175, 55, 0.15);
  color: var(--accent-gold);
  border-radius: var(--radius-sm);
}

.content-text {
  font-size: 15px;
  line-height: 2;
  color: var(--text-secondary);
}

.content-extra {
  margin-top: 32px;
}

.learning-tip {
  padding: 20px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
}

.learning-tip h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--accent-gold);
}

.learning-tip p {
  font-size: 13px;
  color: var(--text-tertiary);
}

.content-locked {
  text-align: center;
  padding: 40px 20px;
}

.locked-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border-radius: 50%;
  color: var(--text-muted);
}

.locked-icon svg {
  width: 32px;
  height: 32px;
}

.locked-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.locked-desc {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: 24px;
}

.not-found {
  text-align: center;
  padding: 80px 0;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .column-detail-page {
    padding: 24px 0;
  }

  .detail-header {
    flex-direction: column;
    gap: 24px;
  }

  .detail-title {
    font-size: 22px;
  }

  .stats-row {
    gap: 20px;
  }

  .price-section {
    width: 100%;
  }

  .chapter-item {
    padding: 14px 16px;
  }

  .chapter-left {
    gap: 12px;
  }
}
</style>
