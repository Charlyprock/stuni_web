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
                                <label class="input validator">
                                    <PasswordIcon :class-props="'h-[1em] opacity-50'" />
                                    <input
                                        type="password"
                                        required
                                        placeholder="Password"
                                        minlength="8"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                    />
                                </label>
                                <p class="validator-hint hidden text-start">
                                    Must be more than 8 characters, including
                                    <br/>At least one number
                                    <br/>At least one lowercase letter
                                    <br/>At least one uppercase letter
                                </p>
                            </div>
                        
                            <div class="card-actions w-full mt-4">
                                <p class="text-primary text-end font-bold">Mot de passe oublier ?</p>
                                <button class="btn btn-primary w-full">Se connecter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>

<script setup>
    import PasswordIcon from '@/components/icons/PasswordIcon.vue';
    import MatriculeIcon from '@/components/icons/MatriculeIcon.vue';

</script>