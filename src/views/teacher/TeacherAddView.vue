<template>
    <form @submit.prevent="validated" class="flex flex-col gap-5">
		<!-- bare de recherche, titre, et bouton ajouter -->
		<header class="w-full bg-base-100 border border-base-300 flex justify-between items-center p-3 rounded-box">

			<!-- title -->
			<h1 class="text-xl text-nowrap">Nouveau Etudiants</h1>

			<div class="flex gap-3 items-center fixed bottom-3 right-3 p-2 bg-base-100 rounded-box border border-base-300">
				<button class="btn btn-primary" :disabled="loading.send">
					<p>Soumetre</p>
					<LoadingIcon v-if="loading.send" class="size-(--icon-size)" />
                </button>
			</div>
		</header>

		<!-- l'image -->
		<div class="flex justify-center">
			<div class="size-[250px] bg-base-100 p-(--padding-box) rounded-full border border-base-300">
				<div class="size-full">
					<ImageUploader ref="uploaderComponent" 
						:default-image-url="null" 
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

		<div class="flex justify-center gap-5">

			<!-- info personnel -->
			<div class="w-[40%] space-y-5">

				<!-- autre info -->
				<fieldset class="fieldset w-full bg-base-100 p-4 rounded-box border border-base-300">
					<legend class="fieldset-legend">Information Personnel</legend>

					<label class="label">Matricule</label>
					<label class="label text-success text-xm">Pas requis, calculé automatiquement.</label>
					<input type="text" class="input w-full validator" 
						maxlength="20" 
						placeholder="STU2025GL0001"
						v-model="form.code"
					/>
					<p v-for="error in errors['code']" class="text-error text-start">{{ error }}</p>

					<label class="label">Nom <span class="text-error text-lg">*</span></label>
					<input v-model="form.last_name" type="text" class="input w-full" placeholder="KOLO" required />
					<p v-for="error in errors['last_name']" class="text-error text-start">{{ error }}</p>

					<label class="label">Prénom <span class="text-error text-lg">*</span></label>
					<input v-model="form.first_name" type="text" class="input w-full" placeholder="Toto" required />
					<p v-for="error in errors['first_name']" class="text-error text-start">{{ error }}</p>
					
					<label class="label">Mot de passe <span class="text-error text-lg">*</span></label>
					<label class="input w-full validator">
						<input
							v-model="form.password"
                            :type="!isShowPassword ? 'password' : 'text'"
							required
							placeholder="Password"
							minlength="8"
							title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
						/>

						<button type="button" @click="togglePasswordVisibility" class="label cursor-pointer">
							<EyeIcon v-if="!isShowPassword" class=" size-(--icon-size)" />
							<EyeOffIcon v-if="isShowPassword" class=" size-(--icon-size)" />
						</button>
					</label>
					<p class="validator-hint hidden text-start">
						Doit contenir au mois 8 caractéres et inclure
						<br/>un nombre
						<br/>une lettre en majuscule
						<br/>une lettre en minuscule
					</p>
					<p v-for="error in errors['password']" class="text-error text-start">{{ error }}</p>

					<fieldset class="fieldset flex gap-3">
						<legend class="fieldset-legend">genre</legend>

						<label class="label" for="maxculin">Maxculin</label>
						<input v-model="form.genre" id="maxculin" type="radio" name="radio-1" class="radio" value="m" />

						<label class="label" for="feminin">Féminin</label>
						<input v-model="form.genre" id="feminin" type="radio" name="radio-1" class="radio" value="f" />
					</fieldset>
					<p v-for="error in errors['genre']" class="text-error text-start">{{ error }}</p>

					<label class="label">Email</label>
					<input v-model="form.email" type="text" class="input w-full" placeholder="example@gmail.com" />
					<p v-for="error in errors['email']" class="text-error text-start">{{ error }}</p>

					<label class="label">Tel</label>
					<input type="text" class="input w-full validator" 
						v-model="form.phone"
						maxlength="13"
						minlength="9"
						placeholder="6-- -- -- --" 
					/>
					<p v-for="error in errors['phone']" class="text-error text-start">{{ error }}</p>

					<label class="label">Addresse</label>
					<input v-model="form.address" type="text" class="input w-full" placeholder="Douala" />
					<p v-for="error in errors['address']" class="text-error text-start">{{ error }}</p>

					<label class="label">Nationnalité</label>
					<input v-model="form.nationnality" type="text" class="input w-full" placeholder="Cameroun" />
					<p v-for="error in errors['nationnality']" class="text-error text-start">{{ error }}</p>

					<label class="label">Date de naissance</label>
					<input v-model="form.birth_date" type="date" class="input w-full" placeholder="Douala" />
					<p v-for="error in errors['birth_date']" class="text-error text-start">{{ error }}</p>

					<label class="label">Lieux de naissance</label>
					<input v-model="form.birth_place" type="text" class="input w-full" placeholder="Douala" />
					<p v-for="error in errors['birth_place']" class="text-error text-start">{{ error }}</p>

					<label class="label my-2">
						<input v-model="form.is_work" type="checkbox" class="toggle" />
						Travaille
					</label>
					<p v-for="error in errors['is_work']" class="text-error text-start">{{ error }}</p>

				</fieldset>

			</div>

			<!-- info inscription -->
			<fieldset class="fieldset w-[40%] space-y-3 h-fit bg-base-100 p-4 rounded-box border border-base-300">
				<legend class="fieldset-legend">Information inscription <span class="text-error text-lg">*</span></legend>

				<!-- Niveau -->
				<SelectFilter 
					:values="levels" 
					name="Niveau"
					:loading="loading.level"
					@select-value="select_level"
				/>
				<p v-for="error in errors['level']" class="text-error text-start">{{ error }}</p>

				<!-- specialité -->
				<SelectFilter 
					:values="specialitys" 
					name="Spécialité"
					:loading="loading.speciality"
					@select-value="select_speciality"
				/>
				<p v-for="error in errors['speciality']" class="text-error text-start">{{ error }}</p>

				<!-- classe -->
				<SelectFilter 
					:values="classes" 
					name="Classe"
					:loading="loading.classe"
					@select-value="select_classe"
				/>
				<p v-for="error in errors['classe']" class="text-error text-start">{{ error }}</p>

				<label class="label">Année acardemic</label>
				<input v-model="form.year" type="text" class="input w-full validator" 
					pattern="(?=.*\d).{9,}"
					maxlength="9" 
					placeholder="2024/2025" 
					required
				/>
				<p v-for="error in errors['year']" class="text-error text-start">{{ error }}</p>

				<label class="label my-2">
					<input v-model="form.is_delegate" value="true" type="checkbox" class="toggle" />
					Délégué
				</label>
				<p v-for="error in errors['is_delegate']" class="text-error text-start">{{ error }}</p>
			</fieldset>
		</div>
    </form>
</template>

<script setup>
import { 
	PasswordIcon, DirectionIcon, 
	CheckIcon, LoadingIcon,
	EyeOffIcon, EyeIcon,
} from '@/components/icons';
import ImageUploader from '@/components/ImageUploaderComponent.vue';
import SelectFilter from '@/components/SelectFilterComponent.vue';
import { useFilters } from '@/composables/useFiltersComposable'
import { LevelService, SpecialityService, StudentService } from '@/services';
import { NotificationUtil, DateUtil, ValidatedUtil } from '@/utils';
import { onMounted, ref, watch } from 'vue';

const Notification = NotificationUtil.notificationsUtil()

const uploaderComponent = ref(null)
let errors = ref({})

const isShowPassword = ref(false)
const togglePasswordVisibility = () => {
    isShowPassword.value = !isShowPassword.value
}


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


const form = ref({
	email: null,
	password: null,
	first_name: null,
	last_name: null,
	code: null,
	phone: null,
	address: null,
	genre: null,
	nationnality: null,
	image: null,
	level: null,
	speciality: null,
	classe: null,
	year: null,
	is_delegate: null,
	birth_date: null,
	birth_place: null,
	is_work: null,
})

const validationRules = ref({
	email: {
		required: false,
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		message: 'Email invalide'
	},
	password: {
		required: true,
		minLength: 8,
		pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
		message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
	},
	first_name: {
		required: true,
		minLength: 2,
		maxLength: 50,
		pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
		message: 'Prénom invalide (2-50 caractères, lettres uniquement)'
	},
	last_name: {
		required: true,
		minLength: 2,
		maxLength: 50,
		pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
		message: 'Nom invalide (2-50 caractères, lettres uniquement)'
	},
	code: {
		required: false,
		pattern: /^[A-Za-z0-9]{6,20}$/,
		message: 'Code invalide (6-10 caractères alphanumériques)'
	},
	phone: {
		required: false,
		pattern: /^(\+237|237)?[2-9]\d{8}$/,
		message: 'Numéro de téléphone camerounais invalide'
	},
	address: {
		required: false,
		minLength: 10,
		maxLength: 200,
		message: 'Adresse invalide (10-200 caractères)'
	},
	genre: {
		required: false,
		options: ['M', 'F'],
		message: 'Genre requis (M, F)'
	},
	nationnality: {
		required: false,
		minLength: 2,
		maxLength: 50,
		message: 'Nationalité requise'
	},
	image: {
		required: false,
		fileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
		maxSize: 5 * 1024 * 1024, // 5MB
		message: 'Image invalide (JPEG, PNG, GIF, WebP, max 5MB)'
	},
	level: {
		required: true,
		message: 'Niveau d\'études requis'
	},
	speciality: {
		required: true,
		minLength: 2,
		maxLength: 100,
		message: 'Spécialité requise (2-100 caractères)'
	},
	classe: {
		required: true,
		minLength: 2,
		maxLength: 50,
		message: 'Classe requise (2-50 caractères)'
	},
	year: {
		required: true,
		custom: (value) => DateUtil.validateYearFormat(value),
		message: 'Année académique invalide (format: YYYY/YYYY+1)'
	},
	is_delegate: {
		required: false,
		type: 'boolean',
		message: 'Statut de délégué requis'
	},
	birth_date: {
		required: false,
		custom: (value) => DateUtil.validateBirthDate(value, { minAge: 16, maxAge: 60, format: 'YYYY-MM-DD' }),
		message: 'Date de naissance invalide (âge entre 16 et 60 ans)'
	},
	birth_place: {
		required: false,
		minLength: 2,
		maxLength: 100,
		message: 'Lieu de naissance requis (2-100 caractères)'
	},
	is_work: {
		required: false,
		type: 'boolean',
		message: 'Statut professionnel requis'
	}
})


function onImageChanged(data) {
	form.value.image = data.file
	// imageInfo = data.info
}

function onImageRemoved() {
	form.value.image = null
	// imageInfo = null
}

function onImageError(error) {
	Notification.error(error, 'Erreur lors du traitement de l\'image.')
}

function resetImage(){
	if(uploaderComponent.value){
		uploaderComponent.value.reset()
	}
}

function validated(){
	
	form.value.level = formId.value.level
	form.value.speciality = formId.value.speciality
	form.value.classe = formId.value.classe

	const result = ValidatedUtil.processForm(validationRules.value, form.value)
	errors.value = result.errors
	if(result.success){
		save(result.formData)
	} else {
		Notification.error("error", "erreur du formulaire.")
	}
}

function save(formData){
	loading.value.send = true
	
	StudentService.setStudent(formData).then((res) => {
		Notification.success("Etudiant enregitré avec succes.")
		form.value = ValidatedUtil.clearFormData(form.value)
		form.value.level = select.value.level.id
		form.value.speciality = select.value.level.id
		form.value.classe = select.value.classe.id
		resetImage()
	}).catch((error) => {
		Notification.error("Erreur lors de la sauvegade des données.")
		errors.value = error.response.data
	}).finally(() => loading.value.send = false)
}
</script>