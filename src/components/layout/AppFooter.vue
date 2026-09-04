<template>
  <footer class="w-full mt-auto">
    <div class="info-footer">
      <div class="info-item">
        <i class="fa-classic fa-globe mr-2"></i>
        <span>
          {{ t('providedBy') }}
          <a 
            href="https://openweathermap.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="font-medium hover:text-(--primary-color) transition-colors"
          >
            OpenWeatherMap
          </a>
        </span>
      </div>
      <div class="info-item">
        <i class="fa-regular fa-cloud mr-2"></i>
        <span>{{ t('dataLimit') }}</span>
      </div>
      <!--<div class="info-item">
        <i class="pi pi-moon mr-2"></i>
        <span>Фазы луны рассчитываются по приближенной формуле</span>
      </div>-->
      <div class="info-item copyright">
        <i class="fa-regular fa-copyright mr-2"></i>
        <span>2026 · MeteoFlow · 
          <button @click="showPrivacy = true" class="privacy-link">
            {{ t('privacyTitle') }}
          </button>
        </span>
      </div>
    </div>

    <Dialog
      v-model:visible="showPrivacy" 
      :header="t('privacyTitle')" 
      :modal="true"
      :dismissableMask="true"
      :style="{ width: '600px', maxWidth: '90vw' }"
    >
      <div class="privacy-content">
        <p>{{ t('privacyText1') }}</p>
        <p>{{ t('privacyText2') }}</p>
        <p>{{ t('privacyText3') }}</p>
        <p class="mt-4 text-sm opacity-70">Дата обновления: 26.08.2026</p>
      </div>
    </Dialog>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
const showPrivacy = ref(false)
</script>

<style scoped>
.info-footer {
  margin: 0 auto;
  padding: 15px;
  background: var(--surface-section);
  border-radius: 8px;
  border: 1px solid var(--surface-border);
}

.info-item {
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  line-height: 1.4;
}
.info-item i {
  line-height: 1;
  margin-top: 0.1em;
}

.info-item:last-child {
  margin-bottom: 0;
}

.privacy-link {
  background: none;
  border: none;
  color: var(--text-color-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: all 0.2s;
}

.privacy-link:hover {
  color: var(--primary-color);
  text-decoration-color: currentColor;
}

.privacy-content p {
  margin-bottom: 12px;
  line-height: 1.6;
}

.privacy-content p:last-child {
  margin-bottom: 0;
}
</style>