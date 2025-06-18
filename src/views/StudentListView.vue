<template>
	<div class="flex flex-col gap-5">

		<!-- bare de recherche, titre, et bouton ajouter -->
		<header class="w-full bg-base-100 border border-base-300 flex justify-between items-center p-3 rounded-box">

			<!-- title -->
			<h1 class="text-xl text-nowrap">Liste des Etudiants</h1>

			<div class="flex gap-3 items-center">
				<button class="btn btn-neutral btn-sm text-nowrap">
					<RouterLink :to="{name: 'student-add'}">
						<AddIcon class="size-(--icon-size)" />
					</RouterLink>
				</button>

				<label class="input validator w-full">
					<SearchIcon :class-props="'h-[1em] opacity-50'" />
					<input
						type="text"
						required
						placeholder="Recherche"
						id="input_search"
					/>
				</label>
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
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="flex items-center space-x-2 m-1 cursor-pointer hover:bg-base-300 p-(--padding-box) rounded-field text-sm duration-300">
                        <p>Niveau (Niveau 1)</p>
                        <DirectionIcon class="size-4" />
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xl border border-base-300">
                        <li><a>Niveau 1</a></li>
                        <li><a>Niveau 2</a></li>
                        <li><a>Niveau 3</a></li>
                        <li><a>Niveau 4</a></li>
                        <li><a>Niveau 5</a></li>
                    </ul>
                </div>

				<!-- departement -->
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="flex items-center space-x-2 m-1 cursor-pointer hover:bg-base-300 p-(--padding-box) rounded-field text-sm duration-300">
                        <p>Departement (GI)</p>
                        <DirectionIcon class="size-4" />
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xl border border-base-300">
                        <li><a>Departement 1</a></li>
                        <li><a>Departement 2</a></li>
                        <li><a>Departement 3</a></li>
                        <li><a>Departement 4</a></li>
                        <li><a>Departement 5</a></li>
                    </ul>
                </div>

				<!-- filier -->
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="flex items-center space-x-2 m-1 cursor-pointer hover:bg-base-300 p-(--padding-box) rounded-field text-sm duration-300">
                        <p>Filier (GL)</p>
                        <DirectionIcon class="size-4" />
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xl border border-base-300">
                        <li><a>Filier 1</a></li>
                        <li><a>Filier 2</a></li>
                        <li><a>Filier 3</a></li>
                        <li><a>Filier 4</a></li>
                        <li><a>Filier 5</a></li>
                    </ul>
                </div>

				<!-- classe -->
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="flex items-center space-x-2 m-1 cursor-pointer hover:bg-base-300 p-(--padding-box) rounded-field text-sm duration-300">
                        <p>classe (GL-C)</p>
                        <DirectionIcon class="size-(--icon-size)" />
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 max-h-[300px] flex-nowrap overflow-y-auto p-2 shadow-xl border border-base-300">
                        <li v-for="i in 10" class="text-nowrap overflow-hidden text-ellipsis">
							<div class=" flex items-center gap-2">
								<CheckIcon class="size-(--icon-size)" />
								<a>classe i</a>
							</div>
						</li>
                    </ul>
                </div>
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
								<input type="checkbox" class="checkbox" />
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
						<!-- row 1 -->
						<tr>
							<th>
								<label>
									<input type="checkbox" class="checkbox" />
								</label>
							</th>

							<td>
								<div class="flex items-center gap-3">
									<div class="avatar indicator tooltip tooltip-right" data-tip="Délégué">
										<span class="indicator-item status status-accent status-lg -translate-0.5"></span>
										<div class="mask mask-squircle h-12 w-12">
											<img
											src="https://img.daisyui.com/images/profile/demo/2@94.webp"
											alt="Avatar Tailwind CSS Component" />
										</div>
									</div>
									<div>
										<div class="font-bold">Hart Hagerty</div>
										<div class="text-sm opacity-50">#SDJFIESLIE</div>
									</div>
								</div>
							</td>

							<td>
								Admin@gmail.com
								<br />
								<span class="badge badge-ghost badge-sm">671 88 47 17</span>
							</td>

							<td>
								20/12/2020
								<br />
								<div class="text-sm opacity-50">Douala</div>
							</td>

							<td>
								Cameroun
								<br />
								<div class="text-sm opacity-50">Français</div>
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
						<!-- row 2 -->
						<tr>
							<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
							</th>
							<td>
							<div class="flex items-center gap-3">
								<div class="avatar">
								<div class="mask mask-squircle h-12 w-12">
									<img
									src="https://img.daisyui.com/images/profile/demo/3@94.webp"
									alt="Avatar Tailwind CSS Component" />
								</div>
								</div>
								<div>
								<div class="font-bold">Brice Swyre</div>
								<div class="text-sm opacity-50">China</div>
								</div>
							</div>
							</td>
							<td>
							Carroll Group
							<br />
							<span class="badge badge-ghost badge-sm">Tax Accountant</span>
							</td>
							<td>Red</td>
							<th>
							<button class="btn btn-ghost btn-xs">details</button>
							</th>
						</tr>
						<!-- row 3 -->
						<tr>
							<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
							</th>
							<td>
							<div class="flex items-center gap-3">
								<div class="avatar">
								<div class="mask mask-squircle h-12 w-12">
									<img
									src="https://img.daisyui.com/images/profile/demo/4@94.webp"
									alt="Avatar Tailwind CSS Component" />
								</div>
								</div>
								<div>
								<div class="font-bold">Marjy Ferencz</div>
								<div class="text-sm opacity-50">Russia</div>
								</div>
							</div>
							</td>
							<td>
							Rowe-Schoen
							<br />
							<span class="badge badge-ghost badge-sm">Office Assistant I</span>
							</td>
							<td>Crimson</td>
							<th>
							<button class="btn btn-ghost btn-xs">details</button>
							</th>
						</tr>
						<!-- row 4 -->
						<tr>
							<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
							</th>
							<td>
							<div class="flex items-center gap-3">
								<div class="avatar">
								<div class="mask mask-squircle h-12 w-12">
									<img
									src="https://img.daisyui.com/images/profile/demo/5@94.webp"
									alt="Avatar Tailwind CSS Component" />
								</div>
								</div>
								<div>
								<div class="font-bold">Yancy Tear</div>
								<div class="text-sm opacity-50">Brazil</div>
								</div>
							</div>
							</td>
							<td>
							Wyman-Ledner
							<br />
							<span class="badge badge-ghost badge-sm">Community Outreach Specialist</span>
							</td>
							<td>Indigo</td>
							<th>
							<button class="btn btn-ghost btn-xs">details</button>
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
				<div class="flex justify-center items-center">

					<button class="btn btn-sm p-2 mr-2 rounded-full">
						<DirectionIcon class="size-(--icon-size) rotate-90"/>
					</button>

					<div class="py-1 px-2 bg-base-200 rounded-box flex gap-1">
						<button class="btn btn-sm btn-primary">1</button>
						<button class="btn btn-sm">2</button>
						<button class="btn btn-sm btn-disabled">...</button>
						<button class="btn btn-sm">99</button>
						<button class="btn btn-sm">100</button>
					</div>

					<button class="btn btn-sm p-2 ml-2 rounded-full">
						<DirectionIcon class="size-(--icon-size) -rotate-90"/>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { 
	AddIcon, SearchIcon, MenuIcon, EditIcon, DeleteIcon,
	DirectionIcon, FilterIcon, CheckIcon,
} from '@/components/icons';
</script>