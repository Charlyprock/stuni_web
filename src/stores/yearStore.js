import { defineStore } from 'pinia'
import { YearService } from '@/services'

export const useUnivercityYearStore = defineStore('univercityYear', {
    state: () => ({
        currentYear: null,
        availableYears: [],
        isLoading: false
    }),

    getters: {
        hasYears: (state) => state.availableYears.length > 0,
        defaultYear: (state) => state.availableYears[0] || null
    },

    actions: {
        async loadAvailableYears() {
            this.isLoading = true
            try {
                const response = await YearService.getUnivercityYears()
                this.availableYears = response.data
            } finally {
                this.isLoading = false
            }
        },

        setCurrentYear(year) {
            if (this.availableYears.length > 0 && !this.availableYears.includes(year)) {
                console.warn(`Année ${year} non disponible dans la liste`)
                return false
            }

            this.currentYear = year
            return true
        },

        resetYear() {
            this.currentYear = this.defaultYear
        },
    }
})