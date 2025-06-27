<template>
	<div class="flex flex-col gap-5">

		<!-- bare de recherche, titre, et bouton ajouter -->
		<header class="w-full bg-base-100 border border-base-300 flex justify-between items-center p-3 rounded-box">

			<!-- title -->
			<h1 class="text-xl text-nowrap">Liste des Etudiants</h1>

			<div class="flex gap-3 items-center">
				<button data-tip="Nouveaux Etudiant" class="btn btn-neutral tooltip tooltip-left btn-sm text-nowrap">
					<RouterLink :to="{name: 'student-add'}">
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

				<button @click="refresch_student" :disabled="!search.q" class="btn btn-accent tooltip tooltip-left" data-tip="Rafraichir">
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
				<button @click="delete_all" :disabled="selectedItems.length <= 0" class="btn btn-error tooltip tooltip-right tooltip-error" data-tip="Supprimer les éléments cochés.">
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
							<th>Date & lieux de Naiss</th>
							<th>Nationnalité</th>
							<th></th>
						</tr>
						</thead>
						<tbody>
						<!-- row -->

						<!-- simulation -->
						<tr v-if="is_loading_student">
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

						<tr v-for="student in students" :key="student.id">
							<th>
								<label>
									<input type="checkbox" class="checkbox" 
										:checked="isSelected(student.id)" 
										@change="toggleItem(student.id)"
									/>
								</label>
							</th>

							<td>
								<div class="flex items-center gap-3">
									<div class="avatar indicator" :class="student.enrollments.is_delegate ? 'tooltip tooltip-right' : ''" data-tip="Délégué">
										<span v-if="student.enrollments.is_delegate" class="indicator-item status status-accent status-lg -translate-0.5 outline-2 outline-base-100"></span>
										<div class="mask mask-squircle h-12 w-12">
											<img
											src="https://img.daisyui.com/images/profile/demo/2@94.webp"
											alt="Avatar Tailwind CSS Component" />
										</div>
									</div>
									<div :data-tip="`${student.user?.last_name} ${student.user?.first_name}`" class="tooltip tooltip-right">
										<div class="tooltip tooltip-right font-bold text-nowrap text-ellipsis max-w-[90%] overflow-hidden">
											{{ `${student.user?.last_name} ${student.user?.first_name}` }}
										</div>
										<div class="text-sm opacity-50 uppercase">#{{ student.user?.code }}</div>
									</div>
								</div>
							</td>

							<td>
								{{ student.user?.email ?? '---' }}
								<br />
								<span class="badge badge-ghost badge-sm">{{ student.user?.phone ?? '---' }}</span>
							</td>

							<td>
								{{ student.birth_date ?? '---' }}
								<br />
								<div class="text-sm opacity-50">{{ student.birth_place ?? '---' }}</div>
							</td>

							<td>
								{{ student.user?.nationnality ?? '---' }}
								<br />
								<div class="text-sm opacity-50">{{ student.user?.address ?? '---' }}</div>
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
											<button class="btn btn-ghostj btn-soft btn-error btn-sm text-sm justify-start">
												<DeleteIcon class="size-(--icon-size) kbd border border-error p-[2px] bg-error/10" />
												Suprimer
											</button>
										</li>
									</ul>
								</div>
							</th>
						</tr>

						</tbody>
						<!-- foot -->
						<tfoot>
						<tr>
							<th></th>
							<th>Nom</th>
							<th>Contact</th>
							<th>Date & lieux de Naiss</th>
							<th>Nationnalité</th>
							<th></th>
						</tr>
						</tfoot>
					</table>
				</div>
			</div>

			<!-- le parginate -->
			<div class="flex justify-center">
				<Pargination :data="paginate" @new="new_page" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { 
	AddIcon, SearchIcon, MenuIcon, EditIcon, DeleteIcon,
	RefreschIcon, FilterIcon, CheckIcon,
} from '@/components/icons';
import SelectFilter from '@/components/SelectFilterComponent.vue';
import Pargination from '@/components/ParginationComponent.vue';
import { useFilters } from '@/composables/useFiltersComposable'
import { usePargination } from '@/composables/useParginationComposable';
import { useCheckbox } from '@/composables/useCheckboxComponent';
import { useUnivercityYearStore } from '@/stores/yearStore';
import { StudentService } from '@/services';
import { onMounted, ref, watch, computed } from 'vue';
import { NotificationUtil } from '@/utils';

const Notification = NotificationUtil.notificationsUtil()

const students = ref([])
const search = ref({
	q: null
})

const {
  form,
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
} = useCheckbox(students)

const yearStore = useUnivercityYearStore()

const is_loading_student = ref(false)

watch(
	[() => select.value.classe, () => yearStore.currentYear, () => search.value.q], 
	([classe, year, q])=> {
	getStudents({
		level: select.value.level?.id,
		speciality: select.value.speciality?.id,
		department: null,
		classe: select.value.classe?.id,
		search: q
	})
})

watch(()=> paginate.value, (pag)=> {
	students.value = pag?.data?.results
}, {deep: true})

function getStudents(options={
	level: select.value.level?.id,
	speciality: select.value.speciality?.id,
	department: null,
	classe: select.value.classe?.id,
	search: null
}){
	
	is_loading_student.value = true
	StudentService.getStudents(options).then((res) => {
		refresch_paginate(res.data)
	}).finally(()=> is_loading_student.value = false)
}

function search_student(){
	setTimeout(() => {
		getStudents({
			search: search.value.q
		})
	}, 500);
}

function refresch_student(){
	search.value.q = null
}

function delete_all(){
	const form = {ids: selectedItems.value}
	StudentService.deleteStudentsIDS(form).then((res)=>{
		students.value = students.value.filter(
			stud => !res.data.deleted.includes(stud.id)
		)
		selectedItems.value = []
		Notification.success("Suppréssion réussir.")
	})
}

</script>