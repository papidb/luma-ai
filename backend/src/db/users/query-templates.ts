export const selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;


export const selectUserByIdTemplate = `
SELECT *
FROM users
WHERE id = ?;
`;