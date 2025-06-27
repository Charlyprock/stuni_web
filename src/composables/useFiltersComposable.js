import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LevelService, SpecialityService } from '@/services'

export function useFilters(options = { defaultSelectFirst: true }) {
    const route = useRoute()
    const router = useRouter()

    // Ajout d'un flag pour l'initialisation
    const isInitializing = ref(true)

    const form = ref({
        level: null,
        speciality: null,
        classe: null,
    })

    const select = ref({
        level: null,
        speciality: null,
        classe: null,
    })

    const loading = ref({
        level: false,
        speciality: false,
        classe: false,
    })

    const levels = ref([])
    const specialitys = ref([])
    const classes = ref([])

    const updateQueryParams = (params) => {
        // Ne pas mettre à jour les params pendant l'initialisation
        if (!isInitializing.value) {
            router.replace({
                query: {
                    ...route.query,
                    ...params,
                },
            })
        }
    }

    const get_levels = async () => {
        loading.value.level = true
        try {
            const res = await LevelService.get_level()
            loading.value.level = false
            levels.value = res.data

            const levelIdFromUrl = parseInt(route.query.level)
            const match = levels.value.find((l) => l.id === levelIdFromUrl)

            if (match) {
                await select_level(match, true) // true = vient de l'URL
            } else if (options.defaultSelectFirst && levels.value.length > 0) {
                await select_level(levels.value[0], false) // false = sélection par défaut
                isInitializing.value = false // Fin de l'initialisation si pas de params URL
            } else {
                isInitializing.value = false
            }
        } catch (error) {
            loading.value.level = false
            isInitializing.value = false
        }
    }

    const get_specialitys = async (level_id, fromUrl = false) => {
        loading.value.speciality = true
        specialitys.value = []
        
        // Ne réinitialiser que si ce n'est pas une restauration depuis l'URL
        if (!fromUrl) {
            form.value.speciality = null
            select.value.speciality = null
        }

        try {
            const res = await LevelService.get_level(level_id)
            loading.value.speciality = false
            const data = res.data.specialitys
            specialitys.value = data

            const specId = parseInt(route.query.speciality)
            const match = data.find((s) => s.id === specId)

            if (match && (fromUrl || isInitializing.value)) {
                await select_speciality(match, true)
            } else if (options.defaultSelectFirst && data.length > 0) {
                await select_speciality(data[0], false)
                if (isInitializing.value && !route.query.speciality) {
                    isInitializing.value = false
                }
            } else {
                if (isInitializing.value) {
                    isInitializing.value = false
                }
            }
        } catch (error) {
            loading.value.speciality = false
            if (isInitializing.value) {
                isInitializing.value = false
            }
        }
    }

    const get_classes = async (speciality_id, fromUrl = false) => {
        classes.value = []
        
        // Ne réinitialiser que si ce n'est pas une restauration depuis l'URL
        if (!fromUrl) {
            form.value.classe = null
            select.value.classe = null
        }

        if (speciality_id) {
            loading.value.classe = true
            
            try {
                const res = await SpecialityService.get_speciality(speciality_id)
                loading.value.classe = false
                const data = res.data.classes
                classes.value = data

                const clsId = parseInt(route.query.classe)
                const match = data.find((c) => c.id === clsId)
                
                if (match && (fromUrl || isInitializing.value)) {
                    select_classe(match, true)
                } else if (options.defaultSelectFirst && data.length > 0) {
                    select_classe(data[0], false)
                }
                
                // Fin de l'initialisation après le chargement des classes
                if (isInitializing.value) {
                    isInitializing.value = false
                }
            } catch (error) {
                loading.value.classe = false
                if (isInitializing.value) {
                    isInitializing.value = false
                }
            }
        } else {
            if (isInitializing.value) {
                isInitializing.value = false
            }
        }
    }

    const select_level = async (level, fromUrl = false) => {
        if (form.value.level !== level.id) {
            form.value.level = level.id
            select.value.level = level
            
            if (fromUrl || isInitializing.value) {
                // Charger les spécialités en mode restauration URL
                await get_specialitys(level.id, true)
            } else {
                // Sélection manuelle : réinitialiser les autres paramètres
                updateQueryParams({ level: level.id, speciality: null, classe: null })
                await get_specialitys(level.id, false)
            }
        }
    }

    const select_speciality = async (speciality, fromUrl = false) => {
        if (form.value.speciality !== speciality.id) {
            form.value.speciality = speciality.id
            select.value.speciality = speciality
            
            if (fromUrl || isInitializing.value) {
                // Charger les classes en mode restauration URL
                await get_classes(speciality.id, true)
            } else {
                // Sélection manuelle : réinitialiser classe
                updateQueryParams({ speciality: speciality.id, classe: null })
                // Le watcher se chargera d'appeler get_classes
            }
        }
    }

    const select_classe = (classe, fromUrl = false) => {
        if (form.value.classe !== classe.id) {
            form.value.classe = classe.id
            select.value.classe = classe
            
            if (!fromUrl && !isInitializing.value) {
                updateQueryParams({ classe: classe.id })
            }
        }
    }

    watch(() => select.value.speciality, async (spec) => {
        if (!isInitializing.value) {
            await get_classes(spec?.id, false)
        }
    })

    onMounted(() => {
        get_levels()
    })

    return {
        form,
        select,
        loading,
        levels,
        specialitys,
        classes,
        select_level,
        select_speciality,
        select_classe,
        get_levels,
        get_specialitys,
        get_classes,
        isInitializing,
    }
}