<!-- Exemple d'utilisation dans un composant -->
<template>
  <div class="p-6 space-y-4">
    <h2 class="text-2xl font-bold">Test des notifications</h2>
    
    <div class="space-x-4">
      <button 
        @click="showSuccess" 
        class="btn btn-success"
      >
        Succès
      </button>
      
      <button 
        @click="showError" 
        class="btn btn-error"
      >
        Erreur
      </button>
      
      <button 
        @click="showWarning" 
        class="btn btn-warning"
      >
        Attention
      </button>
      
      <button 
        @click="showInfo" 
        class="btn btn-info"
      >
        Info
      </button>

      <button 
        @click="showPersistent" 
        class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Persistante
      </button>
    </div>
  </div>
</template>

<script setup>
import { notificationsUtil } from '@/utils/notificationUtil'

const { success, error, warning, info, notify } = notificationsUtil()

const showSuccess = () => {
  success('Votre action a été effectuée avec succès !', 'Opération réussie')
}

const showError = () => {
  error('Une erreur est survenue lors de l\'opération', 'Erreur système')
}

const showWarning = () => {
  warning('Attention, cette action est irréversible', 'Confirmation requise')
}

const showInfo = () => {
  info('Voici une information importante pour vous', 'Nouvelle fonctionnalité')
}

const showPersistent = () => {
  notify({
    type: 'info',
    title: 'Notification persistante',
    message: 'Cette notification ne se ferme pas automatiquement',
    autoClose: false
  })
}
</script>