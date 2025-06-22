import Post from '../models/Post';

const createPost = async(body) => {
    const { title, author, content, type } = body;
    const newPost = new Post({ title, author, content, type });
    await newPost.save();
    return newPost;
}

const handleFuzzySearch = async(query, type) => {
    let exact = await searchService.findExactPostByTitle(query);

    if (exact) {
        return {
            exact: true,
            results: [exact],
            message: 'Exact match found.',
        };
    }

    let results = await searchService.searchPosts(query, type);

    if (!results || results.length === 0) {
        return { exact: false, results: [], message: 'No results found.', type };
    }

    if (results.length === 1) {
        const exactAgain = await Post.findOne({
            title: { $regex: `^${results[0].title}$`, $options: 'i' }
        });

        if (exactAgain) {
            return { exact: true, results: [exactAgain], type };
        } else {
            return { exact: false, results, message: 'One similar result found.', type };
        }
    }
    results = results.map(result => result.title);
    return { exact: false, results, message: 'Multiple similar results found.', type };
}

const searchPosts = async (query, type) => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const useFuzzy = words.length >= 4;

    const mustQueries = words.map(word => {
        const queryObj = {
            query: word,
            path: 'title',
        };

        if (useFuzzy) {
            queryObj.fuzzy = {
                maxEdits: 1
            };
        }

        return { text: queryObj };
    });


    const pipeline = [
        {
            $search: {
                index: 'title',
                compound: {
                    must: mustQueries
                }
            }
        },
        // { $match: type ? { type } : {} },
        { $limit: 10 }
    ];

    const results = await Post.aggregate(pipeline);
    return results;
};

export async function findExactPostByTitle(title) {
    return await Post.findOne({
        title: { $regex: `^${title}$`, $options: 'i' }
    });
}

const getAllPosts = async () => {
    const posts = await Post.find({});
    return posts;
}


const searchService = {
    createPost,
    handleFuzzySearch,
    findExactPostByTitle,
    searchPosts,
    getAllPosts,
};

export default searchService;