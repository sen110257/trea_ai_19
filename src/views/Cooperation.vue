<template>
  <div class="cooperation-page">
    <section class="section header-section">
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">合作预约</h1>
          <p class="page-desc">期待与您的合作，共创更多精彩</p>
        </div>
      </div>
    </section>

    <section class="section content-section">
      <div class="container">
        <div class="content-layout">
          <div class="info-section card">
            <div class="info-header">
              <h2 class="info-title">合作范围</h2>
              <p class="info-desc">以下是我可承接的合作类型，如有其他需求也可详细沟通</p>
            </div>

            <div class="cooperation-types">
              <div class="type-item" v-for="type in cooperationTypesList" :key="type.value">
                <div class="type-icon">
                  {{ getTypeIcon(type.value) }}
                </div>
                <div class="type-info">
                  <h3 class="type-title">{{ type.label }}</h3>
                  <p class="type-desc">{{ getTypeDesc(type.value) }}</p>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <div class="contact-info">
              <h3 class="contact-title">联系方式</h3>
              <div class="contact-list">
                <div class="contact-item">
                  <div class="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5L21 19M17 17V21H7V17M19 13V3H5V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">工作邮箱</span>
                    <span class="contact-value">business@moranqiuqiu.com</span>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V21H16.92L3 10.08L13.92 0H19V5.08L22 16.92Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M13.92 10.08L18 14.16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">商务微信</span>
                    <span class="contact-value">MoranQiuQiu_Biz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-section card">
            <h2 class="form-section-title">在线预约</h2>
            <p class="form-section-desc">填写以下信息，我会尽快与您联系</p>

            <form @submit.prevent="submitForm" class="cooperation-form">
              <div class="form-row">
                <div class="form-group half">
                  <label class="form-label">
                    您的姓名 <span class="required">*</span>
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    class="form-input"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                <div class="form-group half">
                  <label class="form-label">
                    联系方式 <span class="required">*</span>
                  </label>
                  <input
                    v-model="formData.contact"
                    type="text"
                    class="form-input"
                    placeholder="手机号或邮箱"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">
                  合作类型 <span class="required">*</span>
                </label>
                <select
                  v-model="formData.type"
                  class="form-select"
                  required
                >
                  <option value="" disabled>请选择合作类型</option>
                  <option
                    v-for="type in cooperationTypesList"
                    :key="type.value"
                    :value="type.value"
                  >
                    {{ type.label }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">
                  公司/机构名称
                </label>
                <input
                  v-model="formData.company"
                  type="text"
                  class="form-input"
                  placeholder="请输入公司或机构名称（选填）"
                />
              </div>

              <div class="form-group">
                <label class="form-label">
                  需求描述 <span class="required">*</span>
                </label>
                <textarea
                  v-model="formData.description"
                  class="form-textarea"
                  placeholder="请详细描述您的合作需求..."
                  :rows="5"
                  required
                ></textarea>
                <div class="char-count">
                  {{ formData.description.length }} / 1000
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">
                  预算范围
                </label>
                <select
                  v-model="formData.budget"
                  class="form-select"
                >
                  <option value="" disabled>请选择预算范围（选填）</option>
                  <option
                    v-for="opt in budgetOptions"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">
                  补充说明
                </label>
                <textarea
                  v-model="formData.notes"
                  class="form-textarea"
                  placeholder="其他需要补充说明的信息（选填）"
                  :rows="3"
                ></textarea>
              </div>

              <div class="form-actions">
                <button
                  type="button"
                  class="btn btn-secondary reset-btn"
                  @click="resetForm"
                >
                  重置表单
                </button>
                <button
                  type="submit"
                  class="btn btn-primary submit-btn"
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting">提交预约</span>
                  <span v-else>提交中...</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="records-section">
          <div class="section-header">
            <h2 class="section-title">预约记录</h2>
            <button class="view-btn" @click="showRecords = !showRecords">
              {{ showRecords ? '收起' : '查看历史' }}
              <svg :class="{ rotated: showRecords }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <Transition name="slide-down">
            <div v-if="showRecords" class="records-list">
              <div v-if="submittedRecords.length === 0" class="empty-records">
                <p>暂无预约记录</p>
              </div>
              <div v-else class="records-cards">
                <div
                  v-for="record in submittedRecords"
                  :key="record.id"
                  class="record-card card"
                >
                  <div class="record-header">
                    <h3 class="record-name">{{ record.name }}</h3>
                    <span class="record-status">
                      {{ record.status === 'pending' ? '待处理' : '已处理' }}
                    </span>
                  </div>
                  <div class="record-meta">
                    <span class="meta-item">
                      <span class="meta-label">合作类型：</span>
                      <span class="meta-value">{{ getTypeLabel(record.type) }}</span>
                    </span>
                    <span class="meta-item">
                      <span class="meta-label">提交时间：</span>
                      <span class="meta-value">{{ record.submittedAt }}</span>
                    </span>
                  </div>
                  <div v-if="record.description" class="record-desc">
                    <span class="meta-label">需求描述：</span>
                    <p>{{ record.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { useToastStore } from '@/stores/toast'

const dataStore = useDataStore()
const toastStore = useToastStore()

const cooperationTypesList = ref([...dataStore.cooperationTypesList])
const submittedRecords = ref([...dataStore.submittedRecords])

const isSubmitting = ref(false)
const showRecords = ref(false)
const isDataReady = ref(false)

const budgetOptions = [
  { value: '5k-1w', label: '5,000 - 10,000 元' },
  { value: '1w-3w', label: '10,000 - 30,000 元' },
  { value: '3w-5w', label: '30,000 - 50,000 元' },
  { value: '5w-10w', label: '50,000 - 100,000 元' },
  { value: '10w+', label: '100,000 元以上' }
]

const defaultFormData = {
  name: '',
  contact: '',
  type: '',
  company: '',
  description: '',
  budget: '',
  notes: ''
}

const formData = ref({ ...defaultFormData })

onMounted(() => {
  isDataReady.value = true
})

function getTypeIcon(type) {
  const icons = {
    brand: '品',
    endorsement: '代',
    content: '定',
    event: '活',
    other: '其'
  }
  return icons[type] || '合'
}

function getTypeDesc(type) {
  const descs = {
    brand: '品牌植入、品牌故事、品牌活动宣传',
    endorsement: '产品体验、产品测评、产品推荐',
    content: '定制图文/视频内容、专题合作',
    event: '线下活动邀请、直播合作、嘉宾演讲',
    other: '其他类型的商务合作需求'
  }
  return descs[type] || '详谈'
}

function getTypeLabel(value) {
  const type = cooperationTypesList.value.find(t => t.value === value)
  return type?.label || '其他合作'
}

function resetForm() {
  formData.value = { ...defaultFormData }
  toastStore.showToast('表单已重置', 'info')
}

async function submitForm() {
  if (!formData.value.name.trim()) {
    toastStore.showToast('请输入您的姓名', 'error')
    return
  }

  if (!formData.value.contact.trim()) {
    toastStore.showToast('请输入联系方式', 'error')
    return
  }

  if (!formData.value.type) {
    toastStore.showToast('请选择合作类型', 'error')
    return
  }

  if (!formData.value.description.trim()) {
    toastStore.showToast('请填写需求描述', 'error')
    return
  }

  if (formData.value.description.length > 1000) {
    toastStore.showToast('需求描述不能超过1000字', 'error')
    return
  }

  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 800))

  const record = {
    id: Date.now(),
    name: formData.value.name,
    contact: formData.value.contact,
    type: formData.value.type,
    company: formData.value.company,
    description: formData.value.description,
    budget: formData.value.budget,
    notes: formData.value.notes,
    status: 'pending',
    submittedAt: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-')
  }

  dataStore.addCooperationRecord(record)
  submittedRecords.value = [...dataStore.submittedRecords]

  formData.value = { ...defaultFormData }

  isSubmitting.value = false
  showRecords.value = true

  toastStore.showToast('预约提交成功！我会尽快与您联系', 'success')
}
</script>

<style scoped>
.cooperation-page {
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
  grid-template-columns: 380px 1fr;
  gap: 32px;
  margin-bottom: 48px;
}

.info-section {
  padding: 28px;
  height: fit-content;
}

.info-header {
  margin-bottom: 28px;
}

.info-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.info-desc {
  font-size: 13px;
  color: var(--text-tertiary);
}

.cooperation-types {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.type-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.type-item:hover {
  background: var(--bg-hover);
}

.type-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%);
  border-radius: var(--radius-md);
  font-size: 18px;
  font-weight: 700;
  color: var(--bg-primary);
  flex-shrink: 0;
}

.type-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.type-title {
  font-size: 14px;
  font-weight: 600;
}

.type-desc {
  font-size: 12px;
  color: var(--text-tertiary);
  line-height: 1.6;
}

.divider {
  height: 1px;
  background: var(--border-color);
  margin: 28px 0;
}

.contact-info {
}

.contact-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  color: var(--accent-gold);
  flex-shrink: 0;
}

.contact-icon svg {
  width: 20px;
  height: 20px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.contact-value {
  font-size: 13px;
  font-weight: 500;
}

.form-section {
  padding: 28px;
}

.form-section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.form-section-desc {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 28px;
}

.cooperation-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.half {
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.required {
  color: #ef4444;
}

.form-input,
.form-textarea,
.form-select {
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
.form-textarea:focus,
.form-select:focus {
  border-color: var(--accent-gold);
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.15);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--text-tertiary);
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
  padding-right: 40px;
}

.form-select option {
  background: var(--bg-secondary);
  color: var(--text-primary);
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

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.reset-btn,
.submit-btn {
  flex: 1;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.records-section {
}

.records-section .section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-tertiary);
  padding: 8px 16px;
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.view-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.view-btn svg {
  width: 16px;
  height: 16px;
  transition: var(--transition-fast);
}

.view-btn svg.rotated {
  transform: rotate(180deg);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}

.records-list {
  overflow: hidden;
}

.empty-records {
  text-align: center;
  padding: 40px 0;
  color: var(--text-tertiary);
}

.records-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.record-card {
  padding: 20px;
}

.record-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.record-name {
  font-size: 14px;
  font-weight: 600;
}

.record-status {
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  border-radius: var(--radius-sm);
}

.record-status:not(.processed) {
  background: rgba(249, 115, 22, 0.15);
  color: #f97316;
}

.record-status.processed {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.record-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.meta-item {
  font-size: 13px;
}

.meta-label {
  color: var(--text-tertiary);
}

.meta-value {
  color: var(--text-secondary);
  font-weight: 500;
}

.record-desc {
}

.record-desc p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .info-section {
    order: 2;
  }

  .form-section {
    order: 1;
  }

  .records-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 26px;
  }

  .page-desc {
    font-size: 14px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .info-section,
  .form-section {
    padding: 20px;
  }

  .record-card {
    padding: 16px;
  }
}
</style>
