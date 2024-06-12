export const useIsAuthenticated = () => {
    const storedUserProfile = localStorage.getItem('access_token');
    const storedUserToken = localStorage.getItem('user')
    // const userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : {};
    const userDetails = storedUserProfile && storedUserToken;
    let isAuthenticated = Boolean(userDetails);
    return { isAuthenticated, user: JSON.parse(userDetails) };
};