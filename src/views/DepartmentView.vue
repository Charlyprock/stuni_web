<template>
    <div class="flex flex-col gap-5">

        <!-- bare de recherche, titre, et bouton ajouter -->
        <header class="w-full bg-base-100f borderf border-base-300 flex justify-between items-center p-3 rounded-box">

            <!-- title -->
            <h1 class="text-xl text-nowrap">Liste des Départements</h1>

            <div class="flex gap-3 items-center">
                <button @click="showLevelModalF()" data-tip="Nouveaux Niveau" class="btn btn-neutral tooltip tooltip-left btn-sm text-nowrap">
                    <AddIcon class="size-(--icon-size)" />
                </button>

                <label class="input w-full">
                    <SearchIcon :class-props="'h-[1em] opacity-50'" />
                    <input type="text" placeholder="Recherche" id="input_search" v-model="search.q" />
                </label>

                <button @click="refresch_level" :disabled="!search.q" class="btn btn-accent tooltip tooltip-left"
                    data-tip="Rafraichir">
                    <RefreschIcon class="size-(--icon-size)" />
                </button>
            </div>
        </header>

        <!-- liste -->
        <div class="w-full bg-base-100 border border-base-300 p-3 rounded-box flex flex-col gap-3">
            <div class="overflow-x-auto">
                <table class="table table-zebrak">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nom</th>
                            <th>Abreviation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="(level, i) in levels" :key="level.id">
                            <th>{{ i + 1 }}</th>
                            <td>{{ level.name }}</td>
                            <td>{{ level.abbreviation }}</td>
                            <td>
                                <div class="flex gap-3">
                                    <button @click="showLevelModalF(level)" data-tip="Editer" class="btn btn-accent btn-sm tooltip tooltip-top">
                                        <EditIcon class="size-(--icon-size)" />
                                    </button>

                                    <button @click="showSpecialityModalF(level)" class="btn btn-primary btn-sm btn-soft">
                                        <AddIcon class="size-(--icon-size)" />
                                        Add Spécialités
                                    </button>

                                    <button @click="showAllSpecialityModalF(level)" data-tip="Détail" class="btn btn-primary btn-sm tooltip tooltip-top">
                                        <DetailIcon class="size-(--icon-size)" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal pour l'ajout et l'edit des levels -->
        <Modal 
            v-model="showLevelModal" 
            title="Nivaux" 
            confirm-text="Sauvegarder" 
            cancel-text="Fermer"
            confirm-button-type="primary"
            :loading="is_loading.set_level"
            @confirm="handleSetLevel"
            @cancel="resetForm"
        >
            <form class="space-y-4">
                <label class="label">Nom</label>
                <input v-model="form.name" type="text" required class="input w-full" placeholder="Nom" />
                <p v-for="error in errors.set_level?.['name']" class="text-error text-start text-xs">{{ error }}</p>

                <label class="label">Abreviation</label>
                <input v-model="form.abbreviation" type="text" required class="input w-full" placeholder="Abreviation" />
                <p v-for="error in errors.set_level?.['abbreviation']" class="text-error text-start text-xs">{{ error }}</p>
     
            </form>
        </Modal>

        <!-- Modal d'ajout des specialitys -->
        <Modal 
            v-model="setSpecialitys.showModal" 
            :title="`Niveax: ${setSpecialitys.level.name}`" 
            confirm-text="Sauvegarder" 
            cancel-text="Fermer"
            confirm-button-type="primary"
            :persistent="true"
            :loading="is_loading.set_speciality"
            @cancel="closeSpecialityModalF"
            @confirm="submitSetSpeciality"
        >
            <form>

                <div class="my-3 flex justify-between">
                    <div class="max-w-[80%]">
                        <SelectFilter
                            :values="setSpecialitys.specialitys" 
                            name="Spécialité"
                            :loading="is_loading.get_speciality"
                            @select-value="select_speciality"
                        />
                    </div>

                    <!-- Actions -->
                    <div class="">
                        <button type="button" @click="clearAllSetSpeciality" v-if="setSpecialitys.selectedItems.length > 0" class="btn btn-error">
                            <DeleteIcon class="size-(--icon-size)" />
                        </button>
                    </div>

                </div>
                
                <!-- Liste des éléments sélectionnés -->
                <div class="w-full border border-base-300 rounded-field" v-if="setSpecialitys.selectedItems.length > 0">
                    
                    <div class="flex flex-wrap gap-3 p-3">
                        <div v-for="item in setSpecialitys.selectedItems" :key="item.id" class="p-2 rounded-field bg-base-200/50 flex gap-1 text-base-content/70">
                            <span>{{ item.name }}</span>
                            <button type="button" @click="removeItemSpeciality(item.id)" class="btn btn-xs">
                                <CloseIcon class="size-(--icon-size) p-[2px]" />
                            </button>
                        </div>
                    </div>

                </div>
                <p v-for="error in errors.set_speciality?.['specialitys']" class="text-error text-start text-xs">{{ error }}</p>
            </form>
        </Modal>

        <!-- Modal d'afficharge des specialitys -->
        <Modal 
            v-model="allSpecialitys.showModal" 
            :title="`Niveax: ${allSpecialitys.level.name}`" 
            :confirm-text="`Supprimer (${selectedItems.length})`" 
            cancel-text="Fermer"
            :persistent="true"
            confirm-button-type="primary"
            @confirm="deleteAllSpecialitys"
        >
            <div>
                <div class="space-y-2 border border-base-300 rounded-box p-2">
                    <p><span class="font-semibold text-sm">Nom: </span>{{ allSpecialitys.level.name }}</p>
                    <p><span class="font-semibold text-sm">Abreviation: </span>{{ allSpecialitys.level.abbreviation }}</p>
                    <p><span class="font-semibold text-sm">Nombre de Spécialité: </span>{{ allSpecialitys.specialitys.length }}</p>
                </div>

                <div v-if="is_loading.get_allSpeciality" class="flex justify-center my-5">
                    <div class=" space-x-2">
                        <LoadingIcon class="size-(--icon-size)" />
                        <span>Chargement...</span>
                    </div>
                </div>

                <!-- les specialitys -->
                <div v-if="!is_loading.get_allSpeciality" class="space-y-2 p-2">

                    <div class="flex gap-3">
                        <label>
                            <input type="checkbox" class="checkbox" 
                                :checked="isAllSelected"
                                :indeterminate="isIndeterminate"
                                @change="toggleAll" 
                            />
                        </label>

                        <h1 class="text-xl font-semibold text-base-content/50">Toutes les spécialités</h1>
                    </div>
                    <div v-for="speciality in allSpecialitys.specialitys" :key="speciality.id" class="border-b border-base-300 py-2 flex gap-3">
                        <div>
                            <label>
                                <input type="checkbox" class="checkbox" 
                                    :checked="isSelected(speciality.id)" 
                                    @change="toggleItem(speciality.id)"
                                />
                            </label>
                        </div>

                        <div class="space-y-1">
                            <p><span class="font-semibold text-sm">Nom: </span>{{ speciality.name }}</p>
                            <p><span class="font-semibold text-sm">Abreviation: </span>{{ speciality.abbreviation }}</p>
                        </div>
                    
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup>
import { 
    AddIcon, SearchIcon, EditIcon, DeleteIcon,
    RefreschIcon, CloseIcon, DetailIcon, LoadingIcon,
} from '@/components/icons';
import SelectFilter from '@/components/SelectFilterComponent.vue';
import Modal from '@/components/ModalComponent.vue'
import { LevelService, SpecialityService } from '@/services';
import { onMounted, ref, watch, computed } from 'vue';
import { NotificationUtil } from '@/utils';
import { useCheckbox } from '@/composables/useCheckboxComposable';

const Notification = NotificationUtil.notificationsUtil()

const levels = ref([])
const form = ref({
    id: null,
    name: null,
    abbreviation: null
})
const is_loading = ref({
    set_level: false,
    set_speciality: false,
    get_speciality: false,
    get_allSpeciality: false,
})
const errors = ref({
    set_level: null,
    set_speciality: null,
})

const search = ref({
    q: null
})
const showLevelModal = ref(false)

onMounted(()=>{
    get_level()
})

watch(()=> search.value.q, (q)=> {
    get_level(q)
})

function refresch_level() {
    search.value.q = null
}

function get_level(search=null){
    LevelService.get_level({search: search}).then((res)=> {
        levels.value = res.data
    })
}

function update_level(){
    LevelService.update_level(form.value).then((res)=>{
        levels.value = levels.value.map(
            level => level.id == res.data.id ? res.data : level
        )
        closeLevelModalF()
        Notification.success("Modification réussir.")
    }).catch((error) => Notification.error("Une erreur innatendus s'est produit, veuillez réessayer."))
    .finally(() => {
        is_loading.value.set_level = false
        closeLevelModalF()
    })
}

function set_level(){
    LevelService.set_level(form.value).then((res)=>{
        levels.value.unshift(res.data)
        Notification.success("Ajout réussir.")
    }).catch((error) => {
        Notification.error("Une erreur innatendus s'est produit, veuillez réessayer.")
        closeLevelModalF()
        errors.value.set_level = error.response.data
    })
    .finally(() => {
        is_loading.value.set_level = false
    })
}

function resetForm(){
    form.value = {
        id: null,
        name: null,
        abbreviation: null
    }

    errors.value = {
        set_level: null,
        set_speciality: null,
    }
}



// function showDetailModalF(student=null){
// 	showLevelModal.value = true
// 	level_click.value = student
// }

function closeLevelModalF(){
    showLevelModal.value = false
    resetForm()
}

function showLevelModalF(level=null){
    showLevelModal.value = true
    if (level) {
        form.value = {
            id: level.id,
            name: level.name,
            abbreviation: level.abbreviation
        }
    }
}

function handleSetLevel(){
    is_loading.value.set_level = true
    if (form.value.id) {
        update_level()
    } else {
        set_level()
    }
}



// :::::::::::::::::::::::::::::::	GESTION DE L'AJOUT MUTILPLE DE SPECIALITY	:::::::::::::::::::::::::::::::::::::

const setSpecialitys = ref({
    selectedItems: [],
    level: {},
    specialitys: [],
    showModal: false
})

function showSpecialityModalF(level){
    setSpecialitys.value.showModal = true
    setSpecialitys.value.level = level

    if(setSpecialitys.value.specialitys.length < 1){
        is_loading.value.get_speciality = true

        SpecialityService.get_speciality().then((res) => {
            is_loading.value.get_speciality = false
            setSpecialitys.value.specialitys = res.data
        })
    }
}

function closeSpecialityModalF(){
    setSpecialitys.value.showModal = false
    clearAllSetSpeciality()
}

const select_speciality = (speciality) => {
    const isAlreadySelected = setSpecialitys.value.selectedItems.find(item => item.id === speciality.id)

    if (!isAlreadySelected) {
        setSpecialitys.value.selectedItems.push(speciality)
    }
}

const removeItemSpeciality = (itemId) => {
    setSpecialitys.value.selectedItems = setSpecialitys.value.selectedItems.filter(item => item.id !== itemId)
}
const clearAllSetSpeciality = () => {
    setSpecialitys.value.selectedItems = []
    setSpecialitys.value.level = {}
    errors.value.set_speciality = null
}

function submitSetSpeciality(){
    const ids = {
        specialitys: setSpecialitys.value.selectedItems.map(item => item.id)
    }

    if(ids.specialitys.length > 0){
        
        is_loading.value.set_speciality = true
        LevelService.set_specialitys(setSpecialitys.value.level.id, ids).then((res)=> {
            is_loading.value.set_speciality = false
            closeSpecialityModalF()
            Notification.success("Ajourt réussir.")
        }).catch((error) => {
            errors.value.set_speciality = error.response.data
            is_loading.value.set_speciality = false
        })
    }
}

// :::::::::::::::::::::::::::::::	GESTION DE L'AJOUT MUTILPLE DE SPECIALITY	:::::::::::::::::::::::::::::::::::::



// :::::::::::::::::::::::::::::::	GESTION DE L'AFFICHARGE MUTILPLE DE SPECIALITY	:::::::::::::::::::::::::::::::::::::

const allSpecialitys = ref({
    level: {},
    specialitys: [],
    showModal: false
})

const allSpecialitysData = ref([])

const {
    isAllSelected,
    isIndeterminate,
    selectedItems,
    isSelected,
    toggleAll,
    toggleItem
} = useCheckbox(allSpecialitysData)

function showAllSpecialityModalF(level){
    allSpecialitys.value.showModal = true

    if(allSpecialitys.value.level.id != level.id){
        allSpecialitys.value.level = level
        is_loading.value.get_allSpeciality = true

        LevelService.get_level({id: level.id}).then((res) => {
            is_loading.value.get_allSpeciality = false
            allSpecialitys.value.specialitys = res.data.specialitys
            allSpecialitysData.value = res.data.specialitys
        })
    }
}

function deleteAllSpecialitys(){
    const form = {ids: selectedItems.value}
    console.log(form)
    // StudentService.deleteStudentsIDS(form).then((res)=> {
    // 	students.value = students.value.filter(
    // 		stud => !res.data.deleted.includes(stud.id)
    // 	)
    // 	selectedItems.value = []
    // 	Notification.success("Suppréssion réussir.")
    // }).catch((error) => Notification.error("Une erreur innatendus s'est produit, veuillez réessayer."))
    // .finally(() => {
    // 	deleteLoading.value = false
    // 	closeDeleteModalF()
    // })
}

</script>