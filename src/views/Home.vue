<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-avatar">
            <img :src="blogger.avatar" :alt="blogger.name" class="avatar-img" />
            <div class="avatar-glow"></div>
          </div>
          <div class="hero-info">
            <h1 class="hero-name">{{ blogger.name }}</h1>
            <p class="hero-signature">"{{ blogger.signature }}"</p>
            <div class="hero-tags">
              <span
                v-for="tag in blogger.tags"
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
            <p class="hero-bio">{{ blogger.bio }}</p>
          </div>
        </div>

        <div class="stats-row">
          <div class="stat-item">
            <div class="stat-value">{{ formatNumber(blogger.followers) }}</div>
            <div class="stat-label">粉丝总量</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">{{ formatNumber(blogger.worksCount) }}</div>
            <div class="stat-label">作品总数</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">4.9</div>
            <div class="stat-label">专栏评分</div>
          </div>
        </div>

        <div class="social-links">
          <a
            v-for="link in blogger.socialLinks"
            :key="link.name"
            :href="link.url"
            class="social-link"
            target="_blank"
          >
            <span class="social-icon">{{ getSocialIcon(link.icon) }}</span>
            <span class="social-name">{{ link.name }}</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section featured-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">精选作品</h2>
          <router-link to="/works" class="section-more">
            查看全部
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>

        <div class="featured-works">
          <router-link
            v-for="work in featuredWorks"
            :key="work.id"
            :to="`/works/${work.id}`"
            class="featured-card card"
          >
            <div class="card-cover">
              <img :src="work.cover" :alt="work.title" class="cover-img" />
              <div class="cover-overlay">
                <div class="cover-type" v-if="work.type === 'video'">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                  <span>{{ work.duration }}</span>
                </div>
                <div class="cover-hot" v-if="work.hot">
                  热门
                </div>
              </div>
            </div>
            <div class="card-info">
              <h3 class="card-title">{{ work.title }}</h3>
              <p class="card-desc">{{ work.description }}</p>
              <div class="card-meta">
                <div class="meta-stats">
                  <span class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
    </section>

    <section class="section columns-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">人气专栏</h2>
          <router-link to="/columns" class="section-more">
            查看全部
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>

        <div class="columns-grid">
          <router-link
            v-for="column in columns.slice(0, 3)"
            :key="column.id"
            :to="`/columns/${column.id}`"
            class="column-card card"
          >
            <div class="column-cover">
              <img :src="column.cover" :alt="column.title" class="cover-img" />
              <div class="cover-status">
                <span v-if="column.status === 'completed'" class="status completed">已完结</span>
                <span v-else class="status updating">更新中</span>
              </div>
            </div>
            <div class="column-info">
              <h3 class="column-title">{{ column.title }}</h3>
              <p class="column-desc">{{ column.description }}</p>
              <div class="column-meta">
                <div class="meta-stats">
                  <span class="meta-item">{{ column.chapters.length }} 章节</span>
                  <span class="meta-item">{{ formatNumber(column.students) }} 人学习</span>
                </div>
                <div class="column-price">
                  <span class="price-current">¥{{ column.price }}</span>
                  <span class="price-original">¥{{ column.originalPrice }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">开启合作之旅</h2>
          <p class="cta-desc">品牌合作、内容定制、活动邀约，期待与您共创价值</p>
          <router-link to="/cooperation" class="btn btn-primary">
            预约合作
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { blogger, imageWorks, videoWorks, columns } from '@/data/mockData'

const featuredWorks = [...imageWorks, ...videoWorks]
  .sort((a, b) => {
    if (a.hot && !b.hot) return -1
    if (!a.hot && b.hot) return 1
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
  .slice(0, 6)

function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

function getSocialIcon(icon) {
  const icons = {
    weibo: '微',
    wechat: '信',
    xiaohongshu: '红',
    bilibili: 'B'
  }
  return icons[icon] || '链'
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero-section {
  position: relative;
  padding: 60px 0 80px;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 32px;
}

.hero-avatar {
  position: relative;
}

.avatar-img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-gold);
  box-shadow: var(--shadow-glow);
  position: relative;
  z-index: 1;
}

.avatar-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.3) 0%,
    transparent 70%
  );
  animation: pulse-glow 3s infinite;
}

.hero-name {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 2px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-gold-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-signature {
  font-size: 18px;
  color: var(--text-tertiary);
  font-style: italic;
  letter-spacing: 1px;
}

.hero-tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.tag {
  padding: 6px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--text-secondary);
  transition: var(--transition-fast);
}

.tag:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
  background: rgba(212, 175, 55, 0.05);
}

.hero-bio {
  max-width: 600px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  margin-top: 48px;
  padding: 32px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--accent-gold);
  letter-spacing: 1px;
}

.stat-label {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-top: 4px;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-color);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-radius: var(--radius-lg);
  transition: var(--transition-fast);
}

.social-link:hover {
  background: var(--bg-hover);
}

.social-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-gold);
  transition: var(--transition-fast);
}

.social-link:hover .social-icon {
  background: var(--accent-gold);
  color: var(--bg-primary);
}

.social-name {
  font-size: 12px;
  color: var(--text-tertiary);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 1px;
}

.section-more {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-tertiary);
  transition: var(--transition-fast);
}

.section-more:hover {
  color: var(--accent-gold);
}

.section-more svg {
  width: 16px;
  height: 16px;
}

.featured-works {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.featured-card {
  position: relative;
  display: block;
  padding: 0;
  overflow: hidden;
}

.card-cover {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-slow);
}

.featured-card:hover .cover-img {
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

.card-info {
  padding: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  transition: var(--transition-fast);
}

.featured-card:hover .card-title {
  color: var(--accent-gold);
}

.card-desc {
  font-size: 13px;
  color: var(--text-tertiary);
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.columns-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.column-card {
  padding: 0;
  overflow: hidden;
}

.column-cover {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.cover-status {
  position: absolute;
  top: 16px;
  right: 16px;
}

.status {
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  border-radius: var(--radius-sm);
}

.status.completed {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.status.updating {
  background: rgba(249, 115, 22, 0.15);
  color: #f97316;
}

.column-info {
  padding: 20px;
}

.column-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
  transition: var(--transition-fast);
}

.column-card:hover .column-title {
  color: var(--accent-gold);
}

.column-desc {
  font-size: 13px;
  color: var(--text-tertiary);
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.column-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.column-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price-current {
  font-size: 16px;
  font-weight: 600;
  color: var(--accent-gold);
}

.price-original {
  font-size: 12px;
  color: var(--text-muted);
  text-decoration: line-through;
}

.cta-section {
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.05) 0%,
    rgba(20, 20, 20, 1) 50%,
    rgba(212, 175, 55, 0.03) 100%
  );
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.cta-content {
  text-align: center;
  padding: 40px 0;
}

.cta-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 12px;
}

.cta-desc {
  font-size: 15px;
  color: var(--text-tertiary);
  margin-bottom: 32px;
}

.cta-content .btn {
  gap: 8px;
}

.cta-content svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 1024px) {
  .featured-works,
  .columns-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0 60px;
  }

  .avatar-img {
    width: 120px;
    height: 120px;
  }

  .avatar-glow {
    width: 160px;
    height: 160px;
  }

  .hero-name {
    font-size: 28px;
  }

  .hero-signature {
    font-size: 15px;
  }

  .hero-bio {
    font-size: 14px;
  }

  .stats-row {
    gap: 32px;
    padding: 24px 0;
  }

  .stat-value {
    font-size: 28px;
  }

  .social-links {
    gap: 16px;
    margin-top: 32px;
  }

  .social-link {
    padding: 12px 16px;
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }

  .section-title {
    font-size: 22px;
  }

  .featured-works,
  .columns-grid {
    grid-template-columns: 1fr;
  }

  .card-cover {
    height: 200px;
  }

  .column-cover {
    height: 160px;
  }

  .cta-title {
    font-size: 24px;
  }
}
</style>
