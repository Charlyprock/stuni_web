<template>
    <main class="h-screen w-screen overflow-hidden relative">

        <div class="absolute top-0 left-0 bottom-0 right-0 z-0">
            <img src="@/assets/imgs/affiche_login.png" alt="le logo" class="size-full aspect-3/2 object-cover" />
        </div>

        <div class="flex justify-end items-center size-full"> 

            <div class="mockup-phone rounded-nonef z-10 border-base-300 bg-base-200 shadow-xl/100 w-[300px] h-fit m-6">
                
                <div class="mockup-phone-display rounded-nonef w-full h-full">

                    <!-- card of login -->
                    <div class="card card-border rounded-none border-base-300 bg-base-100 h-full">
                        <div class="card-body rounded-none items-center text-center">

                            <h2 class="card-title font-semiboldd text-3xl">Login</h2>
                            
                            <!-- matricule -->
                            <div class="w-full">
                                <label class="input validator">
                                    <MatriculeIcon :class-props="'h-[1em] opacity-50'" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Matricule"
                                    />
                                </label>
                            </div>

                            <!-- password -->
                            <div class="w-full">
                                <label class="input">
                                    <PasswordIcon :class-props="'h-[1em] opacity-50'" />
                                    <input
                                        :type="!isShowPassword ? 'password' : 'text'"
                                        required
                                        placeholder="Password"
                                    />

                                    <button @click="togglePasswordVisibility" class="label cursor-pointer">
                                        <VuePasswordIcon v-if="!isShowPassword" class=" size-(--icon-size)" />
                                        <HiddenPasswordIcon v-if="isShowPassword" class=" size-(--icon-size)" />
                                    </button>
                                </label>
                            </div>
                        
                            <div class="card-actions w-full mt-4">
                                <p class="text-primary text-end font-bold">Mot de passe oublier ?</p>

                                <button class="btn btn-primary w-full" :disabled="loading">
                                    <p>Se connecter</p>
                                    <LoadingIcon v-if="loading" class="size-(--icon-size)" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>

<script setup>
import { 
    VuePasswordIcon, MatriculeIcon, 
    PasswordIcon, HiddenPasswordIcon ,
    LoadingIcon,
} from '@/components/icons';
import { ref } from 'vue';


const loading = ref(false)

const isShowPassword = ref(false)
const togglePasswordVisibility = () => {
    isShowPassword.value = !isShowPassword.value
}

</script>