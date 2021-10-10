import Articles from "../models/Articles.js";
export const getArticles = async (req, res) => {
    const articles = await Articles.find({}, (err, doc) => {
        if (err)
            console.log(err);
        console.log(doc);
    });
    res.status(200).json(articles);
};
export const createArticle = async (req, res) => {
    const { title, article, html } = req.body;
    const date = Date.now();
    const newArticle = {
        title: title,
        article: article,
        date: date,
        html: html
    };
    // //TODO solve this
    const foo = await Articles.create(newArticle);
    // Articles.create(newArticle, (err, doc) => {
    //
    //     if (err)
    //         console.log(err);
    //
    //     console.log("Object ARTICLE is saved", doc);
    // })
    res.status(201).json(foo);
};
export const deleteArticle = async (req, res) => {
    const articleId = req.body.id;
    await Articles.findOneAndDelete({ _id: articleId }, undefined, (err, result) => {
        if (err)
            console.log(err);
        console.log(result);
    });
    res.status(200).json({ "message": "articles" });
};
//# sourceMappingURL=articles-api-controller.js.map