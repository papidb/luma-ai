export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;

export const deletePostTemplate = `DELETE FROM posts WHERE id = ?`;

export const selectPostByIdTemplate = `
SELECT *
FROM posts
WHERE id = ?;
`;


export const insertPostTemplate = `
INSERT INTO posts (title, body, user_id, id, created_at)
VALUES (?, ?, ?, ?, ?);
`;