<template>
	<div class="container">
		<button @click="showSpecialityModalF()" data-tip="Nouveaux Niveau" class="btn btn-neutral tooltip tooltip-left btn-sm text-nowrap">
			<AddIcon class="size-(--icon-size)" />
		</button>

		<!-- Modal avec contenu personnalisé -->
        <Modal 
            v-model="setSpecialitys.showModal" 
            title="Formulaire personnalisé" 
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

	</div>
</template>

<script setup>
import { 
	AddIcon, CloseIcon, MenuIcon, EditIcon, DeleteIcon,
} from '@/components/icons';
import SelectFilter from '@/components/SelectFilterComponent.vue';
import Modal from '@/components/ModalComponent.vue'
import { LevelService, SpecialityService } from '@/services';
import { onMounted, ref, computed } from 'vue';


const is_loading = ref({
	get_speciality: false,
	set_speciality: false
})
const errors = ref({
    set_level: null,
    set_speciality: null,
})

// :::::::::::::::::::::::::::::::	GESTION DE L'AJOUT MUTILPLE DE SPECIALITY	:::::::::::::::::::::::::::::::::::::

const setSpecialitys = ref({
	selectedItems: [],
	specialitySelect: {},
	specialitys: [],
	showModal: false
})

function showSpecialityModalF(){
	setSpecialitys.value.showModal = true

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
	errors.value.set_speciality = null
}

function submitSetSpeciality(){
	const ids = {
		specialitys: setSpecialitys.value.selectedItems.map(item => item.id)
	}

	if(ids.specialitys.length > 0){
		
		is_loading.value.set_speciality = true
		LevelService.set_specialitys(1, ids).then((res)=> {
			is_loading.value.set_speciality = false
			closeSpecialityModalF()
		}).catch((error) => {
			errors.value.set_speciality = error.response.data
			is_loading.value.set_speciality = false
		})
	}
}

// :::::::::::::::::::::::::::::::	GESTION DE L'AJOUT MUTILPLE DE SPECIALITY	:::::::::::::::::::::::::::::::::::::

</script>