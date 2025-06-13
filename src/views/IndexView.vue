<template>
  <div class="flex h-screen overflow-hidden">

    <aside :class="[sidebarCollapsed ? 'w-20' : 'w-64', 'transition-all duration-700']">
        <Transition name="sirbar" mode="out-in">
            <div v-if="!sidebarCollapsed" class="w-64 transition-all bg-base-100 h-full border-r border-base-300">
                <div class="p-4 font-bold">Admin Panel</div>
                <nav class="mt-4">
                <RouterLink to="/" class="flex items-center p-3 hover:bg-gray-100">
                    <span>🏠</span>
                    <span class="ml-3">Dashboard</span>
                </RouterLink>
                <RouterLink to="/users" class="flex items-center p-3 hover:bg-gray-100">
                    <span>👥</span>
                    <span class="ml-3">Users</span>
                </RouterLink>
                </nav>
            </div>

            <div v-else-if="sidebarCollapsed" class="w-20 transition-all bg-base-100 h-full border-r border-base-300">
                <MatriculeIcon class="h-6 w-6 mx-auto" />
                <MatriculeIcon class="h-6 w-6 mx-auto mt-4" />
                <MatriculeIcon class="h-6 w-6 mx-auto mt-4" />
                <MatriculeIcon class="h-6 w-6 mx-auto mt-4" />
                <MatriculeIcon class="h-6 w-6 mx-auto mt-4" />
                <MatriculeIcon class="h-6 w-6 mx-auto mt-4" />
            </div>
        </Transition>
    </aside>

    <div class="flex flex-col flex-1">

        <!-- navbar -->
        <header class="flex items-center justify-between bg-base-100 px-4 m-2 rounded-box h-16 border border-base-300">

            <div class="tooltip tooltip-right" data-tip="Ouvrir/Fermer la Sidebar">
                <button @click="sidebarCollapsed = !sidebarCollapsed" class="btn btn-ghost p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5 -rotate-90">
                        <path fill-rule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm18 3H3.75v9a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V9Zm-15-3.75A.75.75 0 0 0 4.5 6v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H5.25Zm1.5.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V6Zm3-.75A.75.75 0 0 0 9 6v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H9.75Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <div class="flex items-center space-x-4">

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
                <button class="btn btn-ghost p-2 flex justify-center items-center">
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
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
import { ref } from 'vue'
import MatriculeIcon from '@/components/icons/MatriculeIcon.vue';

const sidebarCollapsed = ref(false)
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
