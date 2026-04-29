import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  blogger,
  imageWorks,
  videoWorks,
  allWorks,
  columns,
  messages,
  cooperationTypes,
  getWorkById,
  getColumnById
} from '@/data/mockData'

export const useDataStore = defineStore('data', () => {
  const bloggerData = ref({ ...blogger })
  const imageWorksList = ref([...imageWorks])
  const videoWorksList = ref([...videoWorks])
  const worksList = ref([...allWorks])
  const columnsList = ref([...columns])
  const messagesList = ref([...messages])
  const cooperationTypesList = ref([...cooperationTypes])
  const submittedRecords = ref([])

  const featuredWorks = computed(() => {
    return [...worksList.value]
      .sort((a, b) => {
        if (a.hot && !b.hot) return -1
        if (!a.hot && b.hot) return 1
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
      .slice(0, 6)
  })

  function findWorkById(id) {
    return worksList.value.find(w => w.id === parseInt(id))
  }

  function findColumnById(id) {
    return columnsList.value.find(c => c.id === parseInt(id))
  }

  function addMessage(message) {
    messagesList.value.unshift(message)
  }

  function addCooperationRecord(record) {
    submittedRecords.value.unshift(record)
  }

  function purchaseColumn(columnId) {
    const column = columnsList.value.find(c => c.id === parseInt(columnId))
    if (column) {
      column.purchased = true
      return true
    }
    return false
  }

  function toggleWorkLike(workId) {
    const work = worksList.value.find(w => w.id === parseInt(workId))
    if (work) {
      work.userLiked = !work.userLiked
      work.likes += work.userLiked ? 1 : -1
      return work.userLiked
    }
    return false
  }

  function toggleMessageLike(messageId) {
    const message = messagesList.value.find(m => m.id === parseInt(messageId))
    if (message) {
      message.userLiked = !message.userLiked
      message.likes += message.userLiked ? 1 : -1
      return message.userLiked
    }
    return false
  }

  function getWorksByType(type) {
    if (type === 'all') return worksList.value
    return worksList.value.filter(w => w.type === type)
  }

  function sortWorks(works, sortType) {
    const sorted = [...works]
    if (sortType === 'hot') {
      sorted.sort((a, b) => {
        if (a.hot && !b.hot) return -1
        if (!a.hot && b.hot) return 1
        return (b.views + b.likes) - (a.views + a.likes)
      })
    } else {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    return sorted
  }

  return {
    bloggerData,
    imageWorksList,
    videoWorksList,
    worksList,
    columnsList,
    messagesList,
    cooperationTypesList,
    submittedRecords,
    featuredWorks,
    findWorkById,
    findColumnById,
    addMessage,
    addCooperationRecord,
    purchaseColumn,
    toggleWorkLike,
    toggleMessageLike,
    getWorksByType,
    sortWorks
  }
})
