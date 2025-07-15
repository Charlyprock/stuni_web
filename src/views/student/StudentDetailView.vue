<template>
    <div class="flex gap-8">
        <!-- les infos personnel -->
        <div class="w-[50%] space-y-2">
            <div class="bg-base-100 p-3 border border-base-300 rounded-field">
                
                <!-- l'image, nom et matricul -->
                <div class="">
                    <!-- l'image -->
                    <div class="w-full h-16 rounded-field bg-error"></div>

                    <div class="flex items-center gap-3 -mt-5 ml-3">
                        <div class="mask mask-squircle size-[80px] bg-base-100">
                            <img :src="data.user?.image" alt="l'image de l'étudiant" class="size-full object-cover"/>
                        </div>

                        <div class="mt-5">
                            <span class="font-semibold uppercase">{{ data.user?.last_name }} </span>
                            <span> {{ data.user?.first_name }}</span>
                            <p class="opacity-60 text-sm">#{{ data.user?.code }}</p>
                        </div>
                    </div>
                </div>

                <div class="mt-5 space-y-3">
                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Email: </p>
                        <p class="text-end">{{ data.user?.email ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Téléphone: </p>
                        <p class="text-end">{{ data.user?.phone ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Addresse </p>
                        <p class="text-end">{{ data.user?.address ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Genre: </p>
                        <p class="text-end uppercase">{{ data.user?.genre ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Nationnalité: </p>
                        <p class="text-end">{{ data.user?.nationnality ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Date de naissance: </p>
                        <p class="text-end">{{ data.birth_date ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Lieux de naissance: </p>
                        <p class="text-end">{{ data.birth_place ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Travail: </p>
                        <p class="text-end">
                            <CheckIcon class=" size-(--icon-size) text-success" />
                        </p>
                    </div>
                </div>

                <!-- le bouton -->
                <div class="flex justify-end pt-5">
                    <button @click="showFormStudent"  class="btn btn-primary">Modifier</button>
                </div>
            </div>

            <!-- les fichier attacher -->
            <div class="bg-base-100 p-3 border border-base-300 rounded-field">

                <div class="flex items-center justify-between my-3">
                    <h1 class="text-xl">Fichier Attacher</h1>

                    <button class="btn btn-neutral">
                        <div>
                            <DownloadIcon class="" />
                        </div>
                        <span>Ajouter un Fichier</span>
                    </button>
                </div>

                <div class="space-y-3 mt-5">

                    <div v-for="i in 5" class="p-2 rounded-field flex justify-between items-center bg-base-200/30 border border-base-300/50">
                        <div class="flex items-center gap-2">
                            <div class="p-2 bg-base-200 rounded-field">
                                <FileIcon class="" />
                            </div>
                            
                            <div>
                                <p>Acte de Naissance</p>
                                <p class="text-sm opacity-50">10/02/2024</p>
                            </div>
                        </div>

                        <button data-tip="Télécharger le fichier" class="btn btn-neutral btn-ghost btn-sm tooltip tooltip-top">
                            <DownloadIcon class="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-[50%] space-y-2">

            <!-- les inscriptions -->
            <div class="bg-base-300 p-3 border border-base-300/80 rounded-field">

                <div class="flex items-center justify-between my-3">
                    <h1 class="text-xl">Inscriptions</h1>

                    <button class="btn btn-neutral">
                        <div>
                            <AddIcon />
                        </div>
                        <span>Ajouter une Inscription</span>
                    </button>
                </div>

                <div class="space-y-3">

                    <div v-for="enrollment in data.enrollments" class="relative overflow-hidden flex justify-between items-center px-3 py-5 bg-base-100 rounded-field border-base-300">
                        
                        <div v-if="enrollment.is_delegate" class="badge badge-soft badge-accent border border-accent absolute -top-1 -right-1">
                            Délégué
                        </div>

                        <div class="flex items-center flex-wrap gap-1">
                            
                            <p>{{ enrollment.level.abbreviation }}</p>
                            <div class="size-[5px] rounded-full bg-neutral"></div>
                            <p>{{ enrollment.speciality.abbreviation }}</p>
                            <div class="size-[5px] rounded-full bg-neutral"></div>
                            <p>{{ enrollment.classe.abbreviation }}</p>
                        </div>

                        <div class=" border-l border-base-300 pl-2">
                            {{ enrollment.year }}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>


        <!-- Modal d'afficharge des specialitys -->
        <Modal 
            v-model="student.showModal" 
            title="Modification" 
            confirm-text="Valider" 
            cancel-text="Fermer"
            :persistent="true"
            confirm-button-type="primary"
            :loading="student.is_loading"
            @confirm="validatedStudent"
            @cancel="resetFormStudent"
        >
            <div>
                <!-- l'image -->
                <div class="flex justify-center">
                    <div class="size-[150px] bg-base-100 p-(--padding-box) rounded-full border border-base-300">
                        <div class="size-full">
                            <ImageUploader ref="uploaderComponent" 
                                :default-image-url="data.user?.image" 
                                :max-size-m-b="5"
                                :max-width="800" 
                                :max-height="800" 
                                :allowed-formats="['jpg', 'jpeg', 'png', 'webp']" 
                                :quality="0.9"
                                :auto-resize="true" 
                                :show-image-info="false" 
                                alt="Photo de profil" 
                                @image-changed="onImageChanged"
                                @image-removed="onImageRemoved" 
                                @error="onImageError" 
                            />
                        </div>
                    </div>
                </div>

                <!-- autre info -->
				<fieldset class="fieldset w-full bg-base-100 p-4 rounded-box border border-base-300">
					<legend class="fieldset-legend">Information Personnel</legend>

					<!-- <label class="label">Matricule</label>
					<label class="label text-success text-xm">Pas requis, calculé automatiquement.</label>
					<input type="text" class="input w-full validator" 
						maxlength="20" 
						placeholder="STU2025GL0001"
						v-model="student.form.code"
					/>
					<p v-for="error in student.errors['code']" class="text-error text-start">{{ error }}</p> -->

					<label class="label">Nom <span class="text-error text-lg">*</span></label>
					<input v-model="student.form.last_name" type="text" class="input w-full" placeholder="KOLO" required />
					<p v-for="error in student.errors['last_name']" class="text-error text-start">{{ error }}</p>

					<label class="label">Prénom <span class="text-error text-lg">*</span></label>
					<input v-model="student.form.first_name" type="text" class="input w-full" placeholder="Toto" required />
					<p v-for="error in student.errors['first_name']" class="text-error text-start">{{ error }}</p>

					<fieldset class="fieldset flex gap-3">
						<legend class="fieldset-legend">genre</legend>

						<label class="label" for="maxculin">Maxculin</label>
						<input v-model="student.form.genre" id="maxculin" type="radio" name="radio-1" class="radio" value="m" />

						<label class="label" for="feminin">Féminin</label>
						<input v-model="student.form.genre" id="feminin" type="radio" name="radio-1" class="radio" value="f" />
					</fieldset>
					<p v-for="error in student.errors['genre']" class="text-error text-start">{{ error }}</p>

					<label class="label">Email</label>
					<input v-model="student.form.email" type="text" class="input w-full" placeholder="example@gmail.com" />
					<p v-for="error in student.errors['email']" class="text-error text-start">{{ error }}</p>

					<label class="label">Tel</label>
					<input type="text" class="input w-full validator" 
						v-model="student.form.phone"
						maxlength="13"
						minlength="9"
						placeholder="6-- -- -- --" 
					/>
					<p v-for="error in student.errors['phone']" class="text-error text-start">{{ error }}</p>

					<label class="label">Addresse</label>
					<input v-model="student.form.address" type="text" class="input w-full" placeholder="Douala" />
					<p v-for="error in student.errors['address']" class="text-error text-start">{{ error }}</p>

					<label class="label">Nationnalité</label>
					<input v-model="student.form.nationnality" type="text" class="input w-full" placeholder="Cameroun" />
					<p v-for="error in student.errors['nationnality']" class="text-error text-start">{{ error }}</p>

					<label class="label">Date de naissance</label>
					<input v-model="student.form.birth_date" type="date" class="input w-full" placeholder="Douala" />
					<p v-for="error in student.errors['birth_date']" class="text-error text-start">{{ error }}</p>

					<label class="label">Lieux de naissance</label>
					<input v-model="student.form.birth_place" type="text" class="input w-full" placeholder="Douala" />
					<p v-for="error in student.errors['birth_place']" class="text-error text-start">{{ error }}</p>

					<label class="label my-2">
						<input v-model="student.form.is_work" type="checkbox" class="toggle" />
						Travaille
					</label>
					<p v-for="error in student.errors['is_work']" class="text-error text-start">{{ error }}</p>

				</fieldset>
            </div>
        </Modal>
    </div>
</template>

<script setup>
import { 
	PasswordIcon, DirectionIcon, 
	CheckIcon, DownloadIcon, FileIcon, LoadingIcon,
	HiddenPasswordIcon, VuePasswordIcon,
} from '@/components/icons';
import SelectFilter from '@/components/SelectFilterComponent.vue';
import Modal from '@/components/ModalComponent.vue'
import ImageUploader from '@/components/ImageUploaderComponent.vue';
import { useFilters } from '@/composables/useFiltersComposable'
import { usePargination } from '@/composables/useParginationComposable';
import { useCheckbox } from '@/composables/useCheckboxComposable';
import { useUnivercityYearStore } from '@/stores/yearStore';
import { StudentService } from '@/services';
import { onMounted, ref, watch, computed } from 'vue';
import { NotificationUtil, ValidatedUtil } from '@/utils';
import { useRoute } from 'vue-router';

const route = useRoute()
const Notification = NotificationUtil.notificationsUtil()

const uploaderComponent = ref(null)
const data = ref({})

onMounted(() => {
    
    StudentService.getStudents({id: route.params.id}).then((res) => {
        data.value = res.data
    })
})

const student = ref({
    showModal: false,
    form : {
        email: null,
        first_name: null,
        last_name: null,
        // code: null,
        phone: null,
        address: null,
        genre: null,
        nationnality: null,
        image: null,
        birth_date: null,
        birth_place: null,
        is_work: null,
    },
    updateImage: false,
    is_loading: false,
    errors: {}
})

function onImageChanged(data) {
	student.value.form.image = data.file
}

function onImageRemoved() {
	student.value.form.image = null
}

function onImageError(error) {
	Notification.error(error, 'Erreur lors du traitement de l\'image.')
}

function resetImage(){
	if(uploaderComponent.value){
		uploaderComponent.value.reset()
	}
}

function showFormStudent(){
    student.value.form = {
        email: data.value.user?.email,
        first_name: data.value.user?.first_name,
        last_name: data.value.user?.last_name,
        // code: data.value.user?.code,
        phone: data.value.user?.phone,
        address: data.value.user?.address,
        genre: data.value.user?.genre,
        nationnality: data.value.user?.nationnality,
        image: data.value.user?.image,
        birth_date: data.value.birth_date,
        birth_place: data.value.birth_place,
        is_work: data.value.is_work,
    }
    student.value.showModal = true
}

function resetFormStudent(){
    student.value.showModal = false
    resetImage()
	student.value.form = ValidatedUtil.clearFormData(student.value.form)
}

function validatedStudent(){
	const result = ValidatedUtil.processForm(ValidatedUtil.validationRules, student.value.form)
	student.value.errors = result.errors
    console.log(result.errors)
	if(result.success){
		updateStudent(result.formData)
	} else {
		Notification.error("error", "erreur du formulaire.")
	}
}

function updateStudent(formData){
	// student.value.is_loading = true
	
	StudentService.updateStudent(data.value.id, formData).then((res) => {
        data.value = res.data
        resetFormStudent()
		Notification.success("Etudiant enregitré avec succes.")
	}).catch((error) => {
		Notification.error("Erreur lors de la sauvegade des données.")
		student.value.errors = error.response.data
	}).finally(() => student.value.is_loading = false)
}


</script>