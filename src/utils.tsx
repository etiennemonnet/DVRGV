
export const getPodcastLinkFromPostContent = (content) => {

    const regex = /https:\/\/www.dvrgv.org\/.*\.mp3/
    const regex2 = /https?:\/\/.+?.mp3/ig
    var links = content.match(regex2);
    return links[0]
}

export const isInternalLink = (link) => {
    const regex = /https:\/\/www.dvrgv.org\/.*/ig
    return regex.test(link)
}

export const getTitleFromLink = (link) => {
    const matches = /(https?:\/\/www.dvrgv.org\/)(.*)(\/)/ig.exec(link)
    const [total, domain, title, end] = matches

    return title.charAt(0).toUpperCase() + title.slice(1);
}

export const getSeparatedArtistAndTitle = (info: string) => {
    const separated = info.split(/[ -]+/);

    return { artist: separated[0], title: separated[1] }

}