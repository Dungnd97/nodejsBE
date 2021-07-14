
let getHomePage = (req, res) => {
    return res.render("homepage.ejs");
};

let getAboutPage = (req, res) => {
    return res.render("homepage.ejs");
}

module.exports = {
    getHomePage, getAboutPage,
}