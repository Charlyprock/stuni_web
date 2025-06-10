<template>
    <main class="h-screen w-screen overflow-hidden relative">

        <div class="absolute top-0 left-0 bottom-0 right-0 z-0">
            <img src="@/assets/imgs/affiche_login.png" alt="le logo" class="size-full aspect-3/2 object-cover" />
        </div>

        <div class="flex justify-end size-full"> 

            <div class="mockup-phone z-10 border-base-300 shadow-2xl w-[300px] min-h-[65%] m-6"> 

                <div class="mockup-phone-camera"></div>
                
                <div class="mockup-phone-display w-full h-full bg-gradient-to-b from-secondary to-50% to-primary">

                    <div class="px-3 py-16 space-y-2 text-white flex flex-col items-center">
                        <h2 class="card-title font-semiboldd text-3xl">Login</h2>
                        <p class="text-center">Connectez Vous pour acceder à votre espace  universitaire.</p>
                    </div>

                    <!-- card of login -->
                    <div class="card card-border border-base-300 bg-base-100 h-full">
                        <div class="card-body items-center text-center">
                            
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

                            <!-- le logo -->
                            <div>
                                <img src="@/assets/logo.svg" alt="le logo" class="size-32 mx-auto" />
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