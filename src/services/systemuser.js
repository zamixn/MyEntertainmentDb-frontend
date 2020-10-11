const RoleDict = {
    1: 'Admin',
    2: 'LoggedInUser',
    3: 'Guest',
}

class SystemUser {


    loginWithUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    isLoggedIn() {
        return "user" in localStorage
    }

    RoleString(role) {

        return RoleDict[role];
    }
}

export default new SystemUser();