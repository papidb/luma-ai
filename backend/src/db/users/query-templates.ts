export const selectUsersTemplate = `
SELECT 
    users.id,
    users.name,
    users.username,
    users.email,
    users.phone,
    CONCAT(addresses.street, ', ', addresses.state, ', ', addresses.city, ', ', addresses.zipcode) AS full_address
FROM 
    users
LEFT JOIN 
    addresses
ON 
    users.id = addresses.user_id
ORDER BY 
    name
  LIMIT ? OFFSET ?;
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
