

export type Comment = {
    author?: string	//The ID of the user object, if author was a user.
    author_email?: string	//Email address for the object author.
    author_ip?: string//IP address for the object author.
    author_name?: string//Display name for the object author.
    author_url?: string	//URL for the object author.
    author_user_agent?: string//User agent for the object author.
    content?: string//The content for the object.
    date?: string	//The date the object was published, in the site's timezone.
    date_gmt?: string	//The date the object was published, as GMT.
    parent?: string	//The ID for the parent of the object.
    post?: string	//The ID of the associated post object.
    status?: string//State of the object.
    meta: string //
}

export type Section = 'podcasts' | 'articles'

export type PlayerStatut = 'playing' | 'stopped' | 'paused' | 'set' | 'error'
export type PlayerType = 'radio' | 'podcast'

export type GlobalState = {
    pages: PagesState,
    posts: PostsState,
    categories: CategoriesState,
    comments: CommentsState,
    users: UsersState,
    profile: ProfileState,
    player: PlayerState,
    loading: LoadingState,
    error: ErrorState,
    ui: UIState,
    connection: ConnectionState
}

export type ErrorState = null | {}

export type ConnectionState = {
    isConnected: boolean
}

export type PagesState = {
    data: [],
    stack: [],
    selectedId: null | number,
    selectedLink: null | string
}

export type UsersState = {
    data: []
}
export type CategoriesState = {
    data: [],
    selectedCategories: {
        podcasts: [],
        articles: []
    }
}
export type PostsState = {
    articles: {
        data: [],
        totalPages: null | number,
        total: null | number,
        searchTerm: ''
    },
    podcasts: {
        data: [],
        totalPages: null | number,
        total: null | number,
        searchTerm: ''
    },
    selectedPost: {},
}

export type CommentsState = {
    data: []
}
export type ProfileState = {
    name: string,
    email: string,
    avatarUrl: string
}
export type UIState = {
    podcasts: {
        showCategories: true,
        showSearch: false
    },
    articles: {
        showCategories: true,
        showSearch: false,
    },
    showSearch: false,
    showPlayer: false,
}
export type PlayerState = {
    stream: {
        source: string,
        title: string,
        image: string
    }
    podcast: {
        source: string,
        title: string,
        image: string
    },
    statut: PlayerStatut,
    type: PlayerType
}

export type LoadingState = null | {}