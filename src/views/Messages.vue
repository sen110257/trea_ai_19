<template>
  <div class="messages-page">
    <section class="section header-section">
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">粉丝留言</h1>
          <p class="page-desc">分享你的想法，留下你的心声，期待与你交流</p>
        </div>
      </div>
    </section>

    <section class="section content-section">
      <div class="container">
        <div class="content-layout">
          <div class="publish-section card">
            <h2 class="section-title">发表留言</h2>
            <form @submit.prevent="submitMessage" class="publish-form">
              <div class="form-group">
                <label class="form-label">昵称</label>
                <input
                  v-model="formData.nickname"
                  type="text"
                  class="form-input"
                  placeholder="请输入您的昵称"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">留言内容</label>
                <textarea
                  v-model="formData.content"
                  class="form-textarea"
                  placeholder="分享你的想法、建议或感受..."
                  :rows="4"
                  required
                ></textarea>
                <div class="char-count">
                  {{ formData.content.length }} / 500
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary submit-btn"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">提交留言</span>
                <span v-else>提交中...</span>
              </button>
            </form>
          </div>

          <div class="messages-section">
            <div class="section-header">
              <h2 class="section-title">全部留言</h2>
              <span class="messages-count">共 {{ allMessages.length }} 条</span>
            </div>

            <div v-if="currentPageMessages.length === 0" class="empty-state">
              <div class="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H16M8 16H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <p class="empty-text">暂无留言，快来发表第一条留言吧！</p>
            </div>

            <div v-else class="messages-list">
              <div
                v-for="message in currentPageMessages"
                :key="message.id"
                class="message-item card"
              >
                <div class="message-header">
                  <div class="user-info">
                    <img :src="message.avatar" :alt="message.username" class="user-avatar" />
                    <div class="user-details">
                      <span class="username">{{ message.username }}</span>
                      <span class="post-time">{{ message.createdAt }}</span>
                    </div>
                  </div>
                  <button class="like-btn" :class="{ liked: message.userLiked }" @click="toggleLike(message)">
                    <svg v-if="!message.userLiked" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39463C21.7564 5.72716 21.351 5.12075 20.84 4.61Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39463C21.7564 5.72716 21.351 5.12075 20.84 4.61Z"/>
                    </svg>
                    <span>{{ message.likes }}</span>
                  </button>
                </div>

                <p class="message-content">{{ message.content }}</p>

                <div v-if="message.reply" class="reply-section">
                  <div class="reply-header">
                    <span class="reply-label">博主回复</span>
                    <span class="reply-time">{{ message.reply.createdAt }}</span>
                  </div>
                  <p class="reply-content">{{ message.reply.content }}</p>
                </div>
              </div>
            </div>

            <div v-if="totalPages > 1" class="pagination">
              <button
                class="page-btn prev"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="page-numbers">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  class="page-btn number"
                  :class="{ active: currentPage === page }"
                  @click="currentPage = page"
                >
                  {{ page }}
                </button>
              </div>
              <button
                class="page-btn next"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { useToastStore } from '@/stores/toast'

const dataStore = useDataStore()
const toastStore = useToastStore()

const isSubmitting = ref(false)
const currentPage = ref(1)
const pageSize = 5

const allMessages = computed(() => dataStore.messagesList)

const formData = ref({
  nickname: '',
  content: ''
})

const totalPages = computed(() => {
  return Math.ceil(allMessages.value.length / pageSize)
})

const currentPageMessages = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return allMessages.value.slice(start, end)
})

function toggleLike(message) {
  const result = dataStore.toggleMessageLike(message.id)
  if (result) {
    toastStore.showToast('点赞成功', 'success')
  }
}

async function submitMessage() {
  if (!formData.value.nickname.trim() || !formData.value.content.trim()) {
    toastStore.showToast('请填写完整信息', 'error')
    return
  }

  if (formData.value.content.length > 500) {
    toastStore.showToast('留言内容不能超过500字', 'error')
    return
  }

  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 800))

  const newMessage = {
    id: Date.now(),
    username: formData.value.nickname,
    avatar: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=simple%20user%20avatar%20icon%20minimalist%20elegant%20design&image_size=square`,
    content: formData.value.content,
    createdAt: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-'),
    likes: 0,
    userLiked: false,
    reply: null
  }

  dataStore.addMessage(newMessage)
  currentPage.value = 1

  formData.value = {
    nickname: '',
    content: ''
  }

  isSubmitting.value = false
  toastStore.showToast('留言发布成功！', 'success')
}
</script>

<style scoped>
.messages-page {
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

.content-section {
  padding-top: 40px;
}

.content-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 32px;
}

.publish-section {
  padding: 24px;
  height: fit-content;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.publish-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-input,
.form-textarea {
  width: 100%;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 14px;
  color: var(--text-primary);
  transition: var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--accent-gold);
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.15);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-tertiary);
}

.form-textarea {
  resize: none;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.submit-btn {
  width: 100%;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.messages-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.messages-section .section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.messages-count {
  font-size: 13px;
  color: var(--text-tertiary);
}

.empty-state {
  text-align: center;
  padding: 60px 0;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  color: var(--text-tertiary);
}

.empty-text {
  font-size: 14px;
  color: var(--text-tertiary);
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  padding: 20px;
}

.message-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-color);
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.username {
  font-size: 14px;
  font-weight: 600;
}

.post-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: var(--text-tertiary);
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.like-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.like-btn.liked {
  color: #ef4444;
}

.like-btn svg {
  width: 16px;
  height: 16px;
}

.message-content {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.reply-section {
  padding: 16px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--accent-gold);
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.reply-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(212, 175, 55, 0.15);
  color: var(--accent-gold);
  border-radius: var(--radius-sm);
}

.reply-label::before {
  content: '';
  width: 12px;
  height: 12px;
  background: currentColor;
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
}

.reply-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.reply-content {
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--text-tertiary);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  transition: var(--transition-fast);
}

.page-btn:hover:not(:disabled) {
  color: var(--text-primary);
  background: var(--bg-hover);
  border-color: var(--border-hover);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn.active {
  background: var(--accent-gold);
  border-color: var(--accent-gold);
  color: var(--bg-primary);
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-btn svg {
  width: 16px;
  height: 16px;
}

@media (max-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .publish-section {
    order: 2;
  }

  .messages-section {
    order: 1;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 26px;
  }

  .page-desc {
    font-size: 14px;
  }

  .message-item {
    padding: 16px;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
  }

  .pagination {
    gap: 8px;
  }

  .page-numbers {
    gap: 4px;
  }
}
</style>
