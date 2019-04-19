import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUiSelector, getTotalPosts, getSearchTermSelector } from '../redux/selectors/direct_selectors';
import { toggleSearch, toggleCategories } from '../redux/actions/UiActions'
import Header from '../components/Header';
import { postsWithCategoriesFilterSelector } from '../redux/selectors/posts_selectors';
import { Section } from '../types';
import { searchPostsWithTerm } from '../redux/actions/PostsActions'
import { debounce } from 'lodash'

type Props = {
    section: Section,
    toggleSearch: any,
    toggleCategories: any,
    searchPostsWithTerm: any,
    searchTerm: string,
    ui: any
    total: number
    displayed: number
}
class HeaderContainer extends PureComponent<Props, any>{
    constructor(props) {
        super(props)
    }
    handleOnClickSearch = () => {
        const { section } = this.props
        this.props.toggleSearch(section)
    }
    handleOnClickFilter = () => {
        const { section } = this.props
        this.props.toggleCategories(section)
    }
    handleOnSearch = (value) => {
        const { section } = this.props
        this.props.searchPostsWithTerm(value, section)
    }
    render() {
        const {
            ui,
            total,
            displayed,
            section,
            searchTerm
        } = this.props

        return <Header
            searchTerm={searchTerm}
            section={section}
            onSearch={this.handleOnSearch}
            onClickSearch={this.handleOnClickSearch}
            onClickFilter={this.handleOnClickFilter}
            ui={ui}
            totalPosts={total}
            displayedPosts={displayed}
        />
    }
}
const mapStateToProps = (state, ownProps) => {
    const { section } = ownProps
    const posts = postsWithCategoriesFilterSelector(state, section)
    return {
        ui: getUiSelector(state),
        searchTerm: getSearchTermSelector(state, section),
        displayed: posts.length,
        total: getTotalPosts(state, section)
    }
}

const mapDispatchToProps = {
    toggleSearch,
    toggleCategories,
    searchPostsWithTerm
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)