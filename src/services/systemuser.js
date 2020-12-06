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
        if(this.isLoggedIn())
            return JSON.parse(localStorage.getItem('user')); 
        return '';     
    }

    getUserId()
    {
        if(this.isLoggedIn())
            return JSON.parse(localStorage.getItem('user')).id;   
        return '';     
    }

    isLoggedIn() {
        return "user" in localStorage
    }

    IsAdmin()
    {
        if(!this.isLoggedIn())
            return false
        return this.getCurrentUser().role == 1
    }

    getJWT()
    {
        if(this.isLoggedIn())
            return JSON.parse(localStorage.getItem('user')).token;  
        return '';     
    }

    RoleString(role) {

        return RoleDict[role];
    }
}

export default new SystemUser();