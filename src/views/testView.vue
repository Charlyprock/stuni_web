import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LevelService, SpecialityService } from '@/services';


export function useFilters(options = { defaultSelectFirst: true }) {
    const route = useRoute()
    const router = useRouter()

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
        router.replace({
            query: {
                ...route.query,
                ...params,
            },
        })
    }

    const get_levels = () => {
        loading.value.level = true
        return LevelService.get_level().then((res) => {
            loading.value.level = false
            levels.value = res.data

            const levelIdFromUrl = parseInt(route.query.level)
            const match = levels.value.find((l) => l.id === levelIdFromUrl)

            if (match) {
                select_level(match)
            } else if (options.defaultSelectFirst && levels.value.length > 0) {
                select_level(levels.value[0])
            }
        })
    }

    const get_specialitys = (level_id) => {
        loading.value.speciality = true
        specialitys.value = []
        form.value.speciality = null
        select.value.speciality = null

        return LevelService.get_level(level_id).then((res) => {
            loading.value.speciality = false
            const data = res.data.specialitys
            specialitys.value = data

            const specId = parseInt(route.query.speciality)
            const match = data.find((s) => s.id === specId)

            if (match) {
                select_speciality(match)
            } else if (options.defaultSelectFirst && data.length > 0) {
                select_speciality(data[0])
            }
        })
    }

    const get_classes = (speciality_id) => {
        classes.value = []
        form.value.classe = null
        select.value.classe = null

        if (speciality_id) {
            loading.value.classe = true
            
            return SpecialityService.get_speciality(speciality_id).then((res) => {
                loading.value.classe = false
                const data = res.data.classes
                classes.value = data

                const clsId = parseInt(route.query.classe)
                const match = data.find((c) => c.id === clsId)

                if (match) {
                    select_classe(match)
                } else if (options.defaultSelectFirst && data.length > 0) {
                    select_classe(data[0])
                }
            })
        }
    }

    const select_level = (level) => {
        if (form.value.level !== level.id) {
            form.value.level = level.id
            select.value.level = level
            updateQueryParams({ level: level.id, speciality: null, classe: null })
            get_specialitys(level.id)
        }
    }

    const select_speciality = (speciality) => {
        if (form.value.speciality !== speciality.id) {
            form.value.speciality = speciality.id
            select.value.speciality = speciality
            updateQueryParams({ speciality: speciality.id, classe: null })
        }
    }

    const select_classe = (classe) => {
        if (form.value.classe !== classe.id) {
            form.value.classe = classe.id
            select.value.classe = classe
            updateQueryParams({ classe: classe.id })
        }
    }

    watch(() => select.value.speciality, (spec) => {
        get_classes(spec?.id)
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
    }
}
