import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUnivercityYearStore } from '@/stores/yearStore'

export function useUnivercityYear() {
    const route = useRoute()
    const router = useRouter()
    const store = useUnivercityYearStore()

    const currentYear = computed(() => store.currentYear)
    const availableYears = computed(() => store.availableYears)

    const setYear = (year) => {
        store.currentYear = year

        router.replace({
            ...route,
            query: { ...route.query, year }
        })
    }

    const initFromUrl = async () => {
        await store.loadAvailableYears()

        const yearFromUrl = route.query.year
        if (yearFromUrl && store.availableYears.includes(yearFromUrl)) {
            store.currentYear = yearFromUrl
        } else if (store.availableYears.length > 0) {
            setYear(store.availableYears[0])
        }
    }

    return {
        currentYear,
        availableYears,
        setYear,
        initFromUrl,
        isLoading: computed(() => store.isLoading)
    }
}