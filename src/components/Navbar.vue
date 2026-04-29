<template>
  <nav class="navbar glass">
    <div class="navbar-container">
      <router-link to="/" class="logo">
        <span class="logo-text">墨染清秋</span>
      </router-link>

      <div class="nav-links desktop">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: isActive(link.path) }"
        >
          {{ link.label }}
        </router-link>
      </div>

      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <svg v-if="!mobileMenuOpen" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <div class="mobile-links">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="mobile-link"
            :class="{ active: isActive(link.path) }"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </router-link>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = [
  { path: '/', label: '博主主页' },
  { path: '/works', label: '作品合集' },
  { path: '/columns', label: '付费专栏' },
  { path: '/messages', label: '粉丝留言' },
  { path: '/cooperation', label: '合作预约' }
]

function isActive(path) {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--border-color);
}

.navbar-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: var(--transition-fast);
}

.logo:hover {
  opacity: 0.8;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 1px;
}

.logo-text::first-letter {
  color: var(--accent-gold);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-link {
  position: relative;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
  transition: var(--transition-fast);
  padding: 8px 0;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.active {
  color: var(--accent-gold);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent-gold);
  transition: var(--transition-normal);
}

.nav-link.active::after,
.nav-link:hover::after {
  width: 100%;
}

.mobile-menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.mobile-menu-btn:hover {
  background: var(--bg-hover);
}

.mobile-menu-btn svg {
  width: 24px;
  height: 24px;
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
}

.mobile-links {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 16px var(--container-padding) 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-link {
  padding: 16px 20px;
  font-size: 15px;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.mobile-link:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.mobile-link.active {
  background: rgba(212, 175, 55, 0.1);
  color: var(--accent-gold);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .navbar-container {
    height: 70px;
  }

  .logo-text {
    font-size: 16px;
  }

  .nav-links.desktop {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>
