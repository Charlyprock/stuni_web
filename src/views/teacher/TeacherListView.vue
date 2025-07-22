<template>
	<div class="flex flex-col gap-5">

		<!-- bare de recherche, titre, et bouton ajouter -->
		<header class="w-full bg-base-100 border border-base-300 flex justify-between items-center p-3 rounded-box">

			<!-- title -->
			<h1 class="text-xl text-nowrap">Liste des Enseignants</h1>

			<div class="flex gap-3 items-center">
				<button data-tip="Nouveaux Enseignant" class="btn btn-neutral tooltip tooltip-left btn-sm text-nowrap">
					<RouterLink :to="{name: 'teacher-add'}">
						<AddIcon class="size-(--icon-size)" />
					</RouterLink>
				</button>

				<label class="input w-full">
					<SearchIcon :class-props="'h-[1em] opacity-50'" />
					<input
						type="text"
						placeholder="Recherche"
						id="input_search"
						v-model="search.q"
					/>
				</label>

				<button @click="refresch_teacher" :disabled="!search.q" class="btn btn-accent tooltip tooltip-left" data-tip="Rafraichir">
					<RefreschIcon class="size-(--icon-size)"/>
				</button>
			</div>
		</header>

		<!-- liste et filter -->
		<div class="w-full bg-base-100 border border-base-300 p-3 rounded-box flex flex-col gap-3">

			<!-- filtre -->
			<div class="flex items-centerg gap-3">
				<button class="btn btn-neutral">
					<FilterIcon class="size-(--icon-size)"/>
					Filtre
				</button>

				<!-- niveau -->
				<SelectFilter 
					:values="levels" 
					name="Niveau"
					:loading="loading.level"
					:default-select="select.level"
					@select-value="select_level"
				/>

				<!-- specialité -->
				<SelectFilter 
					:values="specialitys" 
					name="Spécialité"
					:loading="loading.speciality"
					:default-select="select.speciality"
					@select-value="select_speciality"
				/>

				<!-- classe -->
				<SelectFilter 
					:values="classes" 
					name="Classe"
					:loading="loading.classe"
					:default-select="select.classe"
					@select-value="select_classe"
				/>
			</div>

			<div>
				<button @click="showDeleteModalF()" :disabled="selectedItems.length <= 0" class="btn btn-error tooltip tooltip-right tooltip-error" data-tip="Supprimer les éléments cochés.">
					<DeleteIcon class="size-(--icon-size)"/>
                </button>
			</div>

			<!-- list -->
			<div>

				<div class="overflow-x-auto">
					<table class="table">
						<!-- head -->
						<thead>
						<tr>
							<th>
							<label>
								<input type="checkbox" class="checkbox" 
									:checked="isAllSelected"
									:indeterminate="isIndeterminate"
									@change="toggleAll" 
								/>
							</label>
							</th>
							<th>Nom</th>
							<th>Contact</th>
							<th>Grade</th>
							<th>Nationnalité</th>
							<th></th>
						</tr>
						</thead>
						<tbody>
						<!-- row -->

						<!-- simulation -->
						<tr v-if="is_loading_teacher">
							<th>
								<div class=" size-6 skeleton rounded-md"></div>
							</th>

							<td>
								<div class="flex items-center gap-3">
									<div class="mask mask-squircle size-12 skeleton"></div>
									<div class=" space-y-2">
										<div class="h-2 w-24 skeleton"></div>
										<div class="h-2 w-14 skeleton"></div>
									</div>
								</div>
							</td>

							<td>
								<div class=" space-y-2">
									<div class="h-2 w-24 skeleton"></div>
									<div class="h-2 w-14 skeleton"></div>
								</div>
							</td>

							<td>
								<div class=" space-y-2">
									<div class="h-2 w-24 skeleton"></div>
									<div class="h-2 w-14 skeleton"></div>
								</div>
							</td>

							<td>
								<div class=" space-y-2">
									<div class="h-2 w-24 skeleton"></div>
									<div class="h-2 w-14 skeleton"></div>
								</div>
							</td>

							<th>
								<div class="h-4 w-8 skeleton"></div>
							</th>
						</tr>

						<tr v-for="teacher in teachers" :key="teacher.id">
							<th>
								<label>
									<input type="checkbox" class="checkbox" 
										:checked="isSelected(teacher.id)" 
										@change="toggleItem(teacher.id)"
									/>
								</label>
							</th>

							<td>
								<div class="flex items-center gap-3">
									<div class="avatar">
										<div class="mask mask-squircle h-12 w-12">
											<img
											src="https://img.daisyui.com/images/profile/demo/2@94.webp"
											alt="Avatar Tailwind CSS Component" />
										</div>
									</div>
									<div :data-tip="`${teacher.user?.last_name} ${teacher.user?.first_name}`" class="tooltip tooltip-right">
										<div class="tooltip tooltip-right font-bold text-nowrap text-ellipsis max-w-[90%] overflow-hidden">
											{{ `${teacher.user?.last_name} ${teacher.user?.first_name}` }}
										</div>
										<div class="text-sm opacity-50 uppercase">#{{ teacher.user?.code }}</div>
									</div>
								</div>
							</td>

							<td>
								<span class="opacity-50 text-xs">Email: </span> {{ teacher.user?.email ?? '---' }}
								<br />
								<span class="badge badge-ghost badge-sm">{{ teacher.user?.phone ?? '---' }}</span>
							</td>

							<td>
								{{ teacher.grade ?? '---' }}
							</td>

							<td>
								{{ teacher.user?.nationnality ?? '---' }}
								<br />
								<div class="text-sm opacity-50">{{ teacher.user?.address ?? '---' }}</div>
							</td>

							<th>
								<div class="dropdown dropdown-end">

									<button tabindex="0" class="btn btn-ghost btn-xs">
										<MenuIcon class="size-(--icon-size)" />
									</button>
									<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-2xl border border-base-300 font-medium">
										<li>
											<button class="btn btn-ghost btn-sm text-sm justify-start">
												<EditIcon class="size-(--icon-size) kbd border p-[2px]" />
												Editer
											</button>
										</li>
										<li>
											<button @click="showDeleteModalF(teacher)" class="btn btn-ghostj btn-soft btn-error btn-sm text-sm justify-start">
												<DeleteIcon class="size-(--icon-size) kbd border border-error p-[2px] bg-error/10" />
												Suprimer
											</button>
										</li>
									</ul>
								</div>
							</th>
						</tr>

						</tbody>
					</table>
				</div>
			</div>

			<!-- le parginate -->
			<div class="flex justify-center">
				<Pargination :data="paginate" @new="new_page" />
			</div>
		</div>

		<!-- la liste des enseignant sans classe -->
		<div class="space-y-3">
			<div class="flex items-center alert alert-error alert-soft">
				<button class="btn btn-error btn-ghost btn-soft border border-error btn-sm justify-start">
					<EyeIcon class="size-(--icon-size) p-[1px]" />
					visualiser
				</button>
								
				<p class="">Affichier les Enseignants qui n'ont pas de classe.</p>
			</div>

			<div class="w-full bg-base-100 border border-base-300 p-3 rounded-box flex flex-col gap-3">

				<!-- list -->
				<div>

					<div class="overflow-x-auto">
						<table class="table">
							<!-- head -->
							<thead>
							<tr>
								<th></th>
								<th>Nom</th>
								<th>Contact</th>
								<th>Grade</th>
								<th>Nationnalité</th>
								<th></th>
							</tr>
							</thead>
							<tbody>
							<!-- row -->

							<!-- simulation -->
							<tr v-if="is_loading_teacher">
								<th>
									<div class=" size-6 skeleton rounded-md"></div>
								</th>

								<td>
									<div class="flex items-center gap-3">
										<div class="mask mask-squircle size-12 skeleton"></div>
										<div class=" space-y-2">
											<div class="h-2 w-24 skeleton"></div>
											<div class="h-2 w-14 skeleton"></div>
										</div>
									</div>
								</td>

								<td>
									<div class=" space-y-2">
										<div class="h-2 w-24 skeleton"></div>
										<div class="h-2 w-14 skeleton"></div>
									</div>
								</td>

								<td>
									<div class=" space-y-2">
										<div class="h-2 w-24 skeleton"></div>
										<div class="h-2 w-14 skeleton"></div>
									</div>
								</td>

								<td>
									<div class=" space-y-2">
										<div class="h-2 w-24 skeleton"></div>
										<div class="h-2 w-14 skeleton"></div>
									</div>
								</td>

								<th>
									<div class="h-4 w-8 skeleton"></div>
								</th>
							</tr>

							<tr v-for="teacher in teachers" :key="teacher.id">
								<th>
									<label>
										<input type="checkbox" class="checkbox" 
											:checked="isSelected(teacher.id)" 
											@change="toggleItem(teacher.id)"
										/>
									</label>
								</th>

								<td>
									<div class="flex items-center gap-3">
										<div class="avatar">
											<div class="mask mask-squircle h-12 w-12">
												<img
												src="https://img.daisyui.com/images/profile/demo/2@94.webp"
												alt="Avatar Tailwind CSS Component" />
											</div>
										</div>
										<div :data-tip="`${teacher.user?.last_name} ${teacher.user?.first_name}`" class="tooltip tooltip-right">
											<div class="tooltip tooltip-right font-bold text-nowrap text-ellipsis max-w-[90%] overflow-hidden">
												{{ `${teacher.user?.last_name} ${teacher.user?.first_name}` }}
											</div>
											<div class="text-sm opacity-50 uppercase">#{{ teacher.user?.code }}</div>
										</div>
									</div>
								</td>

								<td>
									<span class="opacity-50 text-xs">Email: </span> {{ teacher.user?.email ?? '---' }}
									<br />
									<span class="badge badge-ghost badge-sm">{{ teacher.user?.phone ?? '---' }}</span>
								</td>

								<td>
									{{ teacher.grade ?? '---' }}
								</td>

								<td>
									{{ teacher.user?.nationnality ?? '---' }}
									<br />
									<div class="text-sm opacity-50">{{ teacher.user?.address ?? '---' }}</div>
								</td>

								<th>
									<div class="dropdown dropdown-end">

										<button tabindex="0" class="btn btn-ghost btn-xs">
											<MenuIcon class="size-(--icon-size)" />
										</button>
										<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-2xl border border-base-300 font-medium">
											<li>
												<button class="btn btn-ghost btn-sm text-sm justify-start">
													<EditIcon class="size-(--icon-size) kbd border p-[2px]" />
													Editer
												</button>
											</li>
											<li>
												<button @click="showDeleteModalF(teacher)" class="btn btn-ghostj btn-soft btn-error btn-sm text-sm justify-start">
													<DeleteIcon class="size-(--icon-size) kbd border border-error p-[2px] bg-error/10" />
													Suprimer
												</button>
											</li>
										</ul>
									</div>
								</th>
							</tr>

							</tbody>
						</table>
					</div>
				</div>

			</div>
		</div>
					
		<Modal
			v-model="showDeleteModal"
			title="Supprimer les Enseignants"
			message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet élément ?"
			confirm-text="Supprimer"
			cancel-text="Conserver"
			confirm-button-type="danger"
			:loading="deleteLoading"
			@confirm="handleDelete"
		/>
	</div>
</template>

<script setup>
import { 
	AddIcon, SearchIcon, MenuIcon, EditIcon, DeleteIcon, EyeIcon,
	RefreschIcon, FilterIcon, CheckIcon
} from '@/components/icons';
import SelectFilter from '@/components/SelectFilterComponent.vue';
import Modal from '@/components/ModalComponent.vue'
import Pargination from '@/components/ParginationComponent.vue';
import { useFilters } from '@/composables/useFiltersComposable'
import { usePargination } from '@/composables/useParginationComposable';
import { useCheckbox } from '@/composables/useCheckboxComposable';
import { useUnivercityYearStore } from '@/stores/yearStore';
import { TeacherService } from '@/services';
import { onMounted, ref, watch, computed } from 'vue';
import { NotificationUtil } from '@/utils';

const Notification = NotificationUtil.notificationsUtil()

const teachers = ref([])
const search = ref({
	q: null
})

const {
  select,
  levels,
  specialitys,
  classes,
  loading,
  select_level,
  select_speciality,
  select_classe,
} = useFilters({ defaultSelectFirst: true })

const {
	new_page,
	refresch_paginate,
	paginate,
} = usePargination()

const {
	isAllSelected,
	isIndeterminate,
	selectedItems,
	isSelected,
	toggleAll,
	toggleItem
} = useCheckbox(teachers)

const yearStore = useUnivercityYearStore()

const is_loading_teacher = ref(false)
const showDeleteModal = ref(false)
const deleteLoading = ref(false)

watch(
	[() => select.value.classe, () => yearStore.currentYear, () => search.value.q], 
	([classe, year, q])=> {
	getTeachers({
		level: select.value.level?.id,
		speciality: select.value.speciality?.id,
		department: null,
		classe: select.value.classe?.id,
		search: q
	})
})

watch(()=> paginate.value, (pag)=> {
	teachers.value = pag?.data?.results
}, {deep: true})

function getTeachers(options={
	level: select.value.level?.id,
	speciality: select.value.speciality?.id,
	department: null,
	classe: select.value.classe?.id,
	search: null
}){
	
	is_loading_teacher.value = true
	TeacherService.getTeachers(options).then((res) => {
		refresch_paginate(res.data)
	}).finally(()=> is_loading_teacher.value = false)
}

function refresch_teacher(){
	search.value.q = null
}

function delete_teacher(id){
	TeacherService.deleteTeacher(id).then((res)=>{
		teachers.value = teachers.value.filter(
			steacher => steacher.id != id
		)
		Notification.success("Suppréssion réussir.")
	}).catch((error) => Notification.error("Une erreur innatendus s'est produit, veuillez réessayer."))
	.finally(() => {
		deleteLoading.value = false
		closeDeleteModalF()
	})
}

function delete_all(){
	const form = {ids: selectedItems.value}
	TeacherService.deleteTeachersIDS(form).then((res)=>{
		teachers.value = teachers.value.filter(
			teacher => !res.data.deleted.includes(teacher.id)
		)
		selectedItems.value = []
		Notification.success("Suppréssion réussir.")
	}).catch((error) => Notification.error("Une erreur innatendus s'est produit, veuillez réessayer."))
	.finally(() => {
		deleteLoading.value = false
		closeDeleteModalF()
	})
}

const teacher_click = ref(null)
function showDeleteModalF(teacher=null){
	showDeleteModal.value = true
	teacher_click.value = teacher
}

function closeDeleteModalF(){
	showDeleteModal.value = false
	teacher_click.value = null
}

function handleDelete(){
	deleteLoading.value = true
	if (teacher_click.value) {
		delete_teacher(teacher_click.value.id)
	} else {
		delete_all()
	}
}

</script>