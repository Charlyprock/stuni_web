import { ref, onMounted, watch } from 'vue'
import { LevelService, SpecialityService } from '@/services';

export function useFilters(options= {
    autoLoad: true,
    defaultSelectFirst: true
}) {
    const form = ref({ level: null, speciality: null, classe: null })
    const select = ref({ level: null, speciality: null, classe: null })
    const loading = ref({ level: false, speciality: false, classe: false })

    const levels = ref([])
    const specialitys = ref([])
    const classes = ref([])

    const get_levels = () => {
        loading.value.level = true
        return LevelService.get_level().then((res) => {
            loading.value.level = false
            levels.value = res.data

            if (options?.defaultSelectFirst && res.data.length >= 1) {
                select_level(res.data[0])
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
            if (options?.defaultSelectFirst && data.length >= 1) {
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
                if (options?.defaultSelectFirst && data.length >= 1) {
                    select_classe(data[0])
                }
            })
        }
    }

    const select_level = (level) => {
        if (form.value.level !== level.id) {
            form.value.level = level.id
            select.value.level = level
            get_specialitys(level.id)
        }
    }

    const select_speciality = (speciality) => {
        form.value.speciality = speciality.id
        select.value.speciality = speciality
    }

    const select_classe = (classe) => {
        form.value.classe = classe.id
        select.value.classe = classe
    }

    watch(() => select.value.speciality, (speciality) => {
        // if (speciality?.id) get_classes(speciality.id)
        get_classes(speciality?.id)
    })

    onMounted(() => {
        if (options?.autoLoad !== false) {
            get_levels()
        }
    })

    return {
        form,
        select,
        loading,
        levels,
        specialitys,
        classes,
        get_levels,
        get_specialitys,
        get_classes,
        select_level,
        select_speciality,
        select_classe,
    }
}
