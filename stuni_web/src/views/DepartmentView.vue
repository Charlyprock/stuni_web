<template>
    <div class="flex flex-col gap-5">

        <!-- bare de recherche, titre, et bouton ajouter -->
        <header class="w-full bg-base-100f borderf border-base-300 flex justify-between items-center p-3 rounded-box">

            <!-- title -->
            <h1 class="text-xl text-nowrap">Liste des Départements</h1>

            <div class="flex gap-3 items-center">
                <button @click="showDepartmentModalF()" data-tip="Nouveaux Département" class="btn btn-neutral tooltip tooltip-left btn-sm text-nowrap">
                    <AddIcon class="size-(--icon-size)" />
                </button>

                <label class="input w-full">
                    <SearchIcon :class-props="'h-[1em] opacity-50'" />
                    <input type="text" placeholder="Recherche" id="input_search" v-model="search.q" />
                </label>

                <button @click="refresch_department" :disabled="!search.q" class="btn btn-accent tooltip tooltip-left"
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
                            <th>Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="(department, i) in departments" :key="department.id">
                            <th>{{ i + 1 }}</th>
                            <td>{{ department.name }}</td>
                            <td>{{ department.abbreviation }}</td>
                            <td>
                                <div>
                                    <p>{{ department.admin_display?.username ?? "---" }}</p>
                                    <p class="opacity-60">{{ department.admin_display?.code ?? "---" }}</p>
                                </div>
                            </td>
                            <td>
                                <div class="flex gap-3">
                                    <button @click="showDepartmentModalF(department)" data-tip="Editer" class="btn btn-accent btn-sm tooltip tooltip-top">
                                        <EditIcon class="size-(--icon-size)" />
                                    </button>

                                    <button @click="showAllSpecialityModalF(department)" data-tip="Détail" class="btn btn-primary btn-sm tooltip tooltip-top">
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
            v-model="showDepartmentModal" 
            title="Département" 
            confirm-text="Sauvegarder" 
            cancel-text="Fermer"
            confirm-button-type="primary"
            :loading="is_loading.set_department"
            @confirm="handleSetDepartment"
            @cancel="resetForm"
        >
            <form class="space-y-4">
                
                <div>
                    <SelectFilter
                        :values="admins" 
                        name="Admins: "
                        :loading="is_loading.get_admins"
                        defaulField="username"
                        :defaultSelect="defaulAdminSelect"
                        @select-value="select_admin"
					/>
                </div>

                <label class="label">Nom</label>
                <input v-model="form.name" type="text" required class="input w-full" placeholder="Nom" />
                <p v-for="error in errors.set_department?.['name']" class="text-error text-start text-xs">{{ error }}</p>

                <label class="label">Abreviation</label>
                <input v-model="form.abbreviation" type="text" required class="input w-full" placeholder="Abreviation" />
                <p v-for="error in errors.set_department?.['abbreviation']" class="text-error text-start text-xs">{{ error }}</p>
     
            </form>
        </Modal>

        <!-- Modal d'afficharge des specialitys -->
        <Modal 
            v-model="allSpecialitys.showModal" 
            :title="`Département: ${allSpecialitys.department.name}`" 
            confirm-text="-" 
            cancel-text="Fermer"
            :persistent="true"
            confirm-button-type="primary"
        >
            <div>
                <div class="space-y-2 border border-base-300 rounded-box p-2">
                    <p><span class="font-semibold text-sm">Nom: </span>{{ allSpecialitys.department.name }}</p>
                    <p><span class="font-semibold text-sm">Abreviation: </span>{{ allSpecialitys.department.abbreviation }}</p>
                    
                    <h1 class="text-lg text-base-content/50">Administrateur</h1>
                    <p><span class="font-semibold text-sm">Pseudo: </span>{{ allSpecialitys.department.admin_display?.username ?? "---" }}</p>
                    <p><span class="font-semibold text-sm">Code: </span>{{ allSpecialitys.department.admin_display?.code ?? "---" }}</p>

                    <p><span class="font-semibold text-sm top-2">Nombre de Spécialité: </span>{{ allSpecialitys.specialitys.length }}</p>
                </div>

                <div v-if="is_loading.get_allSpeciality" class="flex justify-center my-5">
                    <div class=" space-x-2">
                        <LoadingIcon class="size-(--icon-size)" />
                        <span>Chargement...</span>
                    </div>
                </div>

                <!-- les specialitys -->
                <div v-if="!is_loading.get_allSpeciality" class="space-y-2 p-2">

                    <h1 class="text-xl font-semibold text-base-content/50">Toutes les spécialités</h1>

                    <div v-for="speciality in allSpecialitys.specialitys" :key="speciality.id" class="border-b border-base-300 py-2 space-y-1">
                        
                        <p><span class="font-semibold text-sm">Nom: </span>{{ speciality.name }}</p>
                        <p><span class="font-semibold text-sm">Abreviation: </span>{{ speciality.abbreviation }}</p>
                
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
import { DepartmentService, UserService } from '@/services';
import { onMounted, ref, watch } from 'vue';
import { NotificationUtil } from '@/utils';

const Notification = NotificationUtil.notificationsUtil()

const admins = ref([])
const defaulAdminSelect = ref({})
const departments = ref([])
const form = ref({
    id: null,
    name: null,
    abbreviation: null,
    admin: null,
})
const is_loading = ref({
    set_department: false,
    get_allSpeciality: false,
    get_admins: false
})
const errors = ref({
    set_department: null,
})

const search = ref({
    q: null
})
const showDepartmentModal = ref(false)

onMounted(()=>{
    get_department()
})

watch(()=> search.value.q, (q)=> {
    get_department(q)
})

function refresch_department() {
    search.value.q = null
}

function get_department(search=null){
    DepartmentService.get_department({search: search}).then((res)=> {
        departments.value = res.data
    })
}

function update_department(){
    DepartmentService.update_department(form.value).then((res)=>{
        departments.value = departments.value.map(
            department => department.id == res.data.id ? res.data : department
        )
        
        Notification.success("Modification réussir.")
    }).catch((error) => Notification.error("Une erreur innatendus s'est produit, veuillez réessayer."))
    .finally(() => {
        is_loading.value.set_department = false
        closeDepartmentModalF()
    })
}

function set_department(){
    DepartmentService.set_department(form.value).then((res)=>{
        departments.value.unshift(res.data)
        Notification.success("Ajout réussir.")
    }).catch((error) => {
        Notification.error("Une erreur innatendus s'est produit, veuillez réessayer.")
        closeDepartmentModalF()
        errors.value.set_department = error.response.data
    })
    .finally(() => {
        is_loading.value.set_department = false
    })
}

function select_admin(admin){
	form.value.admin = admin.id
}

function resetForm(){
    form.value = {
        id: null,
        name: null,
        abbreviation: null,
        admin: null,
    }

    errors.value = {
        set_department: null,
    }
}

function closeDepartmentModalF(){
    showDepartmentModal.value = false
    resetForm()
}

function showDepartmentModalF(department=null){
    showDepartmentModal.value = true
    
    if(admins.value.length < 1){
        is_loading.value.get_admins = true
        UserService.get_noStudent().then((res) => {
            admins.value = res.data
            is_loading.value.get_admins = false
        })
    }

    if (department) {
        defaulAdminSelect.value = department.admin_display
        form.value = {
            id: department.id,
            name: department.name,
            abbreviation: department.abbreviation,
            admin: department.admin
        }
    }

}

function handleSetDepartment(){
    if(!form.value.abbreviation || !form.value.name){
        Notification.error("Veuillez remplir les champs nom et abreviation.")
        return
    }

    is_loading.value.set_department = true
    if (form.value.id) {
        update_department()
    } else {
        set_department()
    }
}

// :::::::::::::::::::::::::::::::	GESTION DE L'AFFICHARGE MUTILPLE DE SPECIALITY	:::::::::::::::::::::::::::::::::::::

const allSpecialitys = ref({
    department: {},
    specialitys: [],
    showModal: false
})

function showAllSpecialityModalF(department){
    allSpecialitys.value.showModal = true

    if(allSpecialitys.value.department.id != department.id){
        allSpecialitys.value.department = department
        is_loading.value.get_allSpeciality = true

        DepartmentService.get_department({id: department.id}).then((res) => {
            is_loading.value.get_allSpeciality = false
            allSpecialitys.value.specialitys = res.data.specialitys
        })
    }
}

</script>