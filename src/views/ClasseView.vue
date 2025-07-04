<template>
    <div class="flex flex-col gap-5">

        <!-- bare de recherche, titre, et bouton ajouter -->
        <header class="w-full bg-base-100f borderf border-base-300 flex justify-between items-center p-3 rounded-box">

            <!-- title -->
            <h1 class="text-xl text-nowrap">Liste des Classe</h1>

            <div class="flex gap-3 items-center">
                <button @click="showClasseModalF()" data-tip="Nouvelle Classe" class="btn btn-neutral tooltip tooltip-left btn-sm text-nowrap">
                    <AddIcon class="size-(--icon-size)" />
                </button>

                <label class="input w-full">
                    <SearchIcon :class-props="'h-[1em] opacity-50'" />
                    <input type="text" placeholder="Recherche" id="input_search" v-model="search.q" />
                </label>

                <button @click="refresch_classe" :disabled="!search.q" class="btn btn-accent tooltip tooltip-left"
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
                            <th>Spécialitée</th>
                            <th>Délégué</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="(classe, i) in classes" :key="classe.id">
                            <th>{{ i + 1 }}</th>
                            <td><p class="text-nowrap text-ellipsis max-w-[90%] overflow-hidden">{{ classe.name }}</p></td>
                            <td><p class="text-nowrap text-ellipsis max-w-[90%] overflow-hidden">{{ classe.abbreviation }}</p></td>
                            <td>
                                <div>
                                    <p class="text-nowrap text-ellipsis max-w-[90%] overflow-hidden">{{ classe.speciality_display?.name ?? "---" }}</p>
                                    <p class="opacity-60">{{ classe.speciality_display?.abbreviation ?? "---" }}</p>
                                </div>
                            </td>

                            <td>
                                <div>
                                    <p>{{ classe.delegate?.username ?? "---" }}</p>
                                    <p class="opacity-60">#{{ classe.delegate?.code ?? "---" }}</p>
                                </div>
                            </td>
                            <td>
                                <div class="flex gap-3">
                                    <button @click="showClasseModalF(classe)" data-tip="Editer" class="btn btn-accent btn-sm tooltip tooltip-top">
                                        <EditIcon class="size-(--icon-size)" />
                                    </button>

                                    <button @click="showDelegateModalF(classe)" class="btn btn-primary btn-sm btn-soft">
                                        <AddIcon class="size-(--icon-size)" />
                                        Délégué
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
            v-model="showClasseModal" 
            title="Classe" 
            confirm-text="Sauvegarder" 
            cancel-text="Fermer"
            confirm-button-type="primary"
            :loading="is_loading.set_classe"
            @confirm="handleSetClasse"
            @cancel="resetForm"
        >
            <form class="space-y-4">
                
                <div>
                    <SelectFilter
                        :values="specialitys" 
                        name="Spécialité"
                        :loading="is_loading.get_speciality"
                        :defaultSelect="defaulSpecialitySelect"
                        @select-value="select_speciality"
					/>
                </div>

                <label class="label">Nom</label>
                <input v-model="form.name" type="text" required class="input w-full" placeholder="Nom" />
                <p v-for="error in errors.set_classe?.['name']" class="text-error text-start text-xs">{{ error }}</p>

                <label class="label">Abreviation</label>
                <input v-model="form.abbreviation" type="text" required class="input w-full" placeholder="Abreviation" />
                <p v-for="error in errors.set_classe?.['abbreviation']" class="text-error text-start text-xs">{{ error }}</p>
     
            </form>
        </Modal>

        <!-- Modal de changement de délégué -->
        <Modal 
            v-model="delegate.showModal"
            :title="`Classe: ${delegate.classe.name}`" 
            confirm-text="Sauvegarder" 
            cancel-text="Fermer"
            :persistent="true"
            confirm-button-type="primary"
            :loading="is_loading.set_delegate"
            @confirm="set_delegate"
        >
            <div class="space-y-2">
                <div class="space-y-2 border border-base-300 rounded-box p-2">
                    <h1 class="text-lg text-base-content/50">Délégué</h1>
                    <p><span class="font-semibold text-xs">Nom: </span>{{ delegate.classe.delegate?.last_name ?? "---" }}</p>
                    <p><span class="font-semibold text-xs">Prénom: </span>{{ delegate.classe.delegate?.first_name ?? "---" }}</p>
                    <p><span class="font-semibold text-xs">Matricule: </span>{{ delegate.classe.delegate?.code ?? "---" }}</p>
                </div>
                <p v-if="delegate.delegates.length < 1" class="text-error">Aucun étudiant pour cette classe pour le moment.</p>
                <div>
                    <SelectFilter
                        :values="delegate.delegates" 
                        name="Délégué"
                        :loading="is_loading.get_delegate"
                        :defaultSelect="delegate.classe.delegate"
                        defaulField="username"
                        @select-value="select_delegate"
					/>
                </div>

                <!-- le nouveau délégué -->
                 <div class="space-y-2 border border-base-300 rounded-box p-2">
                    <h1 class="text-lg text-base-content/50">Nouveau Délégué</h1>
                    <p><span class="font-semibold text-xs">Nom: </span>{{ delegate.newDelegate?.last_name ?? "---" }}</p>
                    <p><span class="font-semibold text-xs">Prénom: </span>{{ delegate.newDelegate?.first_name ?? "---" }}</p>
                    <p><span class="font-semibold text-xs">Matricule: </span>{{ delegate.newDelegate?.code ?? "---" }}</p>
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
import { useUnivercityYearStore } from '@/stores/yearStore';
import { DepartmentService, SpecialityService, ClasseService } from '@/services';
import { onMounted, ref, watch } from 'vue';
import { NotificationUtil } from '@/utils';

const Notification = NotificationUtil.notificationsUtil()
const yearStore = useUnivercityYearStore()

const classes = ref([])
const departments = ref([])
const departmentFilter = ref({})
const defaulSpecialitySelect = ref({})
const specialitys = ref([])
const form = ref({
    id: null,
    name: null,
    abbreviation: null,
    speciality: null,
})
const is_loading = ref({
    set_classe: false,
    set_delegate: false,
    get_delegate: false,
    get_department: false,
    get_speciality: false
})
const errors = ref({
    set_classe: null,
})

const search = ref({
    q: null
})
const showClasseModal = ref(false)

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

watch(
    [() => yearStore.currentYear, () => search.value.q], 
    ([year, q])=> {

    if(!q){
        get_classe()
    } else {
        get_classe(q, null)
    }

})

watch(()=> departmentFilter.value, (department)=> {
    get_classe()
})

function refresch_classe() {
    search.value.q = null
}

function get_classe(search=null, department=departmentFilter.value){
    ClasseService.get_classe({search: search,  department: department}).then((res)=> {
        classes.value = res.data
    })
}

function update_classe(){
    ClasseService.update_classe(form.value).then((res)=>{
        classes.value = classes.value.map(
            classe => classe.id == res.data.id ? res.data : classe
        )
        
        Notification.success("Modification réussir.")
    }).catch((error) => Notification.error("Une erreur innatendus s'est produit, veuillez réessayer."))
    .finally(() => {
        is_loading.value.set_classe = false
        closeClasseModalF()
    })
}

function set_classe(){
    ClasseService.set_classe(form.value).then((res)=>{
        classes.value.unshift(res.data)
        closeClasseModalF()
        Notification.success("Ajout réussir.")
    }).catch((error) => {
        Notification.error("Une erreur innatendus s'est produit, veuillez réessayer.")
        errors.value.set_classe = error.response.data
    })
    .finally(() => {
        is_loading.value.set_classe = false
    })
}

function select_speciality(speciality){
	form.value.speciality = speciality.id
}

function select_departmentFilter(department){
	departmentFilter.value = department.id
}

function resetForm(){
    form.value = {
        id: null,
        name: null,
        abbreviation: null,
        speciality: null,
    }
    defaulSpecialitySelect.value = []
    errors.value = {
        set_classe: null,
    }
}

function closeClasseModalF(){
    showClasseModal.value = false
    resetForm()
}

function showClasseModalF(classe=null){
    showClasseModal.value = true

    if (classe) {
        defaulSpecialitySelect.value = classe.speciality_display
        form.value = {
            id: classe.id,
            name: classe.name,
            abbreviation: classe.abbreviation,
            speciality: classe.speciality
        }
    }

    if(specialitys.value.length < 1){
        is_loading.value.get_speciality = true

        SpecialityService.get_speciality().then((res) => {
            is_loading.value.get_speciality = false
            specialitys.value = res.data
        })
    }

}

function handleSetClasse(){
    if(!form.value.abbreviation || !form.value.name || !form.value.speciality){
        Notification.error("Veuillez remplir tous les champs.")
        return
    }

    is_loading.value.set_classe = true
    if (form.value.id) {
        update_classe()
    } else {
        set_classe()
    }
}

// :::::::::::::::::::::::::::::::	GESTION DE MODIFICATION DU DELEGUE	:::::::::::::::::::::::::::::::::::::

const delegate = ref({
    classe: {},
    delegates: [],
    newDelegate: {},
    showModal: false
})

function showDelegateModalF(classe){
    delegate.value.showModal = true

    if(delegate.value.classe.id != classe.id){
        delegate.value.classe = classe
        is_loading.value.get_delegate = true

        ClasseService.get_students(classe.id).then((res) => {
            is_loading.value.get_delegate = false
            delegate.value.delegates = res.data
        })
    }
}

function closeDelegateModalF(){
    delegate.value.showModal = false
    delegate.value.newDelegate = {}
}

function select_delegate(deleg){
	delegate.value.newDelegate = deleg
}

function set_delegate(){
    is_loading.value.set_delegate = true
    const data = {student: delegate.value.newDelegate.id}

    ClasseService.set_delegate(delegate.value.classe.id, data).then((res) => {
        is_loading.value.set_delegate = false
        classes.value = classes.value.map( classe => {
            if (classe.id == delegate.value.classe.id){
                classe.delegate = res.data
            }
            return classe
        })

        Notification.success("Opération réussir.")
    }).catch((error) => {
        Notification.error("Une erreur innatendus s'est produit, veuillez réessayer.")
    })
    .finally(() => {
        closeDelegateModalF()
    })
}

</script>