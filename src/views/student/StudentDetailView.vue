<template>
    <div class="flex gap-8">
        <!-- les infos personnel et attachement -->
        <div class="w-[50%] space-y-2">

            <!-- les infos personnel -->
            <div class="bg-base-100 p-3 border border-base-300 rounded-field">
                
                <!-- l'image, nom et matricul -->
                <div class="">
                    <!-- l'image -->
                    <div class="w-full h-16 rounded-field" :style="{ backgroundImage: stringToGradient(data.student.user?.code) }"></div>

                    <div class="flex items-center gap-3 -mt-5 ml-3">
                        <div class="mask mask-squircle size-[80px] bg-base-100">
                            <img :src="data.student.user?.image" alt="l'image de l'étudiant" class="size-full object-cover"/>
                        </div>

                        <div class="mt-5">
                            <span class="">{{ data.student.user?.last_name }} </span> <span> {{ data.student.user?.first_name }}</span>
                            <p class="opacity-60 text-sm flex items-center gap-2">#{{ data.student.user?.code }} <span v-if="data.student.is_work"><WorkIcon /></span></p>
                        </div>
                    </div>
                </div>

                <div class="mt-5 space-y-3">
                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Email: </p>
                        <p class="text-end">{{ data.student.user?.email ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Téléphone: </p>
                        <p class="text-end">{{ data.student.user?.phone ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Addresse </p>
                        <p class="text-end">{{ data.student.user?.address ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Genre: </p>
                        <p class="text-end uppercase">{{ data.student.user?.genre ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Nationnalité: </p>
                        <p class="text-end">{{ data.student.user?.nationnality ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Date de naissance: </p>
                        <p class="text-end">{{ data.student.birth_date ?? '---' }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="opacity-60">Lieux de naissance: </p>
                        <p class="text-end">{{ data.student.birth_place ?? '---' }}</p>
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

                    <button @click="showFormAttachment()" class="btn btn-neutral">
                        <div>
                            <DownloadIcon class="" />
                        </div>
                        <span>Ajouter un Fichier</span>
                    </button>
                </div>

                <div v-if="data.attachments.length === 0" class="text-center py-8 opacity-60">
                    <p>Aucun fichier attaché</p>
                </div>

                <div class="space-y-3 mt-5">
                    <div v-for="attachment in data.attachments" :key="attachment.id" 
                         class="p-2 rounded-field flex justify-between items-center bg-base-200/30 border border-base-300/50">
                        <div class="flex items-center gap-2">
                            <div class="p-2 bg-base-200 rounded-field">
                                <FileIcon class="" />
                            </div>
                            
                            <div>
                                <p>{{ attachment.title || attachment.file_name }}</p>
                                <p class="text-sm opacity-50">{{ DateUtil.SetformatDate(attachment.created_at) }}</p>
                                <p class="text-xs opacity-50">{{ attachment.mime_type }}</p>
                            </div>
                        </div>

                        <div class="flex items-center">
                            <button @click="downloadAttachment(attachment)" 
                                    data-tip="Télécharger le fichier" 
                                    class="btn btn-neutral btn-ghost btn-sm tooltip tooltip-top"
                                    :disabled="attachement.is_loading.download">
                                <LoadingIcon v-if="attachement.is_loading.download && attachement.current_id === attachment.id" class="animate-spin" />
                                <DownloadIcon v-else class="" />
                            </button>

                            <button @click="confirmDeleteAttachment(attachment)" 
                                    data-tip="Supprimer le fichier" 
                                    class="btn btn-error btn-ghost btn-sm tooltip tooltip-top tooltip-error">
                                <DeleteIcon class="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-[50%] space-y-2">

            <!-- les inscriptions -->
            <div class="bg-base-300 p-3 border border-base-300/80 rounded-field">

                <div class="flex items-center justify-between my-3">
                    <h1 class="text-xl">Inscriptions</h1>

                    <button @click="showFormEnrollment()" class="btn btn-neutral">
                        <div>
                            <AddIcon />
                        </div>
                        <span>Ajouter une Inscription</span>
                    </button>
                </div>

                <div class="space-y-3">

                    <div v-for="enrollment in data.enrollments" class="relative overflow-hidden px-3 py-3 bg-base-100 rounded-field border-base-300">
                        
                        <div v-if="enrollment.is_delegate" class="badge badge-soft badge-accent border border-accent absolute -top-1 -right-1">
                            Délégué
                        </div>
                        
                        <div class="flex justify-between items-center">
                            <div class="flex items-center flex-wrap gap-1">
                                <div>
                                    <p class="text-[10px]">Niveaux</p>
                                    <p>{{ enrollment.level_display.abbreviation }}</p>
                                </div>
                                <div class="size-[5px] rounded-full bg-neutral"></div>
                                <div>
                                    <p class="text-[10px]">Spécialité</p>
                                    <p>{{ enrollment.speciality_display.abbreviation }}</p>
                                </div>
                                <div class="size-[5px] rounded-full bg-neutral"></div>
                                <div>
                                    <p class="text-[10px]">Classe</p>
                                    <p>{{ enrollment.classe_display.abbreviation }}</p>
                                </div>
                            </div>

                            <div class=" border-l border-base-300 pl-2">
                                {{ enrollment.year }}
                            </div>
                        </div>

                        <div class="flex justify-end">
                            <button @click="showFormEnrollment(enrollment)" data-tip="Editer" class="btn btn-accent btn-xs tooltip tooltip-top">
                                <EditIcon class="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>


        <!-- Modal d'édition de l'etudient -->
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
                                :default-image-url="data.student.user?.image" 
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

        <!-- Modal d'ajout/edition des inscriptions -->
        <Modal 
            v-model="enrollment.showModal" 
            title="Inscription" 
            confirm-text="Valider" 
            cancel-text="Fermer"
            :persistent="true"
            confirm-button-type="primary"
            :loading="enrollment.is_loading"
            @confirm="validatedEnrollment"
            @cancel="resetFormEnrollment"
        >
            <div>
                <fieldset class="fieldset w-full space-y-3 h-fit bg-base-100 p-4 rounded-box border border-base-300">
                    <legend class="fieldset-legend">Information inscription <span class="text-error text-lg">*</span></legend>

                    <!-- Niveau -->
                    <SelectFilter 
                        :values="levels"
                        :defaultSelect="select.level"
                        name="Niveau"
                        :loading="loading.level"
                        @select-value="select_level"
                    />
                    <p v-for="error in enrollment.errors['level']" class="text-error text-start">{{ error }}</p>

                    <!-- specialité -->
                    <SelectFilter
                        :values="specialitys"
                        :defaultSelect="select.speciality"
                        name="Spécialité"
                        :loading="loading.speciality"
                        @select-value="select_speciality"
                    />
                    <p v-for="error in enrollment.errors['speciality']" class="text-error text-start">{{ error }}</p>

                    <!-- classe -->
                    <SelectFilter 
                        :values="classes"
                        :defaultSelect="select.classe"
                        name="Classe"
                        :loading="loading.classe"
                        @select-value="select_classe"
                    />
                    <p v-for="error in enrollment.errors['classe']" class="text-error text-start">{{ error }}</p>

                    <label class="label">Année acardemic</label>
                    <input v-model="enrollment.form.year" type="text" class="input w-full validator" 
                        pattern="(?=.*\d).{9,}"
                        maxlength="9" 
                        placeholder="2024/2025" 
                        required
                    />
                    <p v-for="error in enrollment.errors['year']" class="text-error text-start">{{ error }}</p>

                    <label class="label my-2">
                        <input v-model="enrollment.form.is_delegate" value="true" type="checkbox" class="toggle" />
                        Délégué
                    </label>
                    <p v-for="error in enrollment.errors['is_delegate']" class="text-error text-start">{{ error }}</p>
                </fieldset>
            </div>
        </Modal>

        <!-- Modal d'ajout d'attachement -->
        <Modal 
            v-model="attachement.showModal.upload" 
            title="Ajouter un fichier" 
            confirm-text="Enregistrer" 
            cancel-text="Fermer"
            :persistent="true"
            confirm-button-type="primary"
            :loading="attachement.is_loading.upload"
            @confirm="validatedAttachment"
            @cancel="resetFormAttachment"
        >
            <div>
                <fieldset class="fieldset w-full bg-base-100 p-4 rounded-box border border-base-300">
                    <legend class="fieldset-legend">Information du fichier <span class="text-error text-lg">*</span></legend>

                    <label class="label">Titre du document <span class="text-error text-lg">*</span></label>
                    <input v-model="attachement.form.title" type="text" class="input w-full" 
                           placeholder="Ex: Acte de naissance, Certificat médical..." required />
                    <p v-for="error in attachement.errors['title']" class="text-error text-start">{{ error }}</p>

                    <label class="label">Fichier <span class="text-error text-lg">*</span></label>
                    <input @change="onFileSelected" type="file" class="file-input file-input-bordered w-full" 
                           accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" />
                    <div class="text-sm opacity-60 mt-2">
                        Formats acceptés: PDF, DOC, DOCX, JPG, PNG, WEBP (Max: 10MB)
                    </div>
                    <p v-for="error in attachement.errors['file']" class="text-error text-start">{{ error }}</p>
                </fieldset>
            </div>
        </Modal>

        <!-- modal de suppresion des attachments -->
        <Modal
			v-model="attachement.showModal.delete"
			title="Supprimer ce fichier"
			message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce fichier ?"
			confirm-text="Supprimer"
			cancel-text="Conserver"
			confirm-button-type="danger"
			:loading="attachement.is_loading.delete"
			@confirm="handleDeleteAttachment"
		/>
    </div>
</template>

<script setup>
import { 
	WorkIcon, EditIcon, DeleteIcon, AddIcon,
	CheckIcon, DownloadIcon, FileIcon, LoadingIcon,
	HiddenPasswordIcon, VuePasswordIcon,
} from '@/components/icons';
import SelectFilter from '@/components/SelectFilterComponent.vue';
import Modal from '@/components/ModalComponent.vue'
import ImageUploader from '@/components/ImageUploaderComponent.vue';
import { useFilters } from '@/composables/useFiltersComposable'
import { StudentService } from '@/services';
import { onMounted, ref, watch, computed } from 'vue';
import { NotificationUtil, ValidatedUtil, DateUtil } from '@/utils';
import { useRoute } from 'vue-router';

const route = useRoute()
const Notification = NotificationUtil.notificationsUtil()

const uploaderComponent = ref(null)
const data = ref({
    student: {},
    enrollments: [],
    attachments: []
})

function stringToGradient(str) {
    if (str){
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash)
        }

        // Extraire deux couleurs à partir du hash
        const color1 = '#' + ((hash >> 8) & 0xffffff).toString(16).padStart(6, '0')
        const color2 = '#' + (hash & 0xffffff).toString(16).padStart(6, '0')

        return `linear-gradient(135deg, ${color1}, ${color2})`
    }
}


onMounted(() => {
    fetchStudentData()
})

function fetchStudentData() {
    StudentService.getStudents({id: route.params.id}).then((res) => {
        data.value.student = res.data
        data.value.enrollments = res.data.enrollments
        data.value.attachments = res.data.attachments || []
    })
}

// ::::::::::::::::::::::::::::::::: INFO DE BASE :::::::::::::::::::::::::::::::::::::::::::::
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
    student.value.updateImage = true
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
        student.value.form.image = null
	}
}

function showFormStudent(){
    student.value.form = {
        email: data.value.student.user?.email,
        first_name: data.value.student.user?.first_name,
        last_name: data.value.student.user?.last_name,
        // code: data.value.student.user?.code,
        phone: data.value.student.user?.phone,
        address: data.value.student.user?.address,
        genre: data.value.student.user?.genre,
        nationnality: data.value.student.user?.nationnality,
        image: data.value.student.user?.image,
        birth_date: data.value.student.birth_date,
        birth_place: data.value.student.birth_place,
        is_work: data.value.student.is_work,
    }
    student.value.showModal = true
}

function resetFormStudent(){
    student.value.showModal = false
    resetImage()
	student.value.form = ValidatedUtil.clearFormData(student.value.form)
}

function validatedStudent(){
    if (!student.value.form.image || !student.value.updateImage) {
        delete student.value.form.image
    }
	const result = ValidatedUtil.processForm(ValidatedUtil.validationRules, student.value.form)
	student.value.errors = result.errors
    
	if(result.success){
		updateStudent(result.formData)
	} else {
		Notification.error("error", "erreur du formulaire.")
	}
}

function updateStudent(formData){
	student.value.is_loading = true
	
	StudentService.updateStudent(data.value.student.id, formData).then((res) => {
        data.value.student = res.data
        resetFormStudent()
		Notification.success("Etudiant enregitré avec succes.")
	}).catch((error) => {
		Notification.error("Erreur lors de la sauvegade des données.")
		student.value.errors = error.response.data
	}).finally(() => student.value.is_loading = false)
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::: INFO SUR LES INSCRIPTION :::::::::::::::::::::::::::::::::::::::
const enrollment = ref({
    showModal: false,
    form : {
        speciality: null,
        level: null,
        classe: null,
        student: null,
        year: null,
        is_delegate: false
    },
    is_loading: false,
    errors: {}
})

const {
    formId,
    select,
    levels,
    specialitys,
    classes,
    loading,
    select_level,
    select_speciality,
    select_classe,
} = useFilters({ defaultSelectFirst: true })

function showFormEnrollment(enroll=null){
    if(enroll){
        enrollment.value.form = {
            id: enroll.id,
            speciality: enroll.speciality_display.id,
            level: enroll.level_display.id,
            classe: enroll.classe_display.id,
            year: enroll.year,
            is_delegate: enroll.is_delegate
        }

        select.value = {
            speciality: enroll.speciality_display,
            level: enroll.level_display,
            classe: enroll.classe_display,
        }
    }
    enrollment.value.form.student = data.value.student.id
    enrollment.value.showModal = true
}

function resetFormEnrollment(){
    enrollment.value.showModal = false
    resetImage()
	enrollment.value.form = ValidatedUtil.clearFormData(enrollment.value.form)
    enrollment.value.form.is_delegate = false
}

function validatedEnrollment(){
	const result = ValidatedUtil.processForm(ValidatedUtil.validationRules, {year: enrollment.value.form.year})
	enrollment.value.errors = result.errors
    
	if(result.success){
        enrollment.value.form.speciality = select.value.speciality.id
        enrollment.value.form.level = select.value.level.id
        enrollment.value.form.classe = select.value.classe.id
        
        if (enrollment.value.form.id) {
            updateEnrollment(enrollment.value.form)
        } else {
            setEnrollment(enrollment.value.form)
        }
	} else {
		Notification.error("error", "erreur du formulaire.")
	}
}

function setEnrollment(formData){
	enrollment.value.is_loading = true
	
	StudentService.setEnrollment(formData).then((res) => {
        data.value.enrollments.unshift(res.data)
        resetFormEnrollment()
		Notification.success("Inscription enregister avec succes.")
	}).catch((error) => {
		enrollment.value.errors = error.response.data
        if (error.response.data?.non_field_errors) {
            Notification.error("Une inscription pour cette spécialité et pour cet étudiant existe dejat.")
        } else {   
		    Notification.error("Une erreur s'est produit lors de l'enregistrement, verifiez les informations et reéssayez.")
        }
	}).finally(() => enrollment.value.is_loading = false)
}

function updateEnrollment(formData){
	enrollment.value.is_loading = true
	
	StudentService.updateEnrollment(formData.id, formData).then((res) => {
        data.value.student = res.data
        data.value.enrollments = data.value.enrollments.map(
            enroll => enroll.id == res.data.id ? res.data : enroll
        )
        resetFormEnrollment()
		Notification.success("Inscription modifié avec succes.")
	}).catch((error) => {
		enrollment.value.errors = error.response.data
        if (error.response.data?.non_field_errors) {
            Notification.error("Une inscription pour cette spécialité et pour cet étudiant existe dejat.")
        } else {   
		    Notification.error("Une erreur s'est produit lors de l'enregistrement, verifiez les informations et reéssayez.")
        }
	}).finally(() => enrollment.value.is_loading = false)
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::: GESTION DES ATTACHMENTS :::::::::::::::::::::::::::::::::::::::

const attachement = ref({
    showModal: {
        upload: false,
        delete: false,
    },
    form : {
        file: null,
        title: null,
        student: null,
    },
    is_loading: {
        upload: false,
        delete: false,
        download: false,
    },
    current_id: null,
    current_attachment: null,
    errors: {}
})


function showFormAttachment() {
    attachement.value.form.student = data.value.student.id
    attachement.value.showModal.upload = true
}

function resetFormAttachment() {
    attachement.value.showModal.upload = false
    attachement.value.form = ValidatedUtil.clearFormData(attachement.value.form)
    attachement.value.errors = {}
}

// Gérer la sélection de fichier
function onFileSelected(event) {
    const file = event.target.files[0]
    if (file) {
        // Vérifier la taille du fichier (10MB max)
        const maxSize = 10 * 1024 * 1024 // 10MB en bytes
        if (file.size > maxSize) {
            Notification.error("Le fichier est trop volumineux. Taille maximum: 10MB")
            event.target.value = ''
            return
        }
        
        // Vérifier le type de fichier
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp'
        ]
        
        if (!allowedTypes.includes(file.type)) {
            Notification.error("Type de fichier non supporté.")
            event.target.value = ''
            return
        }
        
        attachement.value.form.file = file
    }
}

// Valider et soumettre l'attachement
function validatedAttachment() {
    attachement.value.errors = {}
    
    if (!attachement.value.form.title || attachement.value.form.title.trim() === '') {
        attachement.value.errors.title = ['Le titre est requis']
    }
    
    if (!attachement.value.form.file) {
        attachement.value.errors.file = ['Veuillez sélectionner un fichier']
    }
    
    // Si pas d'erreurs, on procède à l'upload
    if (Object.keys(attachement.value.errors).length === 0) {
        uploadAttachment()
    } else {
        Notification.error("Veuillez corriger les erreurs du formulaire.")
    }
}

// Upload du fichier
function uploadAttachment() {
    attachement.value.is_loading.upload = true
    
    const formData = new FormData()
    formData.append('title', attachement.value.form.title)
    formData.append('file', attachement.value.form.file)
    formData.append('student', attachement.value.form.student)
    
    StudentService.uploadAttachment(formData).then((res) => {
        data.value.attachments.unshift(res.data)
        resetFormAttachment()
        Notification.success("Fichier ajouté avec succès.")
    }).catch((error) => {
        attachement.value.errors = error.response?.data || {}
        Notification.error("Erreur lors de l'ajout du fichier.")
    }).finally(() => {
        attachement.value.is_loading.upload = false
    })
}

// Confirmer la suppression d'un attachement
function confirmDeleteAttachment(attachment) {
    attachement.value.current_attachment = attachment
    attachement.value.showModal.delete = true
}

// Supprimer l'attachement
function handleDeleteAttachment() {
    if (!attachement.value.current_attachment) return
    
    attachement.value.is_loading.delete = true
    
    StudentService.deleteAttachment(attachement.value.current_attachment.id).then(() => {
        data.value.attachments = data.value.attachments.filter(
            att => att.id !== attachement.value.current_attachment.id
        )
        attachement.value.showModal.delete = false
        attachement.value.current_attachment = null
        Notification.success("Fichier supprimé avec succès.")
    }).catch((error) => {
        Notification.error("Erreur lors de la suppression du fichier.")
    }).finally(() => {
        attachement.value.is_loading.delete = false
    })
}

function downloadAttachment(attachment) {
    attachement.value.is_loading.download = true
    attachement.value.current_id = attachment.id
    
    StudentService.downloadAttachment(attachment.id).then((response) => {
        // Créer un lien de téléchargement
        const blob = new Blob([response.data], { 
            type: response.headers['content-type'] || 'application/octet-stream' 
        })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        
        // Récupérer le nom du fichier depuis les headers ou utiliser le titre
        const contentDisposition = response.headers['content-disposition']
        let filename = attachment.file_name || attachment.title
        
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
            if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1].replace(/['"]/g, '')
            }
        }
        
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        
        // Nettoyer
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        Notification.success("Téléchargement démarré.")
    }).catch((error) => {
        Notification.error("Erreur lors du téléchargement du fichier.")
    }).finally(() => {
        attachement.value.is_loading.download = false
        attachement.value.current_id = null
    })
}

</script>