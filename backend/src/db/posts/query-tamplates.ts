export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;
