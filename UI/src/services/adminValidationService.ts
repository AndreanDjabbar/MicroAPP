const adminValidationService = (password: string) => {
    const expirationTime = 10 * 60 * 1000;
    const now = new Date().getTime();

    const storedTime = localStorage.getItem("adminAccessTime");
    if (storedTime && now - parseInt(storedTime) < expirationTime) {
        return true;
    }

    if (password === "admin1234567") {
        localStorage.setItem("adminAccess", "access");
        localStorage.setItem("adminAccessTime", now.toString());
        return true;
    } else {
        return false;
    }
}

export default adminValidationService;
