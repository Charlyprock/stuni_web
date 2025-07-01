<template>
    <div class="flex h-screen max-h-screen overflow-hidden">

        <aside :class="[sidebarCollapsed ? 'w-24' : 'w-64', 'transition-all duration-700 bg-base-100']">
            <Transition name="sirbar" mode="out-in">
                <div v-if="!sidebarCollapsed" class="w-64 p-(--padding-box)f transition-all bg-base-100 h-full border-r border-base-300 flex flex-col">

                    <!-- le logo -->
                    <div class="flex justify-center items-center my-3f">
                        <img src="@/assets/logo.svg" alt="notre logo" class="size-[50px]">
                    </div>

                    <!-- name of institution -->
                    <div class="w-full bg-primary/10 text-primary borderj border-primary/20 h-[50px] flex justify-center items-center p-2 rounded-box mt-2">
                        <p class="uppercase font-semibold">iut de douala</p>
                    </div>
                    
                    <div class="mt-4 overflow-y-auto flex-1">

                        <!-- onglet de base -->
                        <ul class="menu w-full">
                            <li class="menu-title">Base</li>

                            <li>
                                <details open>
                                    <summary>
                                        <StudentIcon class="size-(--icon-size)"/>
                                        Etudiants
                                    </summary>
                                    <ul>
                                        <li>
                                            <RouterLink :to="{name: 'student-list'}" exact-active-class="menu-active" class="">
                                                <ListIcon class="size-(--icon-size)" />
                                                Liste
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink :to="{name: 'student-add'}" exact-active-class="menu-active">
                                                <AddIcon class="size-(--icon-size)" />
                                                Add
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            
                            <li>
                                <RouterLink :to="{name: 'level'}" exact-active-class="menu-active" class="">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Niveaux
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink :to="{name: 'department'}" exact-active-class="menu-active" class="">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Départements
                                </RouterLink>
                            </li>

                            <li>
                                <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Item 3
                                </a>
                            
                            </li>

                        </ul>
                    </div>
                </div>

                <div v-else-if="sidebarCollapsed" class="w-24 p-(--padding-box)f transition-all bg-base-100 h-full border-r border-base-300 flex flex-col">
                    <!-- le logo -->
                    <div class="flex justify-center items-center my-3">
                        <img src="@/assets/logo.svg" alt="notre logo" class="size-[30px]">
                    </div>

                    <!-- name of institution -->
                    <div data-tip="iut de douala" class="tooltip tooltip-right w-full bg-primary/10 text-primary borderj border-primary/20 h-[50px] p-2 rounded-box mt-2"></div>
                    
                    <div class="mt-4 overflow-y-auto overflow-x-hidden flex-1">

                        <!-- onglet de base -->
                        <ul v-for="i in 5" class="menu w-full">
                            <li class="menu-title">Base</li>

                            <li> 
                                <details open>
                                    <summary class="tooltip tooltip-right" data-tip="Etudiants">
                                        <StudentIcon class="size-(--icon-size)"/>
                                    </summary>
                                    <ul>
                                        <li>
                                            <RouterLink :to="{name: 'student-list'}" exact-active-class="menu-active" class="tooltip tooltip-right" data-tip="Liste des etudiants">
                                                <ListIcon class="size-(--icon-size)" />
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink :to="{name: 'student-add'}" exact-active-class="menu-active" class="tooltip tooltip-right" data-tip="Ajouter un etudiant">
                                                <AddIcon class="size-(--icon-size)" />
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            
                            <li>
                                <RouterLink :to="{name: 'level'}" exact-active-class="menu-active" class="">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink :to="{name: 'department'}" exact-active-class="menu-active" class="">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </RouterLink>
                            </li>

                            <li>
                                <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                </a>
                            
                            </li>

                        </ul>
                    </div>
                </div>
            </Transition>
        </aside>

        <div class="flex flex-col flex-1">

            <!-- navbar -->
            <header class="flex items-center justify-between bg-base-100 px-4 m-2 rounded-box h-16 border border-base-300">

                <div class="flex items-center space-x-4">
                    <div class="tooltip tooltip-right" data-tip="Ouvrir/Fermer la Sidebar">
                        <button @click="sidebarCollapsed = !sidebarCollapsed" class="btn btn-ghost p-(--padding-box)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 -rotate-90">
                                <path fill-rule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm18 3H3.75v9a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V9Zm-15-3.75A.75.75 0 0 0 4.5 6v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H5.25Zm1.5.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V6Zm3-.75A.75.75 0 0 0 9 6v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H9.75Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    <!-- buttom de recherche -->
                    <div>
                        <button onclick="search_modal.showModal()" class="btn rounded-box bg-base-200 text-base-content/50 p-(--padding-box) flex items-center justify-between w-[200px] hover:bg-base-300 rounded-field text-sm duration-300">
                            <div class="flex items-center space-x-2">
                                <SearchIcon class="size-4"/>
                                <span>Matricule/code</span>
                            </div>
                            <div class="border border-base-300 kbd">
                                Ctrl k
                            </div>
                        </button>

                        <dialog id="search_modal" class="modal">
                            <div class="modal-box w-[500px]">
                                <form class="flex items-center gap-2">
                                    <!-- matricule -->
                                    <div class="flex-1">
                                        <label class="input validator w-full">
                                            <MatriculeIcon :class-props="'h-[1em] opacity-50'" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Matricule/code"
                                                id="input_search"
                                            />
                                        </label>
                                    </div>

                                    <button class="btn btn-accent">Send</button>
                                </form>
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </div>

                <div class="flex items-center space-x-4">

                    <!-- l'année -->
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="flex items-center space-x-2 m-1 cursor-pointer hover:bg-base-300 p-(--padding-box) rounded-field text-sm duration-300">
                            <p>{{ currentYear }}</p>
                            <DirectionIcon class="size-4" />
                        </div>

                        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xl border border-base-300">
                            <li v-for="year in availableYears"
                                @click="setYear(year)"
                                :disabled="isLoading"
                            >
                                <a>{{ year }}</a>
                            </li>
                        </ul>
                    </div>

                    <!-- therme -->
                    <label class="toggle text-base-content toggle-sm">
                        <input type="checkbox" value="stuni-dark" class="theme-controller" />

                        <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path>
                            <path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path>
                            <path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path></g>
                        </svg>

                        <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g>
                        </svg>

                    </label>

                    <!-- notification -->
                    <button data-tip="Notification" class="tooltip tooltip-left btn btn-ghost p-(--padding-box) flex justify-center items-center">
                        <div class="indicator">
                            <span class="indicator-item status status-accent -translate-0.5"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </div>
                    </button>

                    <!-- user -->
                    <div class="dropdown dropdown-bottom dropdown-end dropdown-hover cursor-pointer">
                        <div tabindex="0" class="m-1 flex items-center justify-center">
                            <div class="w-9 rounded-full overflow-hidden ">
                                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                            </div>

                            <div class="ml-2">
                                <p class="font-semibold text-sm max-w-14 overflow-hidden text-nowrap text-ellipsis">Name jkkjhk</p>
                                <div class="text-xs text-base-content/50 flex items-center justify-between">
                                    <p>Admin</p>
                                    <DirectionIcon class="size-4" />
                                </div>
                            </div>
                        </div>

                        
                        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xl border border-base-300">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                        </ul>
                    </div>

                </div>
            </header>

        <main class="flex-1 overflow-auto p-4">
            <RouterView />
        </main>
        </div>

    </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed, ref, watch } from 'vue'
import MatriculeIcon from '@/components/icons/MatriculeIcon.vue';
import DirectionIcon from '@/components/icons/DirectionIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import StudentIcon from '@/components/icons/StudentIcon.vue';
import TeacherIcon from '@/components/icons/TeacherIcon.vue';
import ListIcon from '@/components/icons/ListIcon.vue';
import AddIcon from '@/components/icons/AddIcon.vue';

import { useUnivercityYear } from '@/composables/useYearComposable'
import { useRoute } from 'vue-router'

const route = useRoute()

const sidebarCollapsed = ref(false)

function handleSlashKey(event) {
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        const modal = document.getElementById('search_modal');
        if (modal && typeof modal.showModal === 'function') {
            modal.showModal();
            setTimeout(() => {
                const input = document.getElementById('input_search');
                if (input) {
                    input.focus();
                }
            }, 500);
            
        }
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleSlashKey);
    initFromUrl()
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleSlashKey);
});

const { currentYear, availableYears, setYear, isLoading, initFromUrl } = useUnivercityYear()

watch(
  () => route.query.year,
  async (newYear) => {
    if (newYear && newYear !== currentYear.value) {
      // Mettre à jour le store sans re-synchroniser l'URL (éviter la boucle)
      const { useUnivercityYearStore } = await import('@/stores/yearStore')
      const store = useUnivercityYearStore()
      store.currentYear = newYear
    }
  }
)

</script>

<style scoped>
.sirbar-enter-active,
.sirbar-leave-active {
  transition: all 0.7s ease-in-out;
}

.sirbar-enter-from,
.sirbar-leave-to {
  transform: translateX(-100%);
}
</style>
