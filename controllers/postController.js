import Post from '../models/Post.js';
import searchService from '../services/postService.js';

async function handleGetAllPosts() {
    const result = searchService.getAllPosts();
    return result;
}

async function handleFuzzySearch(query, type) {
    let exact = await searchService.findExactPostByTitle(query);

    if (exact) {
        return {
            exact: true,
            results: [exact],
            message: 'Tìm thấy kết quả chính xác.',
        };
    }

    let results = await searchService.searchPosts(query, type);
    if (!results || results.length === 0) {
        return { exact: false, results: [], message: 'Không tìm thấy kết quả nào.', type };
    }

    if (results.length === 1) {
        const exactAgain = await Post.findOne({
            title: { $regex: `^${results[0].title}$`, $options: 'i' }
        });

        if (exactAgain) {
            return { exact: true, results: [exactAgain], type };
        } else {
            return { exact: false, results, message: 'Gần giống 1 kết quả.', type };
        }
    }
    results = results.map(result => result.title);
    return { exact: false, results, message: 'Tìm thấy nhiều kết quả gần đúng.', type };
}

const postController = {
    createPost,
    handleGetAllPosts,
    handleFuzzySearch,
};

export default postController;