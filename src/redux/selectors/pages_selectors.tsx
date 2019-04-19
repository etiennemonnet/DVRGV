import { createSelector } from 'reselect'
import { getPagesSelector, getSelectedLinkSelector } from './direct_selectors';




export const selectedSourceSelector = (state,source)=>{
    return state.pages.stack.find((page) => page == source)
}

export const selectedPageSelector = createSelector(
    getPagesSelector,
    selectedSourceSelector,
    (pages, source) => {
        return pages.data.find((page) => page.id == source || page.link == source)
    }
)

export const selectedPageWithLinkSelector = createSelector(
    getPagesSelector,
    getSelectedLinkSelector,
    (pages, selectedLink) => {
        return pages.data.find((page) => page.link == selectedLink)
    }
)