const postsContainer = document.getElementById('posts-list')
const posts = await api.posts.latest()

for (const post of posts) {
    const card = document.createElement('fc-post-card')

    card.post = post

    postsContainer.append(card)
}