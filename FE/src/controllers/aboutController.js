exports.about = (req, res) => {
    res.sendFile("about.html", { root: "./src/views" });
};