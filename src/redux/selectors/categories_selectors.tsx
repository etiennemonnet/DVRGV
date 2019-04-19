
import { createSelector } from 'reselect'
import _ from 'lodash'
import { getCategoriesSelector } from './direct_selectors';


export const filteredCategoriesSelector = (excludedCategories: number[]) => (state) =>
    state.data.filter((category) => !excludedCategories.includes(category.id))





