<template>
    <div class="flex flex-col gap-5">

        <!-- bare de recherche, titre, et bouton ajouter -->
        <header class="w-full bg-base-100f borderf border-base-300 flex justify-between items-center p-3 rounded-box">

            <!-- title -->
            <h1 class="text-xl text-nowrap">Liste des Spécialitées</h1>

            <div class="flex gap-3 items-center">
                <button @click="showSpecialityModalF()" data-tip="Nouvelle Spécialitée" class="btn btn-neutral tooltip tooltip-left btn-sm text-nowrap">
                    <AddIcon class="size-(--icon-size)" />
                </button>

                <label class="input w-full">
                    <SearchIcon :class-props="'h-[1em] opacity-50'" />
                    <input type="text" placeholder="Recherche" id="input_search" v-model="search.q" />
                </label>

                <button @click="refresch_speciality" :disabled="!search.q" class="btn btn-accent tooltip tooltip-left"
                    data-tip="Rafraichir">
                    <RefreschIcon class="size-(--icon-size)" />
                </button>
            </div>
        </header>

        <!-- liste -->
        <div class="w-full bg-base-100 border border-base-300 p-3 rounded-box flex flex-col gap-3">
            <div class="w-[200px]">
                <SelectFilter 
                    :values="departments" 
                    name="Département"
                    :loading="is_loading.get_department"
                    @select-value="select_departmentFilter"
                />
            </div>

            <div class="overflow-x-auto">
                <table class="table table-zebrak">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nom</th>
                            <th>Abreviation</th>
                            <th>Département</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="(speciality, i) in specialitys" :key="speciality.id">
                            <th>{{ i + 1 }}</th>
                            <td>{{ speciality.name }}</td>
                            <td>{{ speciality.abbreviation }}</td>
                            <td>
                                <div>
                                    <p>{{ speciality.department_display?.name ?? "---" }}</p>
                                    <p class="opacity-60">{{ speciality.department_display?.abbreviation ?? "---" }}</p>
                                </div>
                            </td>
                            <td>
                                <div class="flex gap-3">
                                    <button @click="showSpecialityModalF(speciality)" data-tip="Editer" class="btn btn-accent btn-sm tooltip tooltip-top">
                                        <EditIcon class="size-(--icon-size)" />
                                    </button>

                                    <button @click="showAllClasseModalF(speciality)" data-tip="Détail" class="btn btn-primary btn-sm tooltip tooltip-top">
                                        <DetailIcon class="size-(--icon-size)" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal pour l'ajout et l'edit d'un département -->
        <Modal 
            v-model="showSpecialityModal" 
            title="Spécialitée" 
            confirm-text="Sauvegarder" 
            cancel-text="Fermer"
            confirm-button-type="primary"
            :loading="is_loading.set_speciality"
            @confirm="handleSetSpeciality"
            @cancel="resetForm"
        >
            <form class="space-y-4">
                
                <div>
                    <SelectFilter
                        :values="departments" 
                        name="Départements: "
                        :loading="is_loading.get_department"
                        :defaultSelect="defaulDepartmentSelect"
                        @select-value="select_department"
					/>
                </div>

                <label class="label">Nom</label>
                <input v-model="form.name" type="text" required class="input w-full" placeholder="Nom" />
                <p v-for="error in errors.set_speciality?.['name']" class="text-error text-start text-xs">{{ error }}</p>

                <label class="label">Abreviation</label>
                <input v-model="form.abbreviation" type="text" required class="input w-full" placeholder="Abreviation" />
                <p v-for="error in errors.set_speciality?.['abbreviation']" class="text-error text-start text-xs">{{ error }}</p>
     
            </form>
        </Modal>

        <!-- Modal d'afficharge des classes -->
        <Modal 
            v-model="allClasse.showModal" 
            :title="`Département: ${allClasse.speciality.name}`" 
            confirm-text="-" 
            cancel-text="Fermer"
            :persistent="true"
            confirm-button-type="primary"
        >
            <div>
                <div class="space-y-2 border border-base-300 rounded-box p-2">
                    <p><span class="font-semibold text-sm">Nom: </span>{{ allClasse.speciality.name }}</p>
                    <p><span class="font-semibold text-sm">Abreviation: </span>{{ allClasse.speciality.abbreviation }}</p>
                    
                    <h1 class="text-lg text-base-content/50">Département</h1>
                    <p><span class="font-semibold text-sm">Nom: </span>{{ allClasse.speciality.department_display?.name ?? "---" }}</p>
                    <p><span class="font-semibold text-sm">Abreviation: </span>{{ allClasse.speciality.department_display?.abbreviation ?? "---" }}</p>

                    <p><span class="font-semibold text-sm top-2">Nombre de Classe: </span>{{ allClasse.classes.length }}</p>
                </div>

                <div v-if="is_loading.get_allClasse" class="flex justify-center my-5">
                    <div class=" space-x-2">
                        <LoadingIcon class="size-(--icon-size)" />
                        <span>Chargement...</span>
                    </div>
                </div>

                <!-- les Classes -->
                <div v-if="!is_loading.get_allClasse" class="space-y-2 p-2">

                    <h1 class="text-xl font-semibold text-base-content/50">Toutes les classes</h1>

                    <div v-for="classe in allClasse.classes" :key="classe.id" class="border-b border-base-300 py-2 space-y-1">
                        
                        <p><span class="font-semibold text-sm">Nom: </span>{{ classe.name }}</p>
                        <p><span class="font-semibold text-sm">Abreviation: </span>{{ classe.abbreviation }}</p>
                
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup>
import { 
    AddIcon, SearchIcon, EditIcon,
    RefreschIcon, DetailIcon, LoadingIcon,
} from '@/components/icons';
import Modal from '@/components/ModalComponent.vue'
import SelectFilter from '@/components/SelectFilterComponent.vue';
import { DepartmentService, SpecialityService } from '@/services';
import { onMounted, ref, watch } from 'vue';
import { NotificationUtil } from '@/utils';

const Notification = NotificationUtil.notificationsUtil()

const departments = ref([])
const departmentFilter = ref({})
const defaulDepartmentSelect = ref({})
const specialitys = ref([])
const form = ref({
    id: null,
    name: null,
    abbreviation: null,
    department: null,
})
const is_loading = ref({
    set_speciality: false,
    get_allClasse: false,
    get_department: false
})
const errors = ref({
    set_speciality: null,
})

const search = ref({
    q: null
})
const showSpecialityModal = ref(false)

onMounted(()=>{
    is_loading.value.get_department = true
    DepartmentService.get_department().then((res) => {
        departments.value = res.data
        if(res.data.length > 0) {
            departmentFilter.value = res.data[0].id
        }
        is_loading.value.get_department = false
    })
})

watch(()=> search.value.q, (q)=> {
    if(!q){
        get_speciality()
    } else {
        get_speciality(q, null)
    }
    
})

watch(()=> departmentFilter.value, (department)=> {
    get_speciality()
})

function refresch_speciality() {
    search.value.q = null
}

function get_speciality(search=null, department=departmentFilter.value){
    SpecialityService.get_speciality({search: search,  department: department}).then((res)=> {
        specialitys.value = res.data
    })
}

function update_speciality(){
    SpecialityService.update_speciality(form.value).then((res)=>{
        specialitys.value = specialitys.value.map(
            speciality => speciality.id == res.data.id ? res.data : speciality
        )
        
        Notification.success("Modification réussir.")
    }).catch((error) => Notification.error("Une erreur innatendus s'est produit, veuillez réessayer."))
    .finally(() => {
        is_loading.value.set_speciality = false
        closeSpecialityModalF()
    })
}

function set_speciality(){
    SpecialityService.set_speciality(form.value).then((res)=>{
        specialitys.value.unshift(res.data)
        closeSpecialityModalF()
        Notification.success("Ajout réussir.")
    }).catch((error) => {
        Notification.error("Une erreur innatendus s'est produit, veuillez réessayer.")
        errors.value.set_speciality = error.response.data
    })
    .finally(() => {
        is_loading.value.set_speciality = false
    })
}

function select_department(department){
	form.value.department = department.id
}

function select_departmentFilter(department){
	departmentFilter.value = department.id
}

function resetForm(){
    form.value = {
        id: null,
        name: null,
        abbreviation: null,
        department: null,
    }
    defaulDepartmentSelect.value = []
    errors.value = {
        set_department: null,
    }
}

function closeSpecialityModalF(){
    showSpecialityModal.value = false
    resetForm()
}

function showSpecialityModalF(speciality=null){
    showSpecialityModal.value = true

    if (speciality) {
        defaulDepartmentSelect.value = speciality.department_display
        form.value = {
            id: speciality.id,
            name: speciality.name,
            abbreviation: speciality.abbreviation,
            admin: speciality.department
        }
    }

}

function handleSetSpeciality(){
    if(!form.value.abbreviation || !form.value.name || !form.value.department){
        Notification.error("Veuillez remplir tous les champs.")
        return
    }

    is_loading.value.set_speciality = true
    if (form.value.id) {
        update_speciality()
    } else {
        set_speciality()
    }
}

// :::::::::::::::::::::::::::::::	GESTION DE L'AFFICHARGE MUTILPLE DE SPECIALITY	:::::::::::::::::::::::::::::::::::::

const allClasse = ref({
    speciality: {},
    classes: [],
    showModal: false
})

function showAllClasseModalF(speciality){
    allClasse.value.showModal = true

    if(allClasse.value.speciality.id != speciality.id){
        allClasse.value.speciality = speciality
        is_loading.value.get_allClasse = true

        SpecialityService.get_speciality({id: speciality.id}).then((res) => {
            is_loading.value.get_allClasse = false
            allClasse.value.classes = res.data.classes
        })
    }
}

</script>