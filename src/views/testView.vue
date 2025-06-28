<template>
  <div class="p-8 space-y-4">
    <h1 class="text-2xl font-bold mb-6">Exemples de Modal</h1>
    
    <!-- Boutons pour ouvrir différents types de modals -->
    <div class="space-x-4">
      <button @click="showConfirmModal = true" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Modal de Confirmation
      </button>
      
      <button @click="showDeleteModal = true" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Modal de Suppression
      </button>
      
      <button @click="showCustomModal = true" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Modal Personnalisé
      </button>
      
      <button @click="showPersistentModal = true" class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
        Modal Persistant
      </button>
    </div>

    <!-- Résultats des actions -->
    <div v-if="lastAction" class="mt-4 p-4 bg-gray-100 rounded">
      <strong>Dernière action:</strong> {{ lastAction }}
    </div>

    <!-- Modal de confirmation simple -->
    <Modal
      v-model="showConfirmModal"
      title="Confirmer l'action"
      message="Êtes-vous sûr de vouloir continuer ?"
      confirm-text="Oui, continuer"
      cancel-text="Annuler"
      @confirm="handleConfirm('Confirmation acceptée')"
      @cancel="handleCancel('Confirmation annulée')"
    />

    <!-- Modal de suppression (type danger) -->
    <Modal
      v-model="showDeleteModal"
      title="Supprimer l'élément"
      message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet élément ?"
      confirm-text="Supprimer"
      cancel-text="Conserver"
      confirm-button-type="danger"
      :loading="deleteLoading"
      @confirm="handleDelete"
      @cancel="handleCancel('Suppression annulée')"
    />

    <!-- Modal avec contenu personnalisé -->
    <Modal
      v-model="showCustomModal"
      title="Formulaire personnalisé"
      confirm-text="Sauvegarder"
      cancel-text="Fermer"
      confirm-button-type="success"
      @confirm="handleSave"
      @cancel="handleCancel('Formulaire fermé')"
    >
      <div class="space-y-4">
        <div v-for="i in 8">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input 
            v-model="formData.name"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre nom"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            v-model="formData.email"
            type="email" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez votre email"
          >
        </div>
      </div>
    </Modal>

    <!-- Modal persistant (ne se ferme pas en cliquant dehors) -->
    <Modal
      v-model="showPersistentModal"
      title="Action importante"
      message="Cette modal ne peut être fermée qu'en cliquant sur un bouton."
      confirm-text="J'ai compris"
      cancel-text="Fermer"
      :persistent="true"
      :show-close-button="false"
      confirm-button-type="warning"
      @confirm="handleConfirm('Modal persistant fermé')"
      @cancel="handleCancel('Modal persistant annulé')"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Modal from '@/components/ModalComponent.vue'

// États des modals
const showConfirmModal = ref(false)
const showDeleteModal = ref(false)
const showCustomModal = ref(false)
const showPersistentModal = ref(false)

// États des actions
const lastAction = ref('')
const deleteLoading = ref(false)

// Données du formulaire personnalisé
const formData = reactive({
  name: '',
  email: ''
})

// Gestionnaires d'événements
const handleConfirm = (message) => {
  lastAction.value = message
  showConfirmModal.value = false
  showPersistentModal.value = false
}

const handleCancel = (message) => {
  lastAction.value = message
}

const handleDelete = async () => {
  deleteLoading.value = true
  
  // Simulation d'une requête de suppression
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  deleteLoading.value = false
  showDeleteModal.value = false
  lastAction.value = 'Élément supprimé avec succès'
}

const handleSave = () => {
  if (!formData.name || !formData.email) {
    alert('Veuillez remplir tous les champs')
    return
  }
  
  lastAction.value = `Données sauvegardées: ${formData.name} (${formData.email})`
  showCustomModal.value = false
  
  // Réinitialiser le formulaire
  formData.name = ''
  formData.email = ''
}
</script>