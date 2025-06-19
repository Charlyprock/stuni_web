<template>
    <form @submit.prevent="save" class="flex flex-col gap-5">
		<!-- bare de recherche, titre, et bouton ajouter -->
		<header class="w-full bg-base-100 border border-base-300 flex justify-between items-center p-3 rounded-box">

			<!-- title -->
			<h1 class="text-xl text-nowrap">Nouveau Etudiants</h1>

			<div class="flex gap-3 items-center">
				<button class="btn btn-primary">Soumetre</button>
			</div>
		</header>

		<div class="flex justify-center gap-5">

			<!-- info personnel -->
			<div class="w-[40%] space-y-5">

				<!-- l'image -->
				<div class="w-full h-[100px] bg-base-100 p-(--padding-box) rounded-box border border-base-300">
					<div class="w-full h-full rounded-box border border-inherit border-dashed"></div>
				</div>

				<!-- autre info -->
				<fieldset class="fieldset w-full bg-base-100 p-4 rounded-box border border-base-300">
					<legend class="fieldset-legend">Information Personnel</legend>

					<label class="label">Matricule <span class="text-error text-lg">*</span></label>
					<input type="text" class="input w-full validator" 
						pattern="(?=.*\d)(?=.*[a-z-A-Z])"
						maxlength="20" 
						placeholder="STU2025GL0001" 
						required
						v-model="form.code"
					/>
					<p class="validator-hint hidden text-start">
						Doit contenir des chiffres et lettres.
					</p>

					<label class="label">Nom <span class="text-error text-lg">*</span></label>
					<input v-model="form.last_name" type="text" class="input w-full" placeholder="KOLO" required />

					<label class="label">Prénom <span class="text-error text-lg">*</span></label>
					<input v-model="form.first_name" type="text" class="input w-full" placeholder="Toto" required />
					
					<label class="label">Mot de passe <span class="text-error text-lg">*</span></label>
					<input
					 	v-model="form.password"
						class="input w-full validator"
						type="password"
						required
						placeholder="Password"
						minlength="8"
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
						title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
					/>
					<p class="validator-hint hidden text-start">
						Doit contenir au mois 8 caractéres et inclure
						Must be more than 8 characters, including
						<br/>un nombre
						<br/>une lettre en majuscule
						<br/>une lettre en minuscule
					</p>

					<fieldset class="fieldset flex gap-3">
						<legend class="fieldset-legend">genre</legend>

						<label class="label" for="maxculin">Maxculin</label>
						<input v-model="form.genre" id="maxculin" type="radio" name="radio-1" class="radio" value="M" />

						<label class="label" for="feminin">Féminin</label>
						<input v-model="form.genre" id="feminin" type="radio" name="radio-1" class="radio" value="F" />
					</fieldset>

					<label class="label">Email</label>
					<input v-model="form.email" type="text" class="input w-full" placeholder="example@gmail.com" />

					<label class="label">Tel</label>
					<input type="text" class="input w-full validator" 
						v-model="form.phone"
						pattern="(?=.*\d).{9,}"
						maxlength="9"
						minlength="9"
						placeholder="6-- -- -- --" 
					/>
					<p class="validator-hint hidden text-start">
						Ne doit contenir que des chiffres et 9 caractéres.
					</p>

					<label class="label">Addresse</label>
					<input v-model="form.address" type="text" class="input w-full" placeholder="Douala" />

					<label class="label">Nationnalité</label>
					<input v-model="form.nationnality" type="text" class="input w-full" placeholder="Cameroun" />

					<label class="label">Date de naissance</label>
					<input v-model="form.birth_date" type="date" class="input w-full" placeholder="Douala" />

					<label class="label">Lieux de naissance</label>
					<input v-model="form.birth_place" type="text" class="input w-full" placeholder="Douala" />

					<label class="label my-2">
						<input v-model="form.is_work" type="checkbox" class="toggle" />
						Travaille
					</label>

				</fieldset>

			</div>

			<!-- info inscription -->
			<fieldset class="fieldset w-[40%] space-y-3 h-fit bg-base-100 p-4 rounded-box border border-base-300">
				<legend class="fieldset-legend">Information inscription</legend>

				<!-- Niveau -->
                <div class="dropdown dropdown-start w-full">
                    <button tabindex="0" role="button" class="w-full flex items-center justify-between btn btn-outline border-base-300 p-(--padding-box) text-sm">
                        <p class="text-nowrap overflow-hidden text-ellipsis max-w-[80%]">Niveau ({{ form.level?.name }})</p>
                        <LoadingIcon v-if="loading.level" class="size-(--icon-size)" />
						<DirectionIcon v-else class="size-(--icon-size)" />
                    </button>

                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 mt-1 max-h-[300px] flex-nowrap overflow-y-auto p-2 shadow-xl border border-base-300">
                        <li @click="select_level(level)" v-for="level in levels" :key="level.id" class="max-w-full overflow-hidden rounded-field">
							<div class="flex items-center gap-2 w-full">
								<CheckIcon :class="[form.level.id != level.id ? 'text-transparent': '', 'size-(--icon-size)']" />
								<a class="text-nowrap overflow-hidden text-ellipsis flex-1">{{ level.name }}</a>
							</div>
						</li>
                    </ul>
                </div>

				<!-- specialité -->
                <div class="dropdown dropdown-end w-full">
                    <button :disabled="specialitys.length < 1" tabindex="0" role="button" class="w-full flex items-center justify-between btn btn-outline border-base-300 p-(--padding-box) text-sm">
                        <p class="text-nowrap overflow-hidden text-ellipsis max-w-[80%]">Spécialité ({{ form.speciality?.name }})</p>
                        <LoadingIcon v-if="loading.speciality" class="size-(--icon-size)" />
						<DirectionIcon v-else class="size-(--icon-size)" />
                    </button>

                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 mt-1 max-h-[300px] flex-nowrap overflow-y-auto p-2 shadow-xl border border-base-300">
                        <li @click="select_speciality(speciality)" v-for="speciality in specialitys" :key="speciality.id" class="max-w-full overflow-hidden rounded-field">
							<div class="flex items-center gap-2 w-full">
								<CheckIcon :class="[form.speciality.id != speciality.id ? 'text-transparent': '', 'size-(--icon-size)']" />
								<a class="text-nowrap overflow-hidden text-ellipsis flex-1">{{ speciality.name }}</a>
							</div>
						</li>
                    </ul>
                </div>

				<!-- classe -->
                <div class="dropdown dropdown-end w-full">
                    <button tabindex="0" role="button" disabled class="w-full flex items-center justify-between btn btn-outline border-base-300 p-(--padding-box) text-sm">
                        <p>Classe (Niveau 1)</p>
                        <DirectionIcon class="size-(--icon-size)" />
                    </button>

                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 max-h-[300px] flex-nowrap overflow-y-auto p-2 shadow-xl border border-base-300">
                        <li v-for="i in 10" class="text-nowrap overflow-hidden text-ellipsis">
							<div class=" flex items-center gap-2">
								<CheckIcon class="size-(--icon-size)" />
								<a>classe i</a>
							</div>
						</li>
                    </ul>
                </div>

				<label class="label">Année acardemic</label>
				<input v-model="form.year" type="text" class="input w-full validator" 
					pattern="(?=.*\d).{9,}"
					maxlength="9" 
					placeholder="2024/2025" 
				/>
				<p class="validator-hint hidden text-start">
					Non valide
				</p>

				<label class="label my-2">
					<input v-model="form.is_delegate" value="true" type="checkbox" class="toggle" />
					Délégué
				</label>
			</fieldset>
		</div>
    </form>
</template>

<script setup>
import { PasswordIcon, DirectionIcon, CheckIcon, LoadingIcon } from '@/components/icons';
import { LevelService } from '@/services';
import { onMounted, ref } from 'vue';

const loading = ref({
	level: false,
	speciality: false,
	classe: false
})

const levels = ref([])
const specialitys = ref([])

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

onMounted(() => {
	loading.value.level = true
	LevelService.get_level().then((res) => {
		loading.value.level = false
		levels.value = res.data
		if(res.data.length >= 1){
			form.value.level = res.data[0]
			get_specialitys(res.data[0].id)
		}
	})
})

function select_level(level){

	if(form.value.level.id != level.id){
		loading.value.speciality = true
		form.value.level = level
	
		get_specialitys(level.id)
	}
}

function select_speciality(speciality){
	form.value.speciality = speciality

	// if(form.value.level.id != level.id){
	// 	form.value.level = level
	
	// 	LevelService.get_level(level.id).then((res) => {
	// 		const  data = res.data.specialitys
	// 		if(data.length >= 1){
	// 			form.value.speciality = data[0]
	// 			specialitys.value = data
	// 		}
	// 	})
	// }
}

function get_specialitys(level_id){
	specialitys.value = []
	form.value.speciality = null

	LevelService.get_level(level_id).then((res) => {
		loading.value.speciality = false
		const  data = res.data.specialitys
		if(data.length >= 1){
			form.value.speciality = data[0]
			specialitys.value = data
		}
	})
}

function save(){
	alert("save")
}
</script>